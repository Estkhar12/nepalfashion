import React from 'react';
import heroModelImg from '../assets/hero-model.jpg';
import cherryBlossomImg from '../assets/cherry-blossom.jpg';
import { 
  PagodaTemple, 
  DiamondIcon, 
  DressSilhouetteIcon, 
  PriceTagIcon, 
  WomanSilhouetteIcon 
} from './Icons';
import { ShoppingBag, PhoneCall } from 'lucide-react';
import { storeInfo } from '../data/products';

export const Hero = ({ onShopClick, onContactClick }) => {
  const heroFeatures = [
    {
      id: 'quality',
      title: 'PREMIUM QUALITY',
      icon: <DiamondIcon className="w-5 h-5 text-white" />,
      bg: 'bg-[#D81B60]',
    },
    {
      id: 'trends',
      title: 'LATEST TRENDS',
      icon: <DressSilhouetteIcon className="w-5 h-5 text-white" />,
      bg: 'bg-[#0B192C]',
    },
    {
      id: 'price',
      title: 'AFFORDABLE PRICE',
      icon: <PriceTagIcon className="w-5 h-5 text-white" />,
      bg: 'bg-[#D81B60]',
    },
    {
      id: 'for-all',
      title: 'FASHION FOR EVERY WOMAN',
      icon: <WomanSilhouetteIcon className="w-5 h-5 text-white" />,
      bg: 'bg-[#0B192C]',
    },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#FCF9F6] via-[#FAF3EC] to-[#FCF9F6] pt-4 pb-12 sm:pt-8 sm:pb-16 lg:py-16">
      {/* Background Pagoda Watermark (Left side) */}
      <div className="absolute -left-12 top-10 lg:top-4 text-[#D4AF37]/25 pointer-events-none select-none z-0 transform -rotate-2">
        <PagodaTemple className="w-64 h-80 sm:w-80 sm:h-96 lg:w-[420px] lg:h-[500px]" />
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Headline, Copy, Action Buttons, and 4 Badges */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center text-left space-y-6 sm:space-y-7">
            
            {/* Main Headline */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="font-serif tracking-tight">
                <span className="block text-[#D81B60] font-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-tight">
                  Kathmandu's Premium Ladies'
                </span>
                <span className="block text-[#0B192C] font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[46px] leading-tight mt-1">
                  Fashion Destination
                </span>
              </h1>
            </div>

            {/* Subtitle Description */}
            <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed font-sans">
              Discover trendy kurtis, sarees, western wear, handbags, accessories, and exclusive fashion collections designed for every occasion.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1">
              {/* Primary Shop Collection Button */}
              <a
                href="#collection"
                onClick={onShopClick}
                className="inline-flex items-center gap-2.5 bg-[#D81B60] hover:bg-[#C2185B] text-white px-7 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase shadow-lg shadow-pink-600/20 hover:shadow-xl hover:shadow-pink-600/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>SHOP COLLECTION</span>
              </a>

              {/* Secondary Contact Us Button */}
              <a
                href="#contact"
                onClick={onContactClick}
                className="inline-flex items-center gap-2.5 bg-[#0B192C] hover:bg-[#1E293B] text-white px-7 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>CONTACT US</span>
              </a>
            </div>

            {/* 4 Feature Badges Row */}
            <div className="pt-6 sm:pt-8 border-t border-[#EFE2D3]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-3 text-center">
                {heroFeatures.map((feat) => (
                  <div key={feat.id} className="flex flex-col items-center group">
                    <div
                      className={`w-12 h-12 rounded-full ${feat.bg} flex items-center justify-center shadow-md mb-2 group-hover:scale-110 transition-transform duration-200`}
                    >
                      {feat.icon}
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-[#0B192C] tracking-tight uppercase max-w-[120px] leading-snug">
                      {feat.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Arch Portal with Model and Cherry Blossoms */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end relative mt-6 lg:mt-0">
            <div className="relative w-72 sm:w-88 md:w-96 lg:w-[420px] xl:w-[450px] aspect-square">
              
              {/* Outer Golden & Pink Glowing Ring Portal */}
              <div className="absolute inset-0 rounded-full p-2.5 bg-gradient-to-tr from-[#D81B60] via-[#F48FB1] to-[#D4AF37] shadow-2xl shadow-pink-500/25 animate-pulse-subtle">
                <div className="w-full h-full rounded-full p-1 bg-white">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    {/* Model Photograph */}
                    <img
                      src={heroModelImg}
                      alt="Nepali Fashion Model in Kathmandu - Nepal Fashion KTM"
                      className="w-full h-full object-cover object-top scale-105 hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>
              </div>

              {/* Cherry Blossom Embellishment along the top-right / rim */}
              <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-36 sm:w-44 h-36 sm:h-44 pointer-events-none select-none z-20 mix-blend-multiply opacity-90 animate-float">
                <img
                  src={cherryBlossomImg}
                  alt="Cherry Blossoms Decoration"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>

              {/* Floating "FASHION FOR EVERY you ♡" Badge */}
              <div className="absolute -bottom-2 right-2 sm:bottom-4 sm:-right-4 z-20">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#880E4F] border-2 border-white/80 text-white flex flex-col items-center justify-center p-2 text-center shadow-xl shadow-pink-900/30 transform hover:scale-105 transition-all">
                  <span className="text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase text-white/90">
                    FASHION
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-semibold tracking-wider uppercase text-pink-200">
                    FOR EVERY
                  </span>
                  <span className="font-script text-xl sm:text-2xl text-pink-100 -mt-1 transform -rotate-6">
                    you <span className="text-white text-xs">♡</span>
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
