import React, { useState } from 'react';
import { 
  Calendar, 
  Download, 
  Printer, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Percent, 
  Package, 
  ArrowUpRight, 
  PieChart, 
  BarChart3,
  Layers
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ReportsAnalytics = () => {
  const { orders, sampleHistoricalSales, showToast } = useStore();
  const [reportPeriod, setReportPeriod] = useState('monthly'); // 'weekly' | 'monthly' | 'yearly' | 'all'

  // Calculations based on orders and historical records
  const currentOrders = orders.filter((o) => o.orderStatus !== 'Cancelled');
  const totalGrossSales = currentOrders.reduce((sum, o) => sum + o.subtotal, 0);
  const totalDiscountsGiven = currentOrders.reduce((sum, o) => sum + (o.discountAmount || 0), 0);
  const totalNetSales = currentOrders.reduce((sum, o) => sum + o.total, 0);
  const totalDeliveryCollected = currentOrders.reduce((sum, o) => sum + o.deliveryFee, 0);

  // Period-specific dynamic figures
  let displaySales = totalNetSales;
  let displayOrdersCount = currentOrders.length;
  let chartData = [];
  let periodTitle = '';

  if (reportPeriod === 'weekly') {
    periodTitle = 'Past 7 Days (Weekly Performance)';
    chartData = sampleHistoricalSales.weekly.map((w) => ({ label: w.day, value: w.sales, orders: w.orders }));
    displaySales = sampleHistoricalSales.weekly.reduce((acc, w) => acc + w.sales, 0);
    displayOrdersCount = sampleHistoricalSales.weekly.reduce((acc, w) => acc + w.orders, 0);
  } else if (reportPeriod === 'yearly') {
    periodTitle = 'Annual Sales (2024 - 2026 YTD)';
    chartData = sampleHistoricalSales.yearly.map((y) => ({ label: y.year, value: y.sales, orders: y.orders }));
    displaySales = 3175000;
    displayOrdersCount = 520;
  } else {
    // monthly
    periodTitle = 'Monthly Trend (Past 6 Months)';
    chartData = sampleHistoricalSales.monthly.map((m) => ({ label: m.month, value: m.sales, orders: m.orders }));
    displaySales = 495000;
    displayOrdersCount = 81;
  }

  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Invoice ID,Date,Customer Name,Phone,City,Subtotal (Rs.),Discount (Rs.),Total (Rs.),Status,Payment\n';

    orders.forEach((o) => {
      csvContent += `"${o.id}","${new Date(o.date).toLocaleDateString()}","${o.customer.name}","${o.customer.phone}","${o.customer.city || 'Kathmandu'}",${o.subtotal},${o.discountAmount || 0},${o.total},"${o.orderStatus}","${o.paymentMethod}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Nepal_Fashion_KTM_Report_${reportPeriod}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Sales Report CSV downloaded successfully!');
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header with Period Switcher & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm print:border-none print:p-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B192C]">
            Sales & Financial Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Weekly, monthly, and annual turnover reports for Nepal Fashion KTM.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 print:hidden">
          {/* Period Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['weekly', 'monthly', 'yearly'].map((p) => (
              <button
                key={p}
                onClick={() => setReportPeriod(p)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  reportPeriod === p
                    ? 'bg-white text-[#D81B60] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow transition-all"
            title="Download CSV Spreadsheet"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrintReport}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow transition-all"
            title="Print Report"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Net Turnover ({reportPeriod})
          </span>
          <span className="text-2xl font-serif font-bold text-[#D81B60] mt-1 block">
            Rs. {displaySales.toLocaleString()}
          </span>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+21.8% vs previous period</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Orders Delivered
          </span>
          <span className="text-2xl font-serif font-bold text-[#0B192C] mt-1 block">
            {displayOrdersCount} Orders
          </span>
          <span className="text-[11px] text-slate-400 font-medium mt-1 block">
            Avg Rs. {Math.round(displaySales / (displayOrdersCount || 1)).toLocaleString()} / order
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Total Discounts Applied
          </span>
          <span className="text-2xl font-serif font-bold text-emerald-600 mt-1 block">
            Rs. {totalDiscountsGiven.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 font-medium mt-1 block">
            Dashain & Welcome Offers
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Estimated Gross Margin
          </span>
          <span className="text-2xl font-serif font-bold text-slate-800 mt-1 block">
            44.5%
          </span>
          <span className="text-[11px] text-slate-400 font-medium mt-1 block">
            High margin on designer Sarees
          </span>
        </div>

      </div>

      {/* Main Visual Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="font-serif font-bold text-base text-[#0B192C]">
              {periodTitle}
            </h3>
            <p className="text-xs text-slate-500">Revenue volume in Nepali Rupees (NPR)</p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            Currency: NPR (Rs.)
          </span>
        </div>

        {/* Dynamic Bar Chart */}
        <div className="pt-2 pb-4">
          <div className="h-56 sm:h-64 flex items-end justify-between gap-3 sm:gap-6 border-b border-slate-200 pb-3">
            {chartData.map((item, idx) => {
              const maxVal = Math.max(...chartData.map((d) => d.value)) * 1.15;
              const heightPercent = Math.min(Math.round((item.value / maxVal) * 100), 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="text-[10px] font-bold text-slate-700 opacity-80 group-hover:opacity-100 transition-opacity font-mono text-center">
                    Rs. {(item.value / 1000).toFixed(0)}k
                  </div>
                  <div
                    style={{ height: `${Math.max(heightPercent, 8)}%` }}
                    className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-[#0B192C] via-[#D81B60] to-[#FF4081] shadow-sm group-hover:brightness-110 transition-all duration-500"
                  ></div>
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-600 text-center truncate max-w-full">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Breakdown & Garments Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Share */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-[#0B192C] flex items-center gap-2">
            <PieChart className="w-5 h-5 text-brand-pink" />
            <span>Category Revenue Share</span>
          </h3>

          <div className="space-y-3 pt-2">
            {sampleHistoricalSales.categoryBreakdown.map((cat) => (
              <div key={cat.category} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>{cat.category} ({cat.itemsSold} pcs sold)</span>
                  <span className="font-mono text-[#D81B60]">
                    Rs. {cat.revenue.toLocaleString()} ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    style={{ width: `${cat.percentage}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-[#D81B60] to-[#0B192C]"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Garments Table */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-[#0B192C] flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-pink" />
            <span>Top Performing Garments</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 text-slate-500 font-bold uppercase">
                <tr>
                  <th className="pb-2">Collection</th>
                  <th className="pb-2 text-center">Units Sold</th>
                  <th className="pb-2 text-right">Turnover (Rs.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 font-bold text-[#0B192C]">Traditional & Designer SAREES</td>
                  <td className="py-2.5 text-center font-mono">168 pcs</td>
                  <td className="py-2.5 text-right font-bold font-mono text-[#D81B60]">Rs. 1,016,000</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 font-bold text-[#0B192C]">Daily & Party Wear KURTIS</td>
                  <td className="py-2.5 text-center font-mono">242 pcs</td>
                  <td className="py-2.5 text-right font-bold font-mono text-[#D81B60]">Rs. 825,500</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 font-bold text-[#0B192C]">Premium ETHNIC SETS</td>
                  <td className="py-2.5 text-center font-mono">94 pcs</td>
                  <td className="py-2.5 text-right font-bold font-mono text-[#D81B60]">Rs. 698,500</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 font-bold text-[#0B192C]">Modern Fashion WESTERN WEAR</td>
                  <td className="py-2.5 text-center font-mono">71 pcs</td>
                  <td className="py-2.5 text-right font-bold font-mono text-[#D81B60]">Rs. 349,250</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
};
