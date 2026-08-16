import React, { useState, useEffect } from 'react';
import { BrandLogo } from './Icons';
import { Phone, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { storeInfo } from '../data/products';

export const Navbar = ({ cartCount = 0, onOpenCart, onOpenWishlist, wishlistCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for nav highlight
      const sections = ['home', 'collection', 'why-us', 'about', 'contact'];
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Collection', href: '#collection', id: 'collection' },
    { name: 'New Arrivals', href: '#collection', id: 'new-arrivals' },
    { name: 'About Us', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#F3E5D8] py-2'
          : 'bg-[#FCF9F6] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center group">
            <BrandLogo />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9 text-[15px] font-medium text-slate-700">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id || (link.id === 'new-arrivals' && activeSection === 'collection');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-200 hover:text-brand-pink ${
                    isActive
                      ? 'text-brand-pink font-semibold'
                      : 'text-slate-700'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-pink rounded-full"></span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Phone Button & Cart */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Direct Call Button (Exact matching red/pink pill with phone icon) */}
            <a
              href={`tel:${storeInfo.phone}`}
              className="flex items-center gap-2 bg-[#D81B60] hover:bg-[#C2185B] text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              title="Call Nepal Fashion KTM"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-3 h-3 fill-current text-white" />
              </div>
              <span className="tracking-wide font-sans">{storeInfo.phone}</span>
            </a>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-white border border-[#EFE2D3] hover:border-brand-pink text-slate-700 hover:text-brand-pink transition-all shadow-sm hover:shadow"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-pink text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu & Cart Icon */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-slate-700 hover:text-brand-pink"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute 0 right-0 bg-brand-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-brand-pink focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-[#F3E5D8] px-4 pt-3 pb-6 space-y-4 shadow-xl animate-fadeIn">
          <div className="flex flex-col space-y-3 font-medium text-slate-800 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-brand-pink-soft hover:text-brand-pink transition-colors text-base"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <a
              href={`tel:${storeInfo.phone}`}
              className="flex items-center justify-center gap-2 w-full bg-[#D81B60] text-white py-3 rounded-full font-semibold text-sm shadow-md"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>{storeInfo.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
