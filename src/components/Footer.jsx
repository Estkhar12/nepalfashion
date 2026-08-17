import React, { useState } from 'react';
import { BrandLogo } from './Icons';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer = ({ onSelectCategory }) => {
  const { setCurrentView, showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }
    showToast('Thank you for subscribing to Nepal Fashion KTM updates!');
    setEmail('');
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Collection', href: '#collection' },
    { name: 'New Arrivals', href: '#collection' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const categories = [
    'Sarees',
    'Kurtis',
    'Western Wear',
    'Accessories',
    'Ethnic Sets',
    'New Arrivals',
  ];

  return (
    <footer className="bg-[#07111F] text-slate-300 relative overflow-hidden pt-12 sm:pt-16 pb-8 border-t border-slate-800">
      
      {/* Decorative Gold Botanical Corner Watermark */}
      <div className="absolute right-0 top-0 w-80 h-80 opacity-10 pointer-events-none select-none text-[#D4AF37]">
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-full h-full">
          <circle cx="150" cy="50" r="40" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="150" cy="50" r="70" strokeWidth="1" />
          <path d="M150 0 Q 170 50, 200 50 Q 150 70, 150 120 Q 130 50, 100 50 Q 150 30, 150 0 Z" strokeWidth="1.5" />
          <path d="M150 50 L 190 90 M150 50 L 110 90 M150 50 L 190 10 M150 50 L 110 10" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand Logo & Description */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo light={true} />
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm pt-2">
              <span className="text-brand-pink font-semibold">Your one-stop destination</span> for premium ladies' wear in Kathmandu. Style, quality & you.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setCurrentView('admin')}
                className="inline-flex items-center gap-2 text-xs font-bold text-pink-300 hover:text-white bg-slate-800/90 hover:bg-slate-800 px-3.5 py-1.5 rounded-lg border border-slate-700 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-pink-400" />
                <span>Store Staff & Admin Portal</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white tracking-widest uppercase font-serif border-b border-slate-800 pb-2">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400 font-medium">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center gap-1.5 hover:text-brand-pink transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-pink transform group-hover:translate-x-0.5 transition-all" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white tracking-widest uppercase font-serif border-b border-slate-800 pb-2">
              CATEGORIES
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400 font-medium">
              {categories.map((cat) => (
                <li key={cat}>
                  <a
                    href="#collection"
                    onClick={() => onSelectCategory?.(cat)}
                    className="hover:text-brand-pink transition-colors block py-0.5"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Follow Us & Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-widest uppercase font-serif mb-3">
                FOLLOW US
              </h4>
              
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nepal Fashion KTM Facebook"
                  className="w-9 h-9 rounded-full bg-[#D81B60] hover:bg-[#C2185B] text-white flex items-center justify-center shadow-md transform hover:scale-110 transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nepal Fashion KTM Instagram"
                  className="w-9 h-9 rounded-full bg-[#D81B60] hover:bg-[#C2185B] text-white flex items-center justify-center shadow-md transform hover:scale-110 transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nepal Fashion KTM TikTok"
                  className="w-9 h-9 rounded-full bg-[#D81B60] hover:bg-[#C2185B] text-white flex items-center justify-center shadow-md transform hover:scale-110 transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <h5 className="text-xs font-bold text-white tracking-widest uppercase font-serif mb-2">
                SUBSCRIBE TO OUR NEWSLETTER
              </h5>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-white text-slate-800 px-3.5 py-2 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink flex-grow placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="bg-[#D81B60] hover:bg-[#C2185B] text-white px-5 py-2 rounded-md font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-md flex-shrink-0"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 Nepal Fashion KTM. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>Designed with</span>
            <span className="text-[#D81B60] text-sm">♡</span>
            <span>for our lovely customers.</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
