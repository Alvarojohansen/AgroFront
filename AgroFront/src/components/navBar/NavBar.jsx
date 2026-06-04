import React, { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-emerald-300">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-green-500 w-6 h-6 rounded-sm"></div>
            <span className="text-xl font-semibold text-gray-800">
              Agro2000
            </span>
          </Link>

          {/* LINKS */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Inicio
            </Link>
            <Link
              to="/ventas"
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Ventas
            </Link>
            <Link
              to="/stock"
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Stock
            </Link>
            <a
              href="#"
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Reportes
            </a>
          </div>

          {/* BUSCADOR */}
          <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-48 sm:w-64">
            <input
              type="text"
              placeholder="Buscar"
              className="flex-1 outline-none text-sm text-gray-700"
            />
            <Search size={18} className="text-gray-500" />
          </div>

          {/* MENÚ MÓVIL */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-1 pb-2">
            <Link to="/" className="block text-gray-700 hover:text-green-600">
              Inicio
            </Link>
            <Link to="/ventas" className="block text-gray-700 hover:text-green-600">
              Ventas
            </Link>
            <Link to="/stock" className="block text-gray-700 hover:text-green-600">
              Stock
            </Link>
            <a href="#" className="block text-gray-700 hover:text-green-600">
              Reportes
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
