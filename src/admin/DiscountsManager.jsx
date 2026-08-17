import React, { useState } from 'react';
import { 
  Percent, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Tag, 
  Calendar, 
  Sparkles, 
  Sliders, 
  Megaphone,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DiscountsManager = () => {
  const { discounts, addDiscount, toggleDiscount, deleteDiscount, storeSettings, setStoreSettings, showToast } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    type: 'percentage', // percentage or fixed
    value: 20,
    minOrder: 3000,
    maxDiscount: 2000,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: '2026-11-30',
    usageLimit: 300,
  });

  // Promotional Banner Text state
  const [bannerText, setBannerText] = useState(storeSettings.announcementText || '');

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!formData.code.trim()) {
      showToast('Please enter a coupon code (e.g. DASHAIN25)');
      return;
    }

    addDiscount({
      ...formData,
      code: formData.code.trim().toUpperCase(),
      value: Number(formData.value),
      minOrder: Number(formData.minOrder),
      maxDiscount: Number(formData.maxDiscount),
      usageLimit: Number(formData.usageLimit),
    });

    setIsModalOpen(false);
    setFormData({
      code: '',
      title: '',
      type: 'percentage',
      value: 20,
      minOrder: 3000,
      maxDiscount: 2000,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: '2026-11-30',
      usageLimit: 300,
    });
  };

  const handleSaveBanner = (e) => {
    e.preventDefault();
    setStoreSettings({
      ...storeSettings,
      announcementText: bannerText,
    });
    showToast('Homepage promotional banner updated live!');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B192C]">
            Discounts, Offers & Promotions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure Dashain/Tihar festival coupons, special promotional discounts, and live store banners.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#D81B60] hover:bg-[#C2185B] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* Live Homepage Promotional Banner Editor */}
      <div className="bg-gradient-to-r from-[#6A0C38] via-[#B81655] to-[#8C0C43] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <Megaphone className="w-5 h-5 text-pink-200 animate-bounce" />
          <h3 className="font-serif font-bold text-base sm:text-lg">
            Live Storefront Promotional Banner Controller
          </h3>
        </div>
        <p className="text-xs text-pink-100 mb-4 max-w-xl">
          Edit the seasonal campaign text displayed across the promotional banner on the public homepage in real-time.
        </p>

        <form onSubmit={handleSaveBanner} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={bannerText}
            onChange={(e) => setBannerText(e.target.value)}
            placeholder="e.g. Dashain & Tihar Special Offer - Flat 25% Off with code DASHAIN25!"
            className="flex-grow bg-white/15 text-white placeholder:text-pink-200/70 px-4 py-2.5 rounded-xl border border-white/30 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="bg-white hover:bg-pink-50 text-[#8C0C43] px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all uppercase tracking-wider flex-shrink-0"
          >
            Update Live Banner
          </button>
        </form>
      </div>

      {/* Active Discount Coupons Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-[#0B192C]">
            Active Coupon Codes
          </h3>
          <span className="text-xs font-bold text-[#D81B60] bg-pink-50 px-3 py-1 rounded-full">
            {discounts.filter((d) => d.isActive).length} Active Offers
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-100 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3.5 sm:px-6">Promo Code</th>
                <th className="p-3.5">Campaign Name</th>
                <th className="p-3.5">Discount Value</th>
                <th className="p-3.5">Min Order (Rs.)</th>
                <th className="p-3.5">Valid Until</th>
                <th className="p-3.5">Redemptions</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {discounts.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Code */}
                  <td className="p-3.5 sm:px-6">
                    <span className="font-mono font-bold text-xs bg-pink-50 text-[#D81B60] px-2.5 py-1 rounded-lg border border-pink-200 tracking-wider">
                      {d.code}
                    </span>
                  </td>

                  {/* Title */}
                  <td className="p-3.5 font-bold text-slate-800">
                    {d.title}
                  </td>

                  {/* Value */}
                  <td className="p-3.5 font-bold font-mono text-emerald-600 text-sm">
                    {d.type === 'percentage' ? `${d.value}% OFF` : `Rs. ${d.value} FLAT`}
                  </td>

                  {/* Min Order */}
                  <td className="p-3.5 font-mono text-slate-600">
                    Rs. {d.minOrder?.toLocaleString() || 0}
                  </td>

                  {/* Dates */}
                  <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                    {d.endDate}
                  </td>

                  {/* Redemptions */}
                  <td className="p-3.5 font-mono text-slate-700">
                    <strong>{d.usedCount || 0}</strong> / {d.usageLimit}
                  </td>

                  {/* Toggle */}
                  <td className="p-3.5">
                    <button
                      onClick={() => toggleDiscount(d.id)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-colors ${
                        d.isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {d.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </td>

                  {/* Delete */}
                  <td className="p-3.5 sm:px-6 text-right">
                    <button
                      onClick={() => deleteDiscount(d.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE COUPON MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-scaleUp">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-serif font-bold text-lg text-[#0B192C]">
                Create Festival / Discount Offer
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 pt-4 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DASHAIN25"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold text-[#D81B60] uppercase focus:ring-2 focus:ring-brand-pink focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Discount Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:ring-2 focus:ring-brand-pink focus:outline-none"
                  >
                    <option value="percentage">Percentage (%) Discount</option>
                    <option value="fixed">Fixed Amount (Rs.) Off</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Offer Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dashain Festival 25% Off"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-pink focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Value ({formData.type === 'percentage' ? '%' : 'Rs.'}) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold text-[#D81B60] focus:ring-2 focus:ring-brand-pink focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Min Order (Rs.)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-brand-pink focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Max Cap (Rs.)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-brand-pink focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Valid Until Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-brand-pink focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Usage Limit</label>
                  <input
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-brand-pink focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-bold bg-[#D81B60] hover:bg-[#C2185B] text-white shadow"
                >
                  Save & Activate
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
