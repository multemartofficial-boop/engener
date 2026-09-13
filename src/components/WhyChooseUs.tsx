import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  Users, 
  Layers, 
  Wrench, 
  Compass,
  ArrowRight
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Single-Source Accountability',
      desc: 'No finger-pointing between independent architects, structural engineers, and third-party erectors. Smart Engineering manages design, civil, steel fabrication, and crane erection under one unified contract.',
      icon: Layers
    },
    {
      title: 'Strict BNBC 2020 Compliance',
      desc: 'Every joint, anchor bolt, and rafter is calculated to withstand Bangladesh seismic accelerations and 160-220 km/h coastal cyclonic wind loads using ETABS and STAAD.Pro models.',
      icon: ShieldCheck
    },
    {
      title: 'Up to 40% Faster Handover',
      desc: 'Parallel execution: While foundation civil works and column stub pedestals are cured on site, steel columns, trusses, and purlins are fabricated in-house for swift bolt-together assembly.',
      icon: Clock
    },
    {
      title: 'Transparent Itemized BOQ',
      desc: 'No hidden variations or mid-project price spikes. Our mill-direct procurement connections and detailed pre-construction cost takeoffs keep your capital expenditure strictly controlled.',
      icon: TrendingUp
    }
  ];

  return (
    <section id="why-us" className="py-12 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Description */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
              <span>Why Smart Engineering BD</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-display mb-3 sm:mb-5">
              The Proven Steel-First Design-Build Advantage
            </h2>
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed mb-5 sm:mb-6">
              Unlike traditional fragmented construction where you hire separate design firms, civil contractors, and steel vendors, our integrated model guarantees seamless engineering coordination, faster commissioning, and lower total project cost.
            </p>

            <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Over 145+ Successful Industrial Structures Delivered</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Certified Submerged Arc Welding & Grade 8.8 High-Tensile Bolts</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Daily Video & Drone Progress Reporting for Remote Clients</span>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-5 py-3.5 sm:py-3 rounded-lg uppercase tracking-wider transition-colors w-full sm:w-auto text-center shadow-xs"
            >
              <span>Consult Our Structural Engineers</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right 4 Pillar Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={i} 
                  className="p-4 sm:p-6 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all shadow-xs"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center mb-3 sm:mb-4 shadow-xs">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display mb-1.5 sm:mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
