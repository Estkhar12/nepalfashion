import React from 'react';
import promoModelImg from '../assets/promo-model.jpg';
import cherryBlossomImg from '../assets/cherry-blossom.jpg';
import { ArrowRight } from 'lucide-react';

export const PromoBanner = ({ onShopNow }) => {
  return (
    <section className="py-6 sm:py-10 bg-[#FFFDFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-[#6A0C38] via-[#B81655] to-[#8C0C43] text-white">
          
          {/* Subtle Background Floral & Glow Overlays */}
          <div className="absolute -left-10 -top-10 w-64 h-64 opacity-25 mix-blend-screen pointer-events-none">
            <img src={cherryBlossomImg} alt="Cherry Blossoms" className="w-full h-full object-contain filter invert" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[220px] sm:min-h-[260px] relative z-10">
            
            {/* Left Column: Cursive Title & Floral Accent */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:pl-10 flex flex-col justify-center">
              <div className="space-y-1">
                <span className="font-script text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight text-[#FFE4EC] drop-shadow-sm block">
                  Fashion That
                </span>
                <span className="font-serif italic font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-tight text-white block -mt-1">
                  Speaks <span className="font-script not-italic text-pink-200">You ♡</span>
                </span>
              </div>
            </div>

            {/* Middle Column: Text & Shop Now Button */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-center items-start space-y-4">
              <p className="text-pink-100 text-sm sm:text-base font-normal max-w-sm leading-relaxed">
                Get the newest ladies' fashion collection with exclusive seasonal discounts.
              </p>
              
              <a
                href="#collection"
                onClick={onShopNow}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/40 bg-black/20 hover:bg-white hover:text-[#880E4F] text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-md backdrop-blur-sm group"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right Column: Model Cutout Image */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end items-end h-full relative overflow-hidden self-end pt-4 lg:pt-0">
              <div className="w-56 sm:w-64 lg:w-full max-h-[280px] lg:max-h-[300px] flex items-end justify-center">
                <img
                  src={promoModelImg}
                  alt="Nepal Fashion KTM Collection Model"
                  className="object-cover object-top h-full w-full max-w-[240px] drop-shadow-2xl rounded-t-full lg:rounded-none"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
