import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';

const mockStock = [
  { id: 1, nombre: 'Semillas de Soja RR', categoria: 'Semillas', cantidad: 1500, unidad: 'Bolsas (25kg)', precio: 120 },
  { id: 2, nombre: 'Glifosato 48%', categoria: 'Agroquímicos', cantidad: 300, unidad: 'Litros', precio: 8 },
  { id: 3, nombre: 'Urea Granulada', categoria: 'Fertilizantes', cantidad: 50000, unidad: 'Kg', precio: 0.8 },
  { id: 4, nombre: 'GasOil Grado 2', categoria: 'Combustibles', cantidad: 8000, unidad: 'Litros', precio: 1.1 },
];

const StockManager = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Stock</h1>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus size={20} />
          Nuevo Insumo
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-1.5 w-72 bg-white">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Buscar insumos..."
              className="flex-1 outline-none text-sm text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Nombre</th>
                <th className="p-4 font-medium">Categoría</th>
                <th className="p-4 font-medium text-right">Cantidad</th>
                <th className="p-4 font-medium">Unidad</th>
                <th className="p-4 font-medium text-right">Precio Unit. (USD)</th>
                <th className="p-4 font-medium text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
              {mockStock
                .filter(item => item.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium">{item.nombre}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {item.categoria}
                    </span>
                  </td>
                  <td className="p-4 text-right font-semibold">{item.cantidad.toLocaleString()}</td>
                  <td className="p-4 text-gray-500">{item.unidad}</td>
                  <td className="p-4 text-right">${item.precio.toFixed(2)}</td>
                  <td className="p-4 flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800" title="Editar">
                      <Edit2 size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800" title="Eliminar">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockManager;
