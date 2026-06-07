import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/AgroLogo.png";
import { useAuth } from "../../context/AuthContext";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-emerald-700 shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="AgroGest Logo"
              className="h-10 w-auto"
            />
          </Link>

          {/* LINKS */}
          <div className="hidden md:flex space-x-8 items-center">
            {/* Rutas Protegidas - Solo visibles si hay sesión iniciada */}
            {user && (
              <>
                <Link
                  to="/ventas"
                  className="text-emerald-50 hover:text-white font-medium transition-colors"
                >
                  Ventas
                </Link>
                <Link
                  to="/stock"
                  className="text-emerald-50 hover:text-white font-medium transition-colors"
                >
                  Stock
                </Link>
                <a
                  href="#"
                  className="text-emerald-50 hover:text-white font-medium transition-colors"
                >
                  Reportes
                </a>
              </>
            )}
          </div>

          {/* SECCIÓN DE USUARIO / LOGIN */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-emerald-100 text-sm">
                  Hola, {user.nombre}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-emerald-800 hover:bg-emerald-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* MENÚ MÓVIL */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-emerald-50 hover:text-white focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-3">
            {user && (
              <>
                <Link to="/ventas" className="block text-emerald-50 hover:text-white px-2">
                  Ventas
                </Link>
                <Link to="/stock" className="block text-emerald-50 hover:text-white px-2">
                  Stock
                </Link>
                <a href="#" className="block text-emerald-50 hover:text-white px-2">
                  Reportes
                </a>
              </>
            )}
            
            <div className="pt-4 border-t border-emerald-600">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-emerald-50 hover:text-white px-2"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block text-emerald-50 hover:text-white px-2 font-bold"
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
