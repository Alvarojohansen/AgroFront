import React from "react";
import Carrusel from "./carrusel/Carrusel";
import { Link } from "react-router";
import { Sprout, TrendingUp, Package, BarChart3, ArrowRight, ShieldCheck, Users } from "lucide-react";

const WelcomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      
      {/* SECCIÓN HERO (Carrusel + Overlay) */}
      <div className="relative w-full h-[65vh] md:h-[80vh] min-h-[450px] md:min-h-[500px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <Carrusel />
        
        {/* Capa oscura semitransparente sobre el carrusel */}
        <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>

        {/* Contenido del Hero */}
        <div className="absolute z-20 flex flex-col items-center justify-center text-center px-4 w-full">
          <div className="bg-green-500 text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full mb-4">
            Agro2000 ERP v1.0
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg max-w-4xl leading-tight">
            El futuro de tu gestión agrícola en un solo lugar
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-md">
            Optimiza tus ventas, controla tu inventario de insumos y toma decisiones inteligentes con la plataforma diseñada por y para el campo.
          </p>
          <div className="flex gap-4 flex-col sm:flex-row">
            <Link 
              to="/ventas" 
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
            >
              Comenzar Venta <ArrowRight size={20} />
            </Link>
            <Link 
              to="/stock" 
              className="bg-white/10 hover:bg-white/20 border border-white/50 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-lg transition-all flex items-center justify-center transform hover:-translate-y-1"
            >
              Ver Inventario
            </Link>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE CARACTERÍSTICAS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Herramientas pensadas para tu crecimiento</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Abandona las planillas de Excel y moderniza tu administración. Nuestro sistema integra todas las áreas críticas de tu empresa agropecuaria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Punto de Venta</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Facturación ágil de semillas, agroquímicos y más. Genera comprobantes y gestiona el flujo de caja en segundos.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="bg-emerald-100 w-14 h-14 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
              <Package size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Control de Stock</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Seguimiento en tiempo real de tu inventario. Alertas de bajo stock, categorización por lotes y unidades.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="bg-teal-100 w-14 h-14 rounded-xl flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Gestión de Clientes</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Mantén un registro histórico de las compras de tus clientes, cuentas corrientes y condiciones comerciales.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="bg-cyan-100 w-14 h-14 rounded-xl flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Reportes (Próximamente)</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Toma decisiones con datos reales. Gráficos de ventas, productos más vendidos y rentabilidad por campaña.
            </p>
          </div>

        </div>
      </div>

      {/* BANNER CTA (Call to Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
          {/* Fondo decorativo */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 text-gray-800 opacity-20">
            <Sprout size={250} />
          </div>
          
          <div className="relative z-10 md:w-2/3 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-white mb-4">¿Listo para transformar tu empresa?</h2>
            <p className="text-gray-400 text-lg">
              Comienza hoy mismo a cargar tu inventario y a registrar tus primeras ventas en el sistema.
            </p>
          </div>
          <div className="relative z-10 md:w-1/3 flex justify-end">
            <Link 
              to="/stock" 
              className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl shadow-lg transition-colors flex items-center gap-3 w-full justify-center md:w-auto"
            >
              <ShieldCheck size={24} className="text-green-600" />
              Configurar Sistema
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default WelcomePage;
