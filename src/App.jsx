import React, { useState, useEffect } from 'react';
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
import { collectionsData } from './data/products';

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Cart state initialized with 1 sample item for immediate richness, or from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('nepal_fashion_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        ...collectionsData[1], // Kurtis item
        selectedSize: 'M',
        selectedColor: '#E91E63',
        quantity: 1,
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('nepal_fashion_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const handleOpenQuickView = (item) => {
    setSelectedItem(item);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedItem(null);
  };

  const handleAddToCart = (newItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === newItem.id && i.selectedSize === newItem.selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity || 1;
        return updated;
      }
      return [...prev, newItem];
    });
    showToast(`Added ${newItem.name} (${newItem.selectedSize}) to your bag!`);
  };

  const handleUpdateQuantity = (id, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.selectedSize === size))
    );
    showToast('Item removed from shopping bag');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCategorySelectFromFooter = (categoryName) => {
    const matched = collectionsData.find(
      (c) => c.name.toLowerCase() === categoryName.toLowerCase() ||
             c.subtitle.toLowerCase().includes(categoryName.toLowerCase())
    );
    if (matched) {
      handleOpenQuickView(matched);
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FCF9F6] text-slate-800 flex flex-col font-sans selection:bg-brand-pink selection:text-white">
      
      {/* 1. Top Navbar with Phone CTA & Cart */}
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

        {/* 3. Explore Our Collections: 6 Cards matching original layout */}
        <Collections
          onSelectCollection={handleOpenQuickView}
          onAddToCart={handleAddToCart}
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
        onShowToast={showToast}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        item={selectedItem}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        onAddToCart={handleAddToCart}
        onShowToast={showToast}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />

    </div>
  );
}
