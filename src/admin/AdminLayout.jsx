import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  BarChart3, 
  Tag, 
  Users, 
  Settings, 
  ExternalLink, 
  Menu, 
  X, 
  Bell, 
  Search, 
  Store,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { BrandLogo } from '../components/Icons';
import { useStore } from '../context/StoreContext';
import { DashboardOverview } from './DashboardOverview';
import { ProductsManager } from './ProductsManager';
import { OrdersManager } from './OrdersManager';
import { ReportsAnalytics } from './ReportsAnalytics';
import { DiscountsManager } from './DiscountsManager';
import { CustomersManager } from './CustomersManager';
import { AdminSettings } from './AdminSettings';
import { InvoiceModal } from './InvoiceModal';

export const AdminLayout = () => {
  const { 
    adminTab, 
    setAdminTab, 
    setCurrentView, 
    orders, 
    products, 
    discounts,
    storeSettings 
  } = useStore();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'Pending').length;

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products & Stock', icon: Package, badge: products.length },
    { id: 'orders', label: 'Orders & Invoices', icon: ShoppingBag, badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} New` : null, badgeColor: 'bg-[#D81B60]' },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'discounts', label: 'Discounts & Offers', icon: Tag, badge: discounts.filter(d => d.isActive).length },
    { id: 'customers', label: 'Customer Directory', icon: Users },
    { id: 'settings', label: 'Store & Tax Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-800 flex flex-col antialiased">
      
      {/* 1. TOP HEADER / APP BAR */}
      <header className="sticky top-0 z-30 bg-[#0B192C] text-white border-b border-slate-800 shadow-md">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
          
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Sidebar"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="cursor-pointer" onClick={() => setAdminTab('overview')}>
              <BrandLogo light={true} className="h-10" />
            </div>

            <span className="hidden sm:inline-block bg-[#D81B60] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ml-2">
              Admin Portal
            </span>
          </div>

          {/* Right: Quick Storefront Switch & Admin Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Direct Switch to Customer Storefront */}
            <button
              onClick={() => setCurrentView('storefront')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#D81B60] to-[#E91E63] hover:from-[#C2185B] hover:to-[#D81B60] text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              title="Return to Public Customer Website"
            >
              <Store className="w-4 h-4" />
              <span className="hidden sm:inline">View Public Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Admin Avatar */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-slate-700 border border-pink-400/40 flex items-center justify-center text-pink-300 font-bold text-xs">
                NF
              </div>
              <div className="hidden md:block text-left leading-tight">
                <span className="block text-xs font-bold text-slate-200">KTM Admin</span>
                <span className="block text-[10px] text-pink-400 font-medium">Store Manager</span>
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* 2. BODY: SIDEBAR + MAIN CONTENT */}
      <div className="flex flex-1 relative">
        
        {/* SIDEBAR NAVIGATION (Desktop & Mobile Drawer) */}
        <aside
          className={`fixed lg:sticky top-0 lg:top-[61px] z-40 lg:z-10 h-screen lg:h-[calc(100vh-61px)] w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Top of Sidebar */}
          <div className="p-4 space-y-4">
            
            {/* Mobile close button inside drawer */}
            <div className="flex lg:hidden items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-serif font-bold text-sm text-[#0B192C]">Navigation Menu</span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav list */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = adminTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setAdminTab(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-pink-50 text-[#D81B60] shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#D81B60]' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.badgeColor
                            ? `${item.badgeColor} text-white`
                            : isActive
                            ? 'bg-[#D81B60] text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

          </div>

          {/* Bottom Store Profile Card */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/70 m-3 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0B192C] truncate">Nepal Fashion KTM</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">PAN: {storeSettings.panNumber}</p>
            <p className="text-[11px] text-slate-500 truncate">{storeSettings.address}</p>
          </div>

        </aside>

        {/* Backdrop for mobile drawer */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          ></div>
        )}

        {/* 3. MAIN CONTENT WORKSPACE */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {adminTab === 'overview' && <DashboardOverview />}
          {adminTab === 'products' && <ProductsManager />}
          {adminTab === 'orders' && <OrdersManager />}
          {adminTab === 'reports' && <ReportsAnalytics />}
          {adminTab === 'discounts' && <DiscountsManager />}
          {adminTab === 'customers' && <CustomersManager />}
          {adminTab === 'settings' && <AdminSettings />}
        </main>

      </div>

      {/* Invoice Modal for any active order */}
      <InvoiceModal />

    </div>
  );
};
