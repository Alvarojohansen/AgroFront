// Configuración base para las peticiones al backend
const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:7183/api';

/**
 * Función genérica para hacer peticiones al backend.
 * Automáticamente adjunta el token JWT si el usuario está logueado.
 */
export const fetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      // Manejo de errores genéricos (ej. 401 No Autorizado)
      if (response.status === 401) {
        console.error('Sesión expirada o no autorizada');
        localStorage.removeItem('token');
        // Aquí idealmente podrías despachar un evento o redirigir usando el router
      }
      
      const errorData = await response.text(); // Leemos como texto por si no es JSON
      let errorMessage = `Error HTTP: ${response.status}`;
      try {
        const jsonError = JSON.parse(errorData);
        errorMessage = jsonError.message || errorMessage;
      } catch (e) {
        errorMessage = errorData || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // Algunas peticiones como DELETE pueden no retornar contenido (204 No Content)
    if (response.status === 204) {
      return null;
    }

    // Leemos la respuesta como texto primero
    const textData = await response.text();
    
    // Intentamos parsearla a JSON. Si falla, devolvemos el texto plano (ej: un JWT suelto)
    try {
      return JSON.parse(textData);
    } catch (e) {
      return textData;
    }
  } catch (error) {
    console.error('Error en fetchApi:', error);
    throw error;
  }
};
