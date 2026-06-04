import React, { useState } from 'react';
import { ShoppingCart, Plus, Save } from 'lucide-react';

const mockInsumos = [
  { id: 1, nombre: 'Semillas de Soja RR', precio: 120, stock: 1500, unidad: 'Bolsas' },
  { id: 2, nombre: 'Glifosato 48%', precio: 8, stock: 300, unidad: 'L' },
];

const VentasManager = () => {
  const [carrito, setCarrito] = useState([]);
  const [cliente, setCliente] = useState('');

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      setCarrito(carrito.map(item => 
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Sección Izquierda: Productos disponibles */}
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <ShoppingCart size={24} className="text-green-600" />
          Nueva Venta
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockInsumos.map(prod => (
            <div key={prod.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">{prod.nombre}</h3>
                <p className="text-sm text-gray-500">Stock: {prod.stock} {prod.unidad} | ${prod.precio}</p>
              </div>
              <button 
                onClick={() => agregarAlCarrito(prod)}
                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 p-2 rounded-full transition-colors"
                title="Agregar a la venta"
              >
                <Plus size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sección Derecha: Resumen de Venta */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 flex flex-col h-fit">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Detalle de Facturación</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cliente / CUIT</label>
          <input 
            type="text" 
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-green-500"
            placeholder="Ej: AgroGana S.A."
          />
        </div>

        <div className="flex-1 min-h-[200px] max-h-[400px] overflow-y-auto mb-4 border border-gray-100 rounded bg-gray-50 p-2">
          {carrito.length === 0 ? (
            <div className="text-center text-gray-400 mt-10 text-sm">El carrito está vacío</div>
          ) : (
            <ul className="space-y-3">
              {carrito.map(item => (
                <li key={item.id} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-medium text-gray-800">{item.nombre}</span>
                    <div className="text-gray-500">{item.cantidad} x ${item.precio}</div>
                  </div>
                  <div className="font-semibold">${item.cantidad * item.precio}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium text-gray-700">Total:</span>
            <span className="text-2xl font-bold text-green-600">${calcularTotal().toFixed(2)}</span>
          </div>
          
          <button 
            disabled={carrito.length === 0}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-md flex justify-center items-center gap-2 transition-colors"
          >
            <Save size={20} />
            Confirmar Venta
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default VentasManager;
