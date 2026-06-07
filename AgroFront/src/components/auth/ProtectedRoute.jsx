import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Si no hay usuario, redirige a la página de login
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, renderiza la vista solicitada
  return children;
};

export default ProtectedRoute;
