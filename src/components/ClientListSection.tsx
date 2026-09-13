import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, ArrowRight, ExternalLink } from 'lucide-react';

const bigBrands = [
  {
    id: 'bashundhara',
    name: 'BASHUNDHARA GROUP',
    subtitle: 'For the People, for the Country',
    bg: 'bg-white',
    border: 'border-slate-200',
    logoText: 'BASHUNDHARA',
    subText: 'GROUP',
    color: 'text-[#1e3a8a]',
    symbol: 'B'
  },
  {
    id: 'brac',
    name: 'BRAC Enterprise',
    subtitle: 'Social Development & Industry',
    bg: 'bg-white',
    border: 'border-slate-200',
    logoText: 'brac',
    color: 'text-[#e52424]',
    symbol: '●'
  },
  {
    id: 'mamun',
    name: 'MAMUN GROUP',
    subtitle: 'Industrial Conglomerate',
    bg: 'bg-white',
    border: 'border-slate-200',
    logoText: 'MAMUN GROUP',
    color: 'text-emerald-700',
    symbol: 'MG'
  },
  {
    id: 'meghna',
    name: 'MEGHNA GROUP OF INDUSTRIES',
    subtitle: 'MGI Industrial Ventures',
    bg: 'bg-white',
    border: 'border-slate-200',
    logoText: 'MEGHNA GROUP',
    subText: 'OF INDUSTRIES',
    color: 'text-blue-900',
    symbol: 'MGI'
  },
  {
    id: 'rangs',
    name: 'RANGS GROUP',
    subtitle: 'A Legacy of Excellence',
    bg: 'bg-white',
    border: 'border-slate-200',
    logoText: 'RANGS',
    subText: 'GROUP',
    color: 'text-[#e52424]',
    symbol: 'R'
  }
];

export const ClientListSection: React.FC = () => {
  const { setIsCustomersOpen } = useApp();

  return (
    <section id="customers" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#e52424] tracking-tight mb-2">
            Client List
          </h2>
          <p className="text-sm sm:text-base text-slate-700 font-semibold">
            We working 20+ Big Brand Such As Brac, Rangs, Bashundhara etc
          </p>
        </div>

        {/* Big Brands 5-Column Grid (matching reference image 1) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-12">
          {bigBrands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => setIsCustomersOpen(true)}
              className="bg-white rounded-lg border border-slate-200 p-6 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-lg hover:border-[#e52424]/50 transition-all duration-300 min-h-[140px] cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-black text-sm text-slate-800 mb-3 group-hover:bg-red-50 group-hover:text-[#e52424] transition-colors border border-slate-200">
                {brand.symbol}
              </div>
              <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 tracking-tight uppercase group-hover:text-[#e52424] transition-colors leading-tight">
                {brand.name}
              </h3>
              <p className="text-[10px] text-slate-500 mt-1 font-medium line-clamp-1">
                {brand.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* View Full 50+ Client Directory Button */}
        <div className="text-center mb-16 sm:mb-20">
          <button
            onClick={() => setIsCustomersOpen(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-2.5 rounded-md shadow-xs transition-all"
          >
            <span>View All 50+ Corporate Clients</span>
            <ExternalLink className="w-4 h-4 text-[#e52424]" />
          </button>
        </div>

        {/* Floating Call to Action Card (as displayed in reference image 1) */}
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle decorative red border on left */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#e52424]" />

          {/* Left Text */}
          <div className="text-center md:text-left pl-2">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#e52424] tracking-tight mb-1.5">
              Would You Like to Start a Project With Us?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              We are available 24/7 with you
            </p>
          </div>

          {/* Right Call Button */}
          <div className="shrink-0">
            <a
              href="tel:+8801679242424"
              className="bg-[#e52424] hover:bg-[#c91818] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +880 1679242424</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
