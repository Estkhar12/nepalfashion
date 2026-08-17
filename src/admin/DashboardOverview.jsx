import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  ArrowUpRight, 
  FileText, 
  Plus, 
  Package, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DashboardOverview = () => {
  const { 
    orders, 
    products, 
    customers, 
    setAdminTab, 
    openInvoiceForOrder, 
    updateOrderStatus,
    sampleHistoricalSales 
  } = useStore();

  // Metrics calculations
  const totalRevenue = orders.reduce((acc, order) => acc + (order.orderStatus !== 'Cancelled' ? order.total : 0), 0);
  const totalDeliveredOrders = orders.filter((o) => o.orderStatus === 'Delivered').length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Processing').length;
  const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const lowStockProducts = products.filter((p) => (p.stock || 0) < 10);

  const kpis = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: `Rs. ${totalRevenue.toLocaleString()}`,
      subtitle: '+18.4% from last week',
      icon: <DollarSign className="w-6 h-6 text-white" />,
      bg: 'bg-gradient-to-tr from-[#D81B60] to-[#E91E63]',
      accent: 'text-pink-600',
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: orders.length.toString(),
      subtitle: `${pendingOrders} awaiting fulfillment`,
      icon: <ShoppingBag className="w-6 h-6 text-white" />,
      bg: 'bg-gradient-to-tr from-[#0B192C] to-[#1E293B]',
      accent: 'text-slate-800',
    },
    {
      id: 'aov',
      title: 'Average Order Value',
      value: `Rs. ${averageOrderValue.toLocaleString()}`,
      subtitle: 'Based on recent sales',
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      bg: 'bg-gradient-to-tr from-amber-600 to-amber-500',
      accent: 'text-amber-600',
    },
    {
      id: 'customers',
      title: 'Active Customers',
      value: customers.length.toString(),
      subtitle: '94% repeat purchase rate',
      icon: <Users className="w-6 h-6 text-white" />,
      bg: 'bg-gradient-to-tr from-emerald-600 to-teal-600',
      accent: 'text-emerald-600',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B192C]">
            Admin Executive Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time analytics, inventory levels, and orders for Nepal Fashion KTM.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setAdminTab('products')}
            className="flex items-center gap-1.5 bg-[#D81B60] hover:bg-[#C2185B] text-white px-4 py-2 rounded-xl text-xs font-bold shadow transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Garment</span>
          </button>
          
          <button
            onClick={() => setAdminTab('reports')}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow transition-all"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Full Reports</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {kpis.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {kpi.title}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#0B192C] font-serif mt-1 block">
                {kpi.value}
              </span>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
                {kpi.subtitle}
              </span>
            </div>

            <div className={`w-12 h-12 rounded-xl ${kpi.bg} flex items-center justify-center shadow-md flex-shrink-0`}>
              {kpi.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Quick Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Revenue Bar Chart */}
        <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif font-bold text-base text-[#0B192C]">
                Weekly Sales Revenue (Kathmandu)
              </h3>
              <p className="text-xs text-slate-500">Daily sales performance over the past 7 days</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4%</span>
            </span>
          </div>

          {/* Dynamic Visual Bar Chart */}
          <div className="pt-4 pb-2">
            <div className="h-44 sm:h-52 flex items-end justify-between gap-2 sm:gap-4 border-b border-slate-100 pb-2">
              {sampleHistoricalSales.weekly.map((item, idx) => {
                const maxSales = 80000;
                const heightPercent = Math.min(Math.round((item.sales / maxSales) * 100), 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <span className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                      Rs. {(item.sales / 1000).toFixed(0)}k
                    </span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 group-hover:brightness-110 shadow-sm ${
                        idx === 5
                          ? 'bg-gradient-to-t from-[#D81B60] to-[#FF4081]'
                          : 'bg-gradient-to-t from-[#0B192C] to-[#334155]'
                      }`}
                    ></div>
                    <span className="text-[10px] sm:text-xs font-medium text-slate-500 text-center truncate max-w-full">
                      {item.day.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-500 pt-2">
            <span>Peak Day: <strong className="text-[#D81B60]">Saturday (Rs. 74,200)</strong></span>
            <span>Avg Daily: <strong>Rs. 41,000</strong></span>
          </div>
        </div>

        {/* Low Stock Alerts & Fast Selling Categories */}
        <div className="lg:col-span-4 space-y-4">
          {/* Low Stock Alert */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif font-bold text-sm text-[#0B192C] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Inventory Alerts</span>
              </h3>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                {lowStockProducts.length} items low
              </span>
            </div>

            <div className="space-y-2.5">
              {lowStockProducts.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/50 border border-amber-100 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-9 h-10 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 uppercase text-[11px]">{item.name}</h4>
                      <p className="text-[10px] text-slate-500">{item.subtitle}</p>
                    </div>
                  </div>

                  <span className="font-bold text-amber-600 font-mono text-xs">
                    {item.stock} left
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setAdminTab('products')}
              className="w-full mt-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors text-center block"
            >
              Manage Inventory Stock
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-[#0B192C] to-[#1E293B] text-white p-5 rounded-2xl shadow-sm">
            <h4 className="font-serif font-bold text-sm text-pink-300 mb-2">
              Kathmandu Storefront Hotline
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              WhatsApp hotline is actively receiving order inquiries for seasonal bridal and party wear.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Hotline +977 9808997824 Online</span>
            </div>
          </div>

        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif font-bold text-base text-[#0B192C]">
              Recent Customer Orders
            </h3>
            <p className="text-xs text-slate-500">Live order processing, status updates, and invoice generation</p>
          </div>

          <button
            onClick={() => setAdminTab('orders')}
            className="text-xs font-bold text-[#D81B60] hover:underline"
          >
            View All {orders.length} Orders →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-100 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3.5 sm:px-6">Invoice / Order ID</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Items</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 sm:px-6 font-mono font-bold text-[#0B192C]">
                    {order.id}
                    <span className="block text-[10px] text-slate-400 font-sans font-normal">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <span className="font-bold text-slate-800 block">{order.customer.name}</span>
                    <span className="text-[11px] text-slate-500">{order.customer.city || 'Kathmandu'}</span>
                  </td>

                  <td className="p-3.5">
                    <span className="font-semibold text-slate-700">
                      {order.items.map((i) => i.name).join(', ')}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {order.items.reduce((sum, i) => sum + i.quantity, 0)} item(s)
                    </span>
                  </td>

                  <td className="p-3.5 font-bold font-mono text-[#0B192C]">
                    Rs. {order.total.toLocaleString()}
                  </td>

                  <td className="p-3.5">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full border focus:outline-none cursor-pointer ${
                        order.orderStatus === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : order.orderStatus === 'Shipped'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : order.orderStatus === 'Processing'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="p-3.5 sm:px-6 text-right">
                    <button
                      onClick={() => openInvoiceForOrder(order)}
                      className="inline-flex items-center gap-1 bg-slate-100 hover:bg-[#D81B60] text-slate-700 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                      title="Generate Tax Invoice"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Invoice</span>
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
