import React from 'react';
import { useApp } from '../context/AppContext';
import { aboutSmartEngineeringData } from '../data/companyInfo';
import { SafeImage } from '../components/SafeImage';
import { 
  Building2, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight, 
  Compass, 
  Clock, 
  Cpu, 
  Layers, 
  Sparkles, 
  Phone, 
  FileCheck 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo, siteContent } = useApp();

  const aboutData = siteContent?.about || {
    title: 'About Smart Engineering (SE)',
    subtitle: 'Design-based industrial construction management and structural steel building engineering in Bangladesh.',
    story: aboutSmartEngineeringData.fullContent,
    mission: 'To deliver world-class pre-engineered steel buildings, turnkey industrial facilities, and engineering consultancy with unmatched precision and speed.',
    vision: 'To be the premier structural steel and construction management partner driving industrial growth across Bangladesh and South Asia.',
    stats: [
      { label: 'Corporate Clients', value: '50+' },
      { label: 'Repeat Partners', value: '42+' },
      { label: 'Completed Works', value: '500+' },
      { label: 'Years of Heritage', value: '18+' }
    ]
  };

  const storyParagraphs = Array.isArray(aboutData.story) 
    ? aboutData.story 
    : [aboutData.story || 'Smart Engineering (SE) is a design-based construction management company focusing on industrial and commercial sectors in Bangladesh.'];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      
      {/* 1. HERO HEADER */}
      <div className="bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-4">
            <button 
              onClick={() => navigateTo('home')} 
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">About Us</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#e52424]/20 border border-[#e52424]/40 text-[#e52424] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Established in 2007</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {aboutData.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              {aboutData.subtitle}
            </p>
          </div>

        </div>
      </div>

      {/* 2. CORPORATE SUMMARY & KEY METRICS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-md space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#e52424]">
                Who We Are
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                One-Stop Industrial Construction Consultancy & Turnkey Steel Execution
              </h2>
              
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed text-justify">
                {storyParagraphs.map((paragraph, idx) => (
                  <p key={idx}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              {/* Photo Showcase */}
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md h-64 bg-slate-100">
                <SafeImage
                  src="/images/smart_steel_hero_1789123504292.jpg"
                  alt="Industrial Plant Construction"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">
                    50<span className="text-[#e52424]">+</span>
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    Corporate Clients
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">
                    42<span className="text-emerald-600">+</span>
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    Repeat Partners
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">
                    500<span className="text-[#e52424]">+</span>
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    Completed Works
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">
                    18<span className="text-slate-800">+</span>
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    Years of Heritage
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 3. 8 CORE ENGINEERING PILLARS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#e52424]">
              Our Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              8 Core Pillars of Industrial Construction Management
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Every Smart Engineering project adheres strictly to these eight engineering disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aboutSmartEngineeringData.keyPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:shadow-md hover:border-[#e52424] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#e52424] text-slate-800 group-hover:text-white flex items-center justify-center font-mono font-bold text-xs transition-colors">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#e52424] transition-colors leading-snug">
                    {pillar}
                  </h4>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Verified Standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. CODE COMPLIANCE & SOFTWARE STACK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Engineering Codes */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e52424]">
              <ShieldCheck className="w-4 h-4" />
              <span>International & National Codes</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Structural Safety & Regulatory Compliance
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every steel calculation, rafter sizing, weld joint, and concrete footing is checked against rigorous standards to guarantee 50+ year structural lifespans.
            </p>

            <ul className="space-y-2 pt-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>BNBC 2020:</strong> Bangladesh National Building Code (Seismic & Wind 220 km/h)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>AISC 360-16:</strong> American Institute of Steel Construction Specifications</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>AWS D1.1:</strong> American Welding Society Structural Welding Code</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>ACI 318:</strong> American Concrete Institute Building Code for Reinforced Concrete</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>MBMA 2010:</strong> Metal Building Manufacturers Association Technical Manual</span>
              </li>
            </ul>
          </div>

          {/* Software & Tech Fleet */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e52424]">
              <Cpu className="w-4 h-4" />
              <span>Technology & Tools</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Advanced Engineering Software Suite
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We eliminate guesswork with millimeter-accurate 3D BIM models, finite element structural calculations, and drone site surveys.
            </p>

            <ul className="space-y-2 pt-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Tekla Structures:</strong> 3D Steel Fabrication, CNC Nesting & Connection Detailing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>CSI ETABS & STAAD.Pro:</strong> Non-Linear Dynamic Seismic & 3D Wind Analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>AutoCAD Civil 3D & Revit:</strong> Multi-Disciplinary BIM Coordination</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Total Station & Drone GPS:</strong> Electronic Land Survey & Topography Mapping</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Ultrasonic Flaw Detectors:</strong> Non-Destructive Weld Testing (UT) & Bolt Calibration</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 5. BOTTOM CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight">
              Ready to Discuss Your Project with Our Engineering Board?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Visit our Elephant Road headquarters in Dhaka or schedule an on-site feasibility evaluation with our Chief Structural Engineer.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('contact')}
              className="bg-[#e52424] hover:bg-[#c91818] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              <span>Contact Head Office</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
