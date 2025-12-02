import React, { useState } from 'react';
import { Product } from '../types';
import { Search, Filter, ShoppingCart } from 'lucide-react';

const mockProducts: Product[] = [
  { id: '1', name: 'Servidor Rack 2U Enterprise', sku: 'SRV-2U-001', price: 12500, stock: 45, category: 'Hardware', image: 'https://picsum.photos/400/300?random=1' },
  { id: '2', name: 'Switch Gerenciável 48 Portas', sku: 'NET-SW-48', price: 4200, stock: 120, category: 'Network', image: 'https://picsum.photos/400/300?random=2' },
  { id: '3', name: 'Licença Software ERP - Seat', sku: 'SW-ERP-01', price: 150, stock: 999, category: 'Software', image: 'https://picsum.photos/400/300?random=3' },
  { id: '4', name: 'Cabo Fibra Óptica LC-LC 10m', sku: 'CAB-FIB-10', price: 85, stock: 500, category: 'Acessórios', image: 'https://picsum.photos/400/300?random=4' },
  { id: '5', name: 'Storage NAS 4 Baias', sku: 'STO-NAS-04', price: 3800, stock: 15, category: 'Hardware', image: 'https://picsum.photos/400/300?random=5' },
  { id: '6', name: 'Roteador Wi-Fi 6 Mesh', sku: 'NET-WIFI-06', price: 890, stock: 200, category: 'Network', image: 'https://picsum.photos/400/300?random=6' },
];

const Catalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', ...Array.from(new Set(mockProducts.map(p => p.category)))];

  const filteredProducts = mockProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Catálogo de Produtos</h1>
        <div className="flex space-x-2">
           <button className="bg-primary hover:bg-slate-800 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Ver Carrinho (0)
           </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text"
            placeholder="Buscar por nome ou SKU..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          <Filter className="w-5 h-5 text-slate-400 flex-shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow">
            <div className="aspect-video bg-slate-100 relative overflow-hidden">
               <img 
                 src={product.image} 
                 alt={product.name}
                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
               />
               <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-slate-800">
                 {product.category}
               </div>
            </div>
            <div className="p-4">
              <div className="text-xs text-slate-500 mb-1">SKU: {product.sku}</div>
              <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 min-h-[3rem]">{product.name}</h3>
              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Preço Unitário</span>
                  <span className="text-lg font-bold text-accent">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </span>
                </div>
                <button className="bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white p-2 rounded-lg transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs">
                 <span className={`${product.stock > 20 ? 'text-green-600' : 'text-orange-500'}`}>
                   {product.stock} em estoque
                 </span>
                 <span className="text-slate-400">Entrega: 3-5 dias</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;