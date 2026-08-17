import React from 'react';
import { OrnateDivider } from './Icons';
import { useStore } from '../context/StoreContext';
import { Eye, ShoppingBag } from 'lucide-react';

export const Collections = ({ onSelectCollection, onAddToCart }) => {
  const { products } = useStore();

  return (
    <section id="collection" className="py-14 sm:py-16 bg-[#FFFDFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <OrnateDivider>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-wider uppercase">
              <span className="text-[#0B192C]">EXPLORE </span>
              <span className="text-[#D81B60]">OUR COLLECTIONS</span>
            </h2>
          </OrnateDivider>
        </div>

        {/* Dynamic Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
          {products.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCollection(item)}
              className="group cursor-pointer flex flex-col bg-[#FDF8F3] hover:bg-white border border-[#ECDCCB] hover:border-[#D81B60] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"
            >
              {/* Image Container with Arch / Rounded Top Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5EBE1] p-1.5 sm:p-2">
                <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={`${item.name} - ${item.subtitle} | Nepal Fashion KTM`}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCollection(item);
                      }}
                      className="bg-white/95 hover:bg-white text-[#D81B60] font-bold text-xs px-3 py-1.5 rounded-full shadow flex items-center gap-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute top-2 left-2 bg-[#D81B60]/90 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      {item.badge}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Label Information */}
              <div className="p-3 sm:p-3.5 text-center flex flex-col justify-center flex-grow bg-white group-hover:bg-[#FDF8F3] transition-colors border-t border-[#ECDCCB]/60">
                <h3 className="font-serif font-bold text-xs sm:text-sm text-[#0B192C] group-hover:text-[#D81B60] tracking-wide uppercase transition-colors">
                  {item.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 font-medium line-clamp-1">
                  {item.subtitle}
                </p>
                <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#D81B60]">Rs. {item.price.toLocaleString()}</span>
                  <span className="text-slate-400 line-through text-[10px]">
                    Rs. {(item.originalPrice || item.price).toLocaleString()}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
