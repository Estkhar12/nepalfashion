import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Award, 
  ShoppingBag,
  ExternalLink 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CustomersManager = () => {
  const { customers, orders, openInvoiceForOrder } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('ALL');

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === 'ALL' || c.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const handleWhatsAppCustomer = (cust) => {
    const text = encodeURIComponent(
      `Namaste ${cust.name}! Greetings from Nepal Fashion KTM. We have exclusive new traditional and festive arrivals in stock!`
    );
    window.open(`https://wa.me/${cust.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B192C]">
            Customer Directory & CRM
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your loyal Kathmandu customer database, order histories, and VIP rewards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#D81B60] bg-pink-50 px-3 py-1.5 rounded-xl border border-pink-100">
            {customers.length} Registered Clients
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, phone, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-pink"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink"
          >
            <option value="ALL">All Loyalty Tiers</option>
            <option value="VIP Gold">VIP Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </select>
        </div>
      </div>

      {/* Customers Cards / Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-100 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3.5 sm:px-6">Customer Name</th>
                <th className="p-3.5">Contact & City</th>
                <th className="p-3.5">Loyalty Tier</th>
                <th className="p-3.5">Lifetime Orders</th>
                <th className="p-3.5">Total Spent (Rs.)</th>
                <th className="p-3.5">Last Purchase</th>
                <th className="p-3.5 sm:px-6 text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Name */}
                  <td className="p-3.5 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D81B60] to-[#E91E63] text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
                        {cust.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{cust.name}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">ID: {cust.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="p-3.5">
                    <span className="font-mono text-slate-700 block font-semibold">{cust.phone}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{cust.city}</span>
                    </span>
                  </td>

                  {/* Tier */}
                  <td className="p-3.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        cust.tier.includes('VIP')
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : cust.tier === 'Silver'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-orange-50 text-orange-700'
                      }`}
                    >
                      <Award className="w-3 h-3" />
                      <span>{cust.tier}</span>
                    </span>
                  </td>

                  {/* Orders */}
                  <td className="p-3.5 font-bold font-mono text-slate-800">
                    {cust.totalOrders} order(s)
                  </td>

                  {/* Spend */}
                  <td className="p-3.5 font-bold font-mono text-[#D81B60] text-sm">
                    Rs. {cust.totalSpent.toLocaleString()}
                  </td>

                  {/* Last Purchase */}
                  <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                    {cust.lastOrderDate}
                  </td>

                  {/* Quick Contact Button */}
                  <td className="p-3.5 sm:px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleWhatsAppCustomer(cust)}
                        className="flex items-center gap-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow transition-all"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
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
