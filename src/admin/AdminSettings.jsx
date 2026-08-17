import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  RotateCcw, 
  Store, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Truck, 
  ShieldCheck 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AdminSettings = () => {
  const { storeSettings, setStoreSettings, resetToSampleData, showToast } = useStore();
  const [formData, setFormData] = useState({ ...storeSettings });

  const handleSave = (e) => {
    e.preventDefault();
    setStoreSettings({
      ...formData,
      standardDeliveryFee: Number(formData.standardDeliveryFee),
      freeDeliveryThreshold: Number(formData.freeDeliveryThreshold),
      vatRate: Number(formData.vatRate),
    });
    showToast('Store settings saved successfully!');
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B192C]">
            Store Profile & Tax Configuration
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure official PAN number, store location in Kathmandu, courier delivery charges, and invoice details.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#D81B60] hover:bg-[#C2185B] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Business Details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-[#0B192C] flex items-center gap-2 border-b border-slate-100 pb-3">
            <Store className="w-5 h-5 text-brand-pink" />
            <span>Store Identity & Legal Info</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Store Name</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-[#0B192C] focus:ring-2 focus:ring-brand-pink focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Official Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-pink focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">PAN / VAT Reg Number *</label>
              <input
                type="text"
                value={formData.panNumber}
                onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono font-bold text-brand-pink focus:ring-2 focus:ring-brand-pink focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Printed on all customer tax invoices</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Store Address (Kathmandu)</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-pink focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Hotlines */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-[#0B192C] flex items-center gap-2 border-b border-slate-100 pb-3">
            <Phone className="w-5 h-5 text-brand-pink" />
            <span>Customer Contact Hotlines</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Store Phone Hotline</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono font-bold focus:ring-2 focus:ring-brand-pink focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">WhatsApp Order Number</label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono font-bold text-emerald-600 focus:ring-2 focus:ring-brand-pink focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Official Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-pink focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Delivery & Taxation */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-[#0B192C] flex items-center gap-2 border-b border-slate-100 pb-3">
            <Truck className="w-5 h-5 text-brand-pink" />
            <span>Kathmandu Delivery & Taxation</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Standard Courier Fee (Rs.)</label>
              <input
                type="number"
                value={formData.standardDeliveryFee}
                onChange={(e) => setFormData({ ...formData, standardDeliveryFee: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-brand-pink focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Free Delivery Min Spend (Rs.)</label>
              <input
                type="number"
                value={formData.freeDeliveryThreshold}
                onChange={(e) => setFormData({ ...formData, freeDeliveryThreshold: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-brand-pink focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Tax / VAT Inclusion</label>
              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVatEnabled}
                    onChange={(e) => setFormData({ ...formData, isVatEnabled: e.target.checked })}
                    className="w-4 h-4 text-brand-pink rounded focus:ring-brand-pink"
                  />
                  <span className="font-semibold text-slate-700">Add 13% VAT to Invoice</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone: Reset Demo Data */}
        <div className="bg-red-50/50 p-6 rounded-2xl border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-red-900 text-sm">Reset Demo Records</h4>
            <p className="text-xs text-red-600 mt-0.5">
              Restore initial seed products, orders, coupons, and customer records.
            </p>
          </div>

          <button
            type="button"
            onClick={resetToSampleData}
            className="flex items-center gap-1.5 bg-white border border-red-300 hover:bg-red-100 text-red-700 px-4 py-2 rounded-xl text-xs font-bold transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </button>
        </div>

      </form>

    </div>
  );
};
