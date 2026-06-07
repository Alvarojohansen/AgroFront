import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchApi } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Intentar recuperar el usuario del token al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Por ahora simulamos que si hay token, el usuario está activo.
      // En una app real, podrías decodificar el JWT o hacer una petición `/Auth/Me`
      setUser({ nombre: 'Usuario', rol: 'user' }); 
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Ajusta la ruta '/Auth/Login' según cómo esté definido en tu controlador de C#
      const response = await fetchApi('/Authentication/authenticate', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      // El backend retorna un texto crudo "eyJhbGciOi..." o un objeto con { token }
      let token = null;

      if (typeof response === 'string' && response.startsWith('eyJ')) {
        token = response; // Es un JWT suelto en texto
      } else if (response && response.token) {
        token = response.token; // Es un objeto JSON
      }

      if (token) {
        localStorage.setItem('token', token);
        // Aquí podrías extraer datos del token o de la respuesta
        setUser({ nombre: email.split('@')[0], rol: 'user' });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      await fetchApi('/User/postUser', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      // El registro fue exitoso, el usuario deberá iniciar sesión manualmente
      return { success: true };
    } catch (error) {
      console.error("Error al registrar:", error);
      return { success: false, message: error.message || 'Error al registrar el usuario' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
