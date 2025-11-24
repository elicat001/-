
import React, { useEffect, useState } from 'react';
import { ChevronLeft, Search, MapPin, Navigation, X, ShoppingBag } from 'lucide-react';
import { Store } from '../types';
import { api } from '../services/api';

interface StoreListProps {
  onBack: () => void;
  onSelect: (store: Store) => void;
}

export const StoreListView: React.FC<StoreListProps> = ({ onBack, onSelect }) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    api.getStores().then(setStores);
  }, []);

  // Case-insensitive filtering for name and address
  const filteredStores = stores.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 sticky top-0 z-20 shadow-sm">
         <div className="flex items-center justify-between mb-3">
            <button onClick={onBack} className="p-1 -ml-1 rounded-full hover:bg-gray-100"><ChevronLeft size={24} /></button>
            <span className="font-bold text-lg text-gray-900">选择门店</span>
            <div className="w-8"></div>
         </div>
         {/* Search Bar */}
         <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索门店名称或地址" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 rounded-full py-2 pl-9 pr-9 text-sm outline-none focus:ring-2 focus:ring-[#FDE047]/50 transition-all placeholder:text-gray-400"
            />
            {searchTerm && (
                <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-gray-200 rounded-full text-gray-500 hover:bg-gray-300 transition-colors"
                >
                    <X size={10} />
                </button>
            )}
         </div>
      </div>

      {/* Map Placeholder */}
      <div className="h-48 bg-gray-200 flex items-center justify-center relative overflow-hidden">
         <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#999 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
         <button className="bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2 text-sm font-bold text-gray-800 z-10 hover:scale-105 transition-transform active:scale-95">
            <MapPin size={16} /> 查看地图模式
         </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
         <div className="text-xs text-gray-500 font-medium ml-1">
            {searchTerm ? `搜索结果 (${filteredStores.length})` : '附近门店'}
         </div>
         
         {filteredStores.length > 0 ? filteredStores.map(store => (
            <div 
              key={store.id} 
              onClick={() => store.status === 'OPEN' && onSelect(store)}
              className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden ${store.status === 'CLOSED' ? 'opacity-75' : ''}`}
            >
                <div className="flex gap-4">
                    {/* Image Preview */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative shadow-inner">
                       <img src={store.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={store.name} />
                       {store.status === 'CLOSED' && (
                           <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-bold backdrop-blur-[1px]">
                               休息中
                           </div>
                       )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                       <div>
                           <div className="flex justify-between items-start">
                              <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">{store.name}</h3>
                              <span className="text-xs text-gray-500 font-medium bg-gray-50 px-1.5 py-0.5 rounded flex-shrink-0 ml-2">{store.distance}</span>
                           </div>
                           <p className="text-xs text-gray-500 line-clamp-1 mb-2">{store.address}</p>
                           <div className="flex gap-1.5 flex-wrap">
                              {store.tags.map(tag => (
                                 <span key={tag} className="text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-100">{tag}</span>
                              ))}
                           </div>
                       </div>
                    </div>
                </div>

                {/* Actions Footer */}
                <div className="mt-4 flex items-center gap-3">
                   <button 
                     onClick={(e) => { e.stopPropagation(); /* Nav logic */ }}
                     className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-lg bg-gray-50 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                   >
                       <Navigation size={14} /> 导航
                   </button>
                   <button 
                     disabled={store.status !== 'OPEN'}
                     className={`flex-[2] flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold shadow-sm transition-colors ${
                         store.status === 'OPEN' 
                         ? 'bg-[#FDE047] text-gray-900 hover:bg-yellow-400 active:scale-[0.98]' 
                         : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                     }`}
                   >
                       <ShoppingBag size={14} strokeWidth={2.5} /> 
                       {store.status === 'OPEN' ? '去点单' : '休息中'}
                   </button>
                </div>
            </div>
         )) : (
             <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <Search size={24} className="text-gray-300" />
                 </div>
                 <span className="text-sm">未找到相关门店</span>
             </div>
         )}
      </div>
    </div>
  );
};
