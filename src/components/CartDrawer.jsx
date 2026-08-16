import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { storeInfo } from '../data/products';

export const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart, onShowToast }) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = subtotal > 5000 || subtotal === 0 ? 0 : 150;
  const grandTotal = subtotal + deliveryCharge;

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;
    
    let text = `🛍️ *New Order from Nepal Fashion KTM Website* 🛍️\n\n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. *${item.name}* (${item.subtitle})\n   Size: ${item.selectedSize}\n   Qty: ${item.quantity} × Rs. ${item.price.toLocaleString()} = Rs. ${(item.price * item.quantity).toLocaleString()}\n\n`;
    });
    text += `*Subtotal:* Rs. ${subtotal.toLocaleString()}\n`;
    text += `*Delivery (Kathmandu Valley):* ${deliveryCharge === 0 ? 'FREE' : 'Rs. ' + deliveryCharge}\n`;
    text += `*Grand Total:* Rs. ${grandTotal.toLocaleString()}\n\n`;
    text += `Please confirm my order and share delivery schedule!`;

    window.open(`https://wa.me/9779808997824?text=${encodeURIComponent(text)}`, '_blank');
    onShowToast?.('Redirecting to WhatsApp to complete order...');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#F3E5D8] flex items-center justify-between bg-[#FCF9F6]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#D81B60] text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#0B192C]">
                Your Shopping Bag
              </h3>
              <span className="bg-pink-100 text-[#D81B60] text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((total, item) => total + item.quantity, 0)} items
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-500 hover:text-brand-pink hover:bg-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FCE4EC] flex items-center justify-center text-[#D81B60]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-slate-800 text-lg">Your bag is empty</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Explore our exquisite collections of sarees, kurtis, western wear, and accessories.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-[#D81B60] text-white text-xs font-bold px-6 py-2.5 rounded-full uppercase tracking-wider shadow"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex gap-3.5 p-3 rounded-2xl border border-[#ECDCCB] bg-[#FCF9F6] relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif font-bold text-sm text-[#0B192C] uppercase">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id, item.selectedSize)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        Size: <span className="font-bold text-slate-700">{item.selectedSize}</span>
                      </p>
                      <p className="text-xs font-bold text-[#D81B60] mt-1">
                        Rs. {item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-2xl">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                          className="p-1 text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="p-1 text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-extrabold text-[#0B192C]">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#ECDCCB] bg-[#FCF9F6] space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery (Kathmandu Valley)</span>
                  <span className="font-semibold text-emerald-600">
                    {deliveryCharge === 0 ? 'FREE' : `Rs. ${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0B192C] pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-[#D81B60] text-base">Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Order via WhatsApp CTA */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Complete Order via WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  onShowToast?.('Order placed successfully! We will call you to confirm delivery.');
                  onClearCart();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#0B192C] hover:bg-[#1E293B] text-white py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>Direct Cash On Delivery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
