import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';
import { fetchApi } from '../services/api';

// Mockeamos el servicio de la API
vi.mock('../services/api', () => ({
  fetchApi: vi.fn()
}));

// Un componente de prueba para consumir el contexto
const ComponentePrueba = () => {
  const { user, login, register, logout, loading } = useAuth();

  if (loading) return <div data-testid="cargando">Cargando...</div>;

  return (
    <div>
      <div data-testid="estado-usuario">{user ? `Conectado como ${user.nombre}` : 'No conectado'}</div>
      <button onClick={() => login('test@test.com', 'password123')}>Iniciar Sesión</button>
      <button onClick={() => register({ email: 'test@test.com', password: 'password123' })}>Registrarse</button>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('provee el estado de carga inicialmente y detecta el token en localStorage', async () => {
    localStorage.setItem('token', 'fake-token-123');
    
    render(
      <AuthProvider>
        <ComponentePrueba />
      </AuthProvider>
    );

    // Después de cargar, debería detectar el token y establecer el usuario
    await waitFor(() => {
      expect(screen.getByTestId('estado-usuario').textContent).toBe('Conectado como Usuario');
    });
  });

  it('inicia con "No conectado" si no existe un token', async () => {
    render(
      <AuthProvider>
        <ComponentePrueba />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('estado-usuario').textContent).toBe('No conectado');
    });
  });

  it('maneja el inicio de sesión con respuesta de token en texto plano (cadena JWT)', async () => {
    fetchApi.mockResolvedValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.jwt');

    render(
      <AuthProvider>
        <ComponentePrueba />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('estado-usuario').textContent).toBe('No conectado');
    });

    act(() => {
      screen.getByText('Iniciar Sesión').click();
    });

    await waitFor(() => {
      expect(fetchApi).toHaveBeenCalledWith('/Authentication/authenticate', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@test.com', password: 'password123' })
      });
      expect(localStorage.getItem('token')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.jwt');
      expect(screen.getByTestId('estado-usuario').textContent).toBe('Conectado como test');
    });
  });

  it('maneja el inicio de sesión con respuesta en objeto JSON', async () => {
    fetchApi.mockResolvedValue({ token: 'json-token-123' });

    render(
      <AuthProvider>
        <ComponentePrueba />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('estado-usuario').textContent).toBe('No conectado');
    });

    act(() => {
      screen.getByText('Iniciar Sesión').click();
    });

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('json-token-123');
      expect(screen.getByTestId('estado-usuario').textContent).toBe('Conectado como test');
    });
  });

  it('maneja un inicio de sesión fallido', async () => {
    fetchApi.mockRejectedValue(new Error('Credenciales inválidas'));

    render(
      <AuthProvider>
        <ComponentePrueba />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('estado-usuario').textContent).toBe('No conectado');
    });

    act(() => {
      screen.getByText('Iniciar Sesión').click();
    });

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeNull();
      expect(screen.getByTestId('estado-usuario').textContent).toBe('No conectado');
    });
  });

  it('maneja el registro de usuario', async () => {
    fetchApi.mockResolvedValue({});

    render(
      <AuthProvider>
        <ComponentePrueba />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('estado-usuario').textContent).toBe('No conectado');
    });

    act(() => {
      screen.getByText('Registrarse').click();
    });

    await waitFor(() => {
      expect(fetchApi).toHaveBeenCalledWith('/User/postUser', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@test.com', password: 'password123' })
      });
    });
  });

  it('maneja el cierre de sesión', async () => {
    localStorage.setItem('token', 'fake-token-123');
    
    render(
      <AuthProvider>
        <ComponentePrueba />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('estado-usuario').textContent).toBe('Conectado como Usuario');
    });

    act(() => {
      screen.getByText('Cerrar Sesión').click();
    });

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeNull();
      expect(screen.getByTestId('estado-usuario').textContent).toBe('No conectado');
    });
  });
});
