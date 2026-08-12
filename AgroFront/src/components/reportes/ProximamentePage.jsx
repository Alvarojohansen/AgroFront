import React from 'react';

const ProximamentePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-5xl font-bold text-gray-800 mb-4 animate-pulse">¡Próximamente!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Estamos trabajando arduamente para traerte reportes completos y útiles.
          Vuelve pronto para las últimas actualizaciones.
        </p>
        <div className="flex justify-center space-x-4">
          <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProximamentePage;
