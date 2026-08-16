import React from 'react';
import { OrnateDivider } from './Icons';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { storeInfo } from '../data/products';

export const VisitStore = () => {
  const contactCards = [
    {
      id: 'location',
      title: 'Kathmandu,',
      subtitle: 'Nepal',
      icon: <MapPin className="w-5 h-5 text-white" />,
      bg: 'bg-[#D81B60]',
      link: 'https://maps.google.com/?q=Kathmandu+Nepal',
      isExternal: true,
    },
    {
      id: 'phone',
      title: storeInfo.phone,
      subtitle: 'Call Us',
      icon: <Phone className="w-5 h-5 text-white fill-current" />,
      bg: 'bg-[#D81B60]',
      link: `tel:${storeInfo.phone}`,
      isExternal: false,
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      subtitle: 'Available',
      icon: <MessageCircle className="w-5 h-5 text-white fill-current" />,
      bg: 'bg-[#25D366]',
      link: `https://wa.me/9779808997824?text=Hello%20Nepal%20Fashion%20KTM,%20I%20am%20interested%20in%20your%20collection!`,
      isExternal: true,
    },
    {
      id: 'email',
      title: storeInfo.email,
      subtitle: 'Email Us',
      icon: <Mail className="w-5 h-5 text-white" />,
      bg: 'bg-[#D81B60]',
      link: `mailto:${storeInfo.email}`,
      isExternal: false,
    },
  ];

  return (
    <section id="contact" className="py-10 sm:py-12 bg-[#FCF9F6] border-b border-[#F3E5D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-8">
          <OrnateDivider>
            <h2 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold tracking-wider uppercase">
              <span className="text-[#0B192C]">VISIT OUR </span>
              <span className="text-[#D81B60]">STORE</span>
            </h2>
          </OrnateDivider>
        </div>

        {/* 4 Contact Pill Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {contactCards.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target={item.isExternal ? '_blank' : '_self'}
              rel={item.isExternal ? 'noopener noreferrer' : ''}
              className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#EFE2D3] hover:border-[#D81B60] shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              {/* Circular Icon */}
              <div
                className={`w-11 h-11 rounded-full ${item.bg} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform`}
              >
                {item.icon}
              </div>

              {/* Text Info */}
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-[13px] font-bold text-[#0B192C] group-hover:text-[#D81B60] transition-colors truncate">
                  {item.title}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {item.subtitle}
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
