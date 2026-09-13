import React from 'react';
import { useApp } from '../context/AppContext';
import { mdMessageData } from '../data/companyInfo';
import { SafeImage } from '../components/SafeImage';
import { 
  Award, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  Building2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Compass,
  Briefcase
} from 'lucide-react';

export const MDMessagePage: React.FC = () => {
  const { navigateTo, siteContent } = useApp();

  const mdData = siteContent?.mdMessage || {
    title: 'Message from the Managing Director',
    subtitle: 'Strategic perspective on modern construction management, industrial compliance, and sustainable steel structures in Bangladesh.',
    mdName: 'Engr. Managing Director',
    mdTitle: 'Managing Director, Smart Engineering',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    quote: '"Only efficient construction management can ensure timely completion of projects while strictly maintaining quality and safety standards, which is mandatory for sustainable growth in Bangladesh’s industrial sector."',
    paragraphs: [
      'Based on 20+ years of experience, we can say that Construction management service is an essential issue in Bangladesh because of the country’s rapid urbanisation and infrastructure development.',
      'There are some primary challenges in our construction industry: the lack of skilled manpower and proper training.',
      'Another challenge is financing and cost control. Many construction projects run over budget due to poor planning.',
      'Environmental conditions have also become increasingly important in construction management in Bangladesh.',
      'In conclusion, through effective planning, modern technology, and sustainable practice, we are highly confident in providing efficient construction management services.'
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      
      {/* 1. BREADCRUMBS & PAGE HERO */}
      <div className="bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-4">
            <button 
              onClick={() => navigateTo('home')} 
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">Message of Managing Director</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#e52424]/20 border border-[#e52424]/40 text-[#e52424] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Executive Leadership</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {mdData.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              {mdData.subtitle}
            </p>
          </div>

        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Executive Bio Card (Sticky on Large Screens) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 text-center space-y-4">
              
              {/* Portrait */}
              <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-slate-100 shadow-md">
                <SafeImage
                  src={mdData.photoUrl}
                  alt={mdData.mdName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {mdData.mdName}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-[#e52424] mt-0.5">
                  {mdData.mdTitle}
                </p>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Dhaka, Bangladesh
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-left space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#e52424] shrink-0" />
                  <span><strong>20+ Years</strong> Industrial Construction</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#e52424] shrink-0" />
                  <span><strong>BNBC 2020</strong> Structural Standards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#e52424] shrink-0" />
                  <span><strong>500+ Projects</strong> Supervised</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href="tel:+8801679242424"
                  className="w-full bg-[#e52424] hover:bg-[#c91818] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Direct Hotline: +880 1679242424</span>
                </a>
              </div>

            </div>

            {/* Quick Corporate Snapshot */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-3 shadow-md">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#e52424]">
                Corporate Advisory
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Need high-level strategic alignment for your upcoming manufacturing plant or multi-story PEB warehouse? Speak directly with our executive office.
              </p>
              <button
                onClick={() => navigateTo('contact')}
                className="text-xs font-bold uppercase tracking-wider text-white hover:text-[#e52424] inline-flex items-center gap-1 pt-1 transition-colors"
              >
                <span>Request Executive Meeting</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Full Address Content */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8">
            
            {/* Introductory Quote Banner */}
            <div className="bg-slate-50 border-l-4 border-[#e52424] p-5 sm:p-6 rounded-r-xl">
              <p className="font-serif italic text-base sm:text-lg text-slate-800 leading-relaxed">
                {mdData.quote}
              </p>
              <p className="text-xs font-bold text-[#e52424] uppercase tracking-wider mt-3">
                — {mdData.mdName}, {mdData.mdTitle}
              </p>
            </div>

            {/* Complete Paragraphs */}
            <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
              {mdData.paragraphs.map((p, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-[#e52424] text-xs font-black flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span>
                      {idx === 0 && 'The Necessity of Modern Construction Management'}
                      {idx === 1 && 'Overcoming Manpower & Technical Skills Challenges'}
                      {idx === 2 && 'Financial Discipline & Real-Time Cost Oversight'}
                      {idx === 3 && 'Environmental Stewardship & Green Building Practices'}
                      {idx === 4 && 'Our Vision for Bangladesh’s Industrial Future'}
                      {idx > 4 && `Section ${idx + 1}`}
                    </span>
                  </h3>
                  <p className="text-justify text-slate-700 leading-relaxed">
                    {p}
                  </p>
                </div>
              ))}
            </div>

            {/* Signature & Seal */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-serif italic font-black text-slate-900 text-xl tracking-tight">
                  Engr. Managing Director
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Managing Director, Smart Engineering (SE)
                </div>
                <div className="text-[11px] text-slate-400">
                  Suite # 301, 65 Elephant Road, Dhaka-1205
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigateTo('projects')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors"
                >
                  View Completed Works
                </button>
                <button
                  onClick={() => navigateTo('contact')}
                  className="bg-[#e52424] hover:bg-[#c91818] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
