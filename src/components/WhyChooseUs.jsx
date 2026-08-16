import React from 'react';
import { 
  OrnateDivider, 
  DiamondIcon, 
  DressSilhouetteIcon, 
  PriceTagIcon, 
  HeadsetIcon, 
  WardrobeHangerIcon, 
  RosetteCheckIcon 
} from './Icons';

export const WhyChooseUs = () => {
  const reasons = [
    {
      id: 1,
      title: 'PREMIUM QUALITY FABRICS',
      icon: <DiamondIcon className="w-6 h-6 text-white" />,
      bg: 'bg-[#D81B60]',
    },
    {
      id: 2,
      title: 'LATEST FASHION TRENDS',
      icon: <DressSilhouetteIcon className="w-6 h-6 text-white" />,
      bg: 'bg-[#0B192C]',
    },
    {
      id: 3,
      title: 'AFFORDABLE PRICES',
      icon: <PriceTagIcon className="w-6 h-6 text-white" />,
      bg: 'bg-[#D81B60]',
    },
    {
      id: 4,
      title: 'FRIENDLY CUSTOMER SERVICE',
      icon: <HeadsetIcon className="w-6 h-6 text-white" />,
      bg: 'bg-[#0B192C]',
    },
    {
      id: 5,
      title: 'WIDE PRODUCT RANGE',
      icon: <WardrobeHangerIcon className="w-6 h-6 text-white" />,
      bg: 'bg-[#D81B60]',
    },
    {
      id: 6,
      title: "KATHMANDU'S TRUSTED FASHION STORE",
      icon: <RosetteCheckIcon className="w-6 h-6 text-white" />,
      bg: 'bg-[#0B192C]',
    },
  ];

  return (
    <section id="why-us" className="py-12 sm:py-14 bg-[#FCF9F6] border-y border-[#F3E5D8]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-10">
          <OrnateDivider>
            <h2 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold tracking-wider uppercase">
              <span className="text-[#0B192C]">WHY CHOOSE </span>
              <span className="text-[#D81B60]">NEPAL FASHION KTM?</span>
            </h2>
          </OrnateDivider>
        </div>

        {/* 6 Feature Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-4 text-center">
          {reasons.map((item, idx) => (
            <div
              key={item.id}
              className="flex flex-col items-center group relative px-2"
            >
              {/* Circular Icon Container */}
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${item.bg} flex items-center justify-center shadow-lg shadow-black/5 mb-3.5 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300`}
              >
                {item.icon}
              </div>

              {/* Title Text */}
              <h3 className="text-xs sm:text-[13px] font-extrabold text-[#0B192C] group-hover:text-[#D81B60] tracking-tight uppercase leading-snug max-w-[130px] transition-colors">
                {item.title}
              </h3>

              {/* Subtle divider on desktop between items except the last */}
              {idx < reasons.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-6 w-[1px] h-10 bg-[#E8D5C4]/70"></div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
