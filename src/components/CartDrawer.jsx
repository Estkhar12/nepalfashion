import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  MessageCircle, 
  Tag, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer = ({ isOpen, onClose }) => {
  const { 
    cartItems, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    createOrder,
    appliedCoupon, 
    applyCouponCode, 
    removeCouponCode, 
    storeSettings, 
    showToast 
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('Kathmandu, Nepal');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountVal = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const deliveryCharge = subtotal > (storeSettings.freeDeliveryThreshold || 5000) || subtotal === 0 ? 0 : (storeSettings.standardDeliveryFee || 150);
  const grandTotal = Math.max(0, subtotal - discountVal + deliveryCharge);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput, subtotal);
    showToast(res.message);
    if (res.success) setCouponInput('');
  };

  const handleCompleteOrder = (method = 'Cash On Delivery') => {
    if (cartItems.length === 0) return;

    const finalName = customerName.trim() || 'Kathmandu Customer';
    const finalPhone = customerPhone.trim() || '+977 98XXXXXXXX';

    // Register order in Admin Database
    const newOrder = createOrder({
      customer: {
        name: finalName,
        phone: finalPhone,
        email: `${finalName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        address: customerAddress,
        city: 'Kathmandu',
      },
      items: cartItems,
      subtotal,
      discountCode: appliedCoupon ? appliedCoupon.code : '',
      discountAmount: discountVal,
      deliveryFee: deliveryCharge,
      total: grandTotal,
      paymentMethod: method,
      paymentStatus: method === 'Cash On Delivery' ? 'Pending' : 'Paid',
      notes: 'Customer online order.',
    });

    if (method === 'WhatsApp') {
      let text = `🛍️ *Order ${newOrder.id} - Nepal Fashion KTM* 🛍️\n\n`;
      text += `*Customer:* ${finalName}\n*Phone:* ${finalPhone}\n*Address:* ${customerAddress}\n\n*Items:*\n`;
      cartItems.forEach((item, index) => {
        text += `${index + 1}. *${item.name}* (${item.subtitle})\n   Size: ${item.selectedSize}\n   Qty: ${item.quantity} × Rs. ${item.price.toLocaleString()} = Rs. ${(item.price * item.quantity).toLocaleString()}\n\n`;
      });
      if (appliedCoupon) {
        text += `*Coupon (${appliedCoupon.code}):* - Rs. ${discountVal.toLocaleString()}\n`;
      }
      text += `*Delivery:* ${deliveryCharge === 0 ? 'FREE' : 'Rs. ' + deliveryCharge}\n`;
      text += `*Grand Total:* Rs. ${grandTotal.toLocaleString()}\n\n`;
      text += `Please confirm my order and share delivery schedule!`;

      window.open(`https://wa.me/9779808997824?text=${encodeURIComponent(text)}`, '_blank');
      showToast('Order created! Opening WhatsApp to connect with Kathmandu store...');
    } else {
      showToast(`Order ${newOrder.id} confirmed! We will call you at ${finalPhone} before delivery.`);
    }

    clearCart();
    onClose();
    setShowCheckoutForm(false);
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
              <>
                {cartItems.map((item) => (
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
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
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
                        <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-sm">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.selectedSize, item.quantity - 1)}
                            className="p-1 text-slate-600 hover:bg-slate-100 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.selectedSize, item.quantity + 1)}
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
                ))}

                {/* Promo / Coupon Code Section */}
                <div className="p-3.5 rounded-2xl bg-pink-50/60 border border-pink-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B192C] flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#D81B60]" />
                      <span>Have a Promo Coupon?</span>
                    </span>
                    <span className="text-[10px] text-[#D81B60] font-semibold">
                      e.g. DASHAIN25, TIHAR15
                    </span>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-emerald-300 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>{appliedCoupon.code} Applied (- Rs. {appliedCoupon.discountAmount.toLocaleString()})</span>
                      </div>
                      <button
                        onClick={removeCouponCode}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter Promo Code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="flex-1 bg-white text-slate-800 uppercase font-mono font-semibold px-3 py-1.5 rounded-xl border border-pink-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-pink"
                      />
                      <button
                        type="submit"
                        className="bg-[#D81B60] hover:bg-[#C2185B] text-white px-4 py-1.5 rounded-xl font-bold text-xs shadow-sm"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                {/* Quick Customer Checkout Form Toggle */}
                {showCheckoutForm && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs animate-fadeIn">
                    <span className="font-bold text-[#0B192C] block uppercase tracking-wider text-[11px]">
                      Delivery Contact Details (Kathmandu)
                    </span>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-white px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-pink"
                    />
                    <input
                      type="tel"
                      placeholder="Your Mobile Phone Number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-white px-3 py-1.5 rounded-lg border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-brand-pink"
                    />
                    <input
                      type="text"
                      placeholder="Delivery Address in Kathmandu/Lalitpur"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full bg-white px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-pink"
                    />
                  </div>
                )}
              </>
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

                {discountVal > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>- Rs. {discountVal.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery (Kathmandu Valley)</span>
                  <span className="font-semibold text-emerald-600">
                    {deliveryCharge === 0 ? 'FREE' : `Rs. ${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0B192C] pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-[#D81B60] text-base font-mono">Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {!showCheckoutForm ? (
                <button
                  onClick={() => setShowCheckoutForm(true)}
                  className="w-full bg-[#0B192C] hover:bg-[#1E293B] text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <div className="space-y-2">
                  {/* Order via WhatsApp CTA */}
                  <button
                    onClick={() => handleCompleteOrder('WhatsApp')}
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Complete on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleCompleteOrder('Cash On Delivery')}
                    className="w-full flex items-center justify-center gap-2 bg-[#D81B60] hover:bg-[#C2185B] text-white py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <span>Confirm Cash On Delivery</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
