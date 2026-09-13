import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { setIsAboutOpen, siteContent } = useApp();

  const title = siteContent?.home?.aboutBrief?.title || 'About Us';
  const subtitle = siteContent?.home?.aboutBrief?.subtitle || 'Science 2007 Smart Engineering (SE) Is A Design-Based Construction Management Company More Focusing On Industrial And Commercial Sector In Bangladesh.';
  const stat1Value = siteContent?.home?.aboutBrief?.stats?.[0]?.value || '50+';
  const stat1Label = siteContent?.home?.aboutBrief?.stats?.[0]?.label || 'Total Clients';
  const stat2Value = siteContent?.home?.aboutBrief?.stats?.[1]?.value || '42+';
  const stat2Label = siteContent?.home?.aboutBrief?.stats?.[1]?.label || 'Happy Clients';
  const imageUrl = siteContent?.home?.aboutBrief?.imageUrl || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80';

  return (
    <section id="about" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Text & Stats */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Red Section Title */}
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#e52424] tracking-tight">
              {title}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
              {subtitle}
            </p>

            {/* Two Stat Boxes side by side */}
            <div className="grid grid-cols-2 gap-6 pt-2 pb-2">
              <div className="border-l-4 border-[#e52424] pl-4">
                <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                  {stat1Value}
                </div>
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-600 mt-1">
                  {stat1Label}
                </div>
              </div>

              <div className="border-l-4 border-emerald-500 pl-4">
                <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                  {stat2Value}
                </div>
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-600 mt-1">
                  {stat2Label}
                </div>
              </div>
            </div>

            {/* Red "LEARN MORE" Button */}
            <div className="pt-2">
              <button
                onClick={() => setIsAboutOpen(true)}
                className="bg-[#e52424] hover:bg-[#c91818] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>LEARN MORE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Two Engineers with Blueprints */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden shadow-xl border-4 border-white bg-slate-200 aspect-4/3">
              <img
                src={imageUrl}
                alt="Smart Engineering Construction Engineers Reviewing Blueprints"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
