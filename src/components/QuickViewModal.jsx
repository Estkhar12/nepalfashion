import React, { useState } from 'react';
import { X, Star, ShoppingBag, MessageCircle, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { storeInfo } from '../data/products';

export const QuickViewModal = ({ item, isOpen, onClose, onAddToCart, onShowToast }) => {
  if (!isOpen || !item) return null;

  const [selectedSize, setSelectedSize] = useState(item.availableSizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(item.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart({
      ...item,
      selectedSize,
      selectedColor,
      quantity,
    });
    onClose();
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello Nepal Fashion KTM!\n\nI want to order:\n- Item: ${item.name} (${item.subtitle})\n- Price: Rs. ${item.price.toLocaleString()}\n- Size: ${selectedSize}\n- Quantity: ${quantity}\n\nPlease confirm availability and delivery in Kathmandu.`
    );
    window.open(`https://wa.me/9779808997824?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#ECDCCB] my-8 animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-brand-pink shadow-md flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image with Arch Frame */}
          <div className="bg-[#FAF3EC] p-6 flex items-center justify-center relative">
            <div className="w-full max-w-xs aspect-[3/4] rounded-2xl overflow-hidden shadow-md border-2 border-white">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            {item.badge && (
              <span className="absolute top-8 left-8 bg-brand-pink text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                {item.badge}
              </span>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-1 text-[#E91E63] mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E91E63]" />
                ))}
                <span className="text-xs text-slate-500 font-semibold ml-1.5">
                  {item.rating} ({item.reviewsCount} reviews)
                </span>
              </div>

              <h3 className="font-serif font-bold text-2xl text-[#0B192C] uppercase tracking-wide">
                {item.name}
              </h3>
              <p className="text-xs font-semibold text-brand-pink uppercase tracking-wider mt-0.5">
                {item.subtitle}
              </p>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#D81B60]">
                  Rs. {item.price.toLocaleString()}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  Rs. {item.originalPrice.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Save {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                {item.description}
              </p>

              {/* Features List */}
              <div className="mt-3 space-y-1">
                {item.features?.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-[#D81B60]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Size Selector */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-[#0B192C] uppercase tracking-wider mb-1.5">
                  Select Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {item.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        selectedSize === size
                          ? 'border-brand-pink bg-brand-pink text-white shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-[#D81B60] hover:bg-[#C2185B] text-white py-3 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-pink-600/20 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider shadow transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Order Instantly on WhatsApp</span>
              </button>
            </div>

            {/* Micro Guarantees */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-500 pt-1">
              <div className="flex flex-col items-center">
                <Truck className="w-3.5 h-3.5 text-slate-400 mb-0.5" />
                <span>Fast KTM Delivery</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400 mb-0.5" />
                <span>100% Genuine</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-3.5 h-3.5 text-slate-400 mb-0.5" />
                <span>Easy Exchange</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
