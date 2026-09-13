import React from 'react';
import { useApp } from '../context/AppContext';
import { servicePhaseDetails } from '../data/companyInfo';
import { ArrowRight } from 'lucide-react';

interface ServiceCardData {
  id: 'pre-construction' | 'construction' | 'post-construction';
  title: string;
  imageUrl: string;
}

const serviceCards: ServiceCardData[] = [
  {
    id: 'pre-construction',
    title: 'Pre-Construction',
    // Construction engineer in yellow hardhat with tablet and crane in background
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'construction',
    title: 'Construction',
    // Blue structural steel warehouse frame
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'post-construction',
    title: 'Post-Construction',
    // Hardhat, tablet and blueprints on desk
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80'
  }
];

export const ServicesSection: React.FC = () => {
  const { setActiveServiceDetail } = useApp();

  const handleOpenDetail = (phaseId: 'pre-construction' | 'construction' | 'post-construction') => {
    const detail = servicePhaseDetails[phaseId];
    if (detail) {
      setActiveServiceDetail({
        title: detail.title,
        subtitle: detail.subtitle,
        items: detail.items
      });
    }
  };

  return (
    <section id="services" className="py-14 sm:py-20 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#e52424] tracking-tight mb-3">
            Our Services
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
            We’ve 500+ experience of various projects like garments industry, jute industry, plastic recycle industry, carpet producing industry, geo-textile industry, packaging industry, auto bricks industry, auto rice mill, rice bran oil manufacturing industry, auto feed mill, poultry hatchery, fish hatchery, poultry farm, dairy farm, fish farm etc
          </p>
        </div>

        {/* 3 Service Phase Cards (as shown in reference image 1) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {serviceCards.map((card) => (
            <div 
              key={card.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Card Image */}
              <div className="h-56 sm:h-64 w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col items-center text-center flex-1 justify-between">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
                  {card.title}
                </h3>

                {/* Green "Click here" Button (as in reference image 1) */}
                <button
                  onClick={() => handleOpenDetail(card.id)}
                  className="bg-[#2ca64e] hover:bg-[#238c41] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-2.5 rounded shadow-sm hover:shadow transition-all inline-flex items-center gap-1.5"
                >
                  <span>Click here</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
