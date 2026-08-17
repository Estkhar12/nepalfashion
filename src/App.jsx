import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Collections } from './components/Collections';
import { WhyChooseUs } from './components/WhyChooseUs';
import { PromoBanner } from './components/PromoBanner';
import { Testimonials } from './components/Testimonials';
import { VisitStore } from './components/VisitStore';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { AdminLayout } from './admin/AdminLayout';

function MainStoreApp() {
  const { 
    currentView, 
    cartItems, 
    addToCart, 
    toastMessage, 
    setToastMessage,
    products 
  } = useStore();

  const [selectedItem, setSelectedItem] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleOpenQuickView = (item) => {
    setSelectedItem(item);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedItem(null);
  };

  const handleCategorySelectFromFooter = (categoryName) => {
    const matched = products.find(
      (c) =>
        c.name.toLowerCase() === categoryName.toLowerCase() ||
        c.subtitle.toLowerCase().includes(categoryName.toLowerCase())
    );
    if (matched) {
      handleOpenQuickView(matched);
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // If Admin View is active, render the full Admin Dashboard!
  if (currentView === 'admin') {
    return (
      <>
        <AdminLayout />
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      </>
    );
  }

  // Public Storefront View
  return (
    <div className="min-h-screen bg-[#FCF9F6] text-slate-800 flex flex-col font-sans selection:bg-brand-pink selection:text-white">
      
      {/* 1. Top Navbar with Phone CTA, Admin switch & Cart */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* 2. Hero Section: Headline, dual CTAs, circular model portal, 4 badges */}
        <Hero
          onShopClick={() => {
            const el = document.getElementById('collection');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onContactClick={() => {
            const el = document.getElementById('contact');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Explore Our Collections: Dynamic Garment Cards from Admin Catalog */}
        <Collections
          onSelectCollection={handleOpenQuickView}
          onAddToCart={addToCart}
        />

        {/* 4. Why Choose Nepal Fashion KTM: 6 Circular Badges */}
        <WhyChooseUs />

        {/* 5. Promotional Callout Banner: "Fashion That Speaks You ♡" */}
        <PromoBanner
          onShopNow={() => {
            const el = document.getElementById('collection');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 6. What Our Customers Say: 3 Testimonial Cards & Temple Watermark */}
        <Testimonials />

        {/* 7. Visit Our Store: 4 Contact Pills (Location, Phone, WhatsApp, Email) */}
        <VisitStore />

      </main>

      {/* 8. Midnight Navy Footer */}
      <Footer
        onSelectCategory={handleCategorySelectFromFooter}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        item={selectedItem}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        onAddToCart={addToCart}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />

    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainStoreApp />
    </StoreProvider>
  );
}
