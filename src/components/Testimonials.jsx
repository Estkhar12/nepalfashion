import React from 'react';
import { OrnateDivider, PagodaTemple } from './Icons';
import { customerReviews } from '../data/products';
import { Star } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section id="about" className="py-14 sm:py-16 bg-[#FAF6F0] relative overflow-hidden">
      
      {/* Background Pagoda Watermark (Right side) */}
      <div className="absolute -right-10 bottom-0 text-[#D4AF37]/20 pointer-events-none select-none z-0">
        <PagodaTemple className="w-56 h-72 sm:w-72 sm:h-96 lg:w-96 lg:h-[450px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <OrnateDivider>
            <h2 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold tracking-wider uppercase">
              <span className="text-[#0B192C]">WHAT OUR </span>
              <span className="text-[#D81B60]">CUSTOMERS SAY</span>
            </h2>
          </OrnateDivider>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {customerReviews.map((review) => (
            <div
              key={review.id}
              className="relative bg-gradient-to-b from-[#FFF5F7] to-[#FFFFFF] border border-[#F8D7DA] rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Quote Mark & 5 Stars */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl sm:text-4xl text-[#F48FB1] leading-none select-none">
                  ❝
                </span>
                
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#E91E63]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E91E63] text-[#E91E63]" />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-slate-700 text-sm sm:text-base font-medium text-center italic leading-relaxed my-2">
                "{review.quote}"
              </p>

              {/* Bottom Quote Mark & Customer Name */}
              <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-[#0B192C] tracking-wide">
                  — {review.author}
                </span>
                <span className="font-serif text-3xl sm:text-4xl text-[#F48FB1] leading-none select-none">
                  ❞
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
