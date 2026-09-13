import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SafeImage } from '../components/SafeImage';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  MapPin, 
  Phone, 
  Layers, 
  Compass, 
  HardHat, 
  FileText,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    title: 'Precision Industrial Steel Construction Management',
    subtitle: 'Leading turnkey design-build contractor for pre-engineered steel buildings (PEB), heavy manufacturing plants, and logistics infrastructure across Bangladesh since 2007.',
    imageUrl: '/images/smart_steel_hero_1789123504292.jpg',
    tag: 'Industrial Engineering & PEB'
  },
  {
    id: 2,
    title: 'Structural, Architectural, Electrical & Plumbing Solutions',
    subtitle: 'From digital land surveying and geotechnical soil investigation to BNBC 2020 compliant structural analysis and precision crane erection.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80',
    tag: 'One-Stop Turnkey Capability'
  },
  {
    id: 3,
    title: '500+ Completed Projects Across Bangladesh',
    subtitle: 'Trusted by industry leaders including Bashundhara Group, BRAC, Rangs Group, Meghna Group of Industries, and Mamun Group.',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1920&q=80',
    tag: 'Proven Track Record'
  }
];

const bigBrands = [
  { name: 'BASHUNDHARA GROUP', tag: 'Conglomerate', code: 'BG' },
  { name: 'BRAC ENTERPRISE', tag: 'Development & Industry', code: 'BRAC' },
  { name: 'MAMUN GROUP', tag: 'Industrial Group', code: 'MG' },
  { name: 'MEGHNA GROUP OF IND.', tag: 'Heavy Manufacturing', code: 'MGI' },
  { name: 'RANGS GROUP', tag: 'Diversified Industry', code: 'RG' }
];

export const HomePage: React.FC = () => {
  const { navigateTo, projects } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const featured = projects.slice(0, 3);

  return (
    <div className="bg-white text-slate-900">
      
      {/* 1. HERO SLIDER */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[660px] bg-slate-950 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <SafeImage
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover object-center scale-105 animate-subtleZoom"
            />
            {/* Elegant Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/40 sm:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
          </div>
        ))}

        {/* Hero Content Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-3xl space-y-3 sm:space-y-5">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#e52424] animate-pulse" />
              <span>{heroSlides[currentSlide].tag}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18] sm:leading-[1.15]">
              {heroSlides[currentSlide].title}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal line-clamp-3 sm:line-clamp-none">
              {heroSlides[currentSlide].subtitle}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => navigateTo('services')}
                className="w-full sm:w-auto justify-center bg-[#e52424] hover:bg-[#c91818] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-md font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-red-600/30 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('contact')}
                className="w-full sm:w-auto justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 sm:px-7 py-3 sm:py-3.5 rounded-md font-bold text-xs sm:text-sm uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Request Consultation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-20 flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
            aria-label="Previous Slide"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          {/* Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-1 sm:px-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentSlide ? 'w-6 sm:w-8 bg-[#e52424]' : 'w-1.5 sm:w-2 bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide(prev => (prev + 1) % heroSlides.length)}
            aria-label="Next Slide"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </section>

      {/* 2. CREDIBILITY METRICS BAR */}
      <section className="bg-slate-900 border-y border-slate-800 text-white py-5 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:divide-x lg:divide-slate-800">
            <div className="bg-slate-800/60 lg:bg-transparent p-3.5 sm:p-4 lg:p-0 rounded-xl lg:rounded-none border border-slate-700/50 lg:border-0 flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                500<span className="text-[#e52424]">+</span>
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold mt-0.5 sm:mt-1">
                Completed Projects
              </span>
            </div>

            <div className="bg-slate-800/60 lg:bg-transparent p-3.5 sm:p-4 lg:p-0 rounded-xl lg:rounded-none border border-slate-700/50 lg:border-0 flex flex-col items-center sm:items-start text-center sm:text-left lg:pl-8">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                18<span className="text-[#e52424]">+</span>
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold mt-0.5 sm:mt-1">
                Years of Heritage
              </span>
            </div>

            <div className="bg-slate-800/60 lg:bg-transparent p-3.5 sm:p-4 lg:p-0 rounded-xl lg:rounded-none border border-slate-700/50 lg:border-0 flex flex-col items-center sm:items-start text-center sm:text-left lg:pl-8">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                50<span className="text-[#e52424]">+</span>
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold mt-0.5 sm:mt-1">
                Industrial Clients
              </span>
            </div>

            <div className="bg-slate-800/60 lg:bg-transparent p-3.5 sm:p-4 lg:p-0 rounded-xl lg:rounded-none border border-slate-700/50 lg:border-0 flex flex-col items-center sm:items-start text-center sm:text-left lg:pl-8">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                100<span className="text-emerald-400">%</span>
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold mt-0.5 sm:mt-1">
                BNBC 2020 Compliant
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE ENGINEERING SERVICES OVERVIEW */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e52424] mb-2">
                <span>Total Engineering Solutions</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Three Phases of Excellence
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-2">
                We bring 500+ project experience covering garment factories, jute mills, auto rice mills, packaging hubs, cold storage sheds, and heavy steel plants.
              </p>
            </div>

            <button
              onClick={() => navigateTo('services')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#e52424] hover:text-[#c91818] uppercase tracking-wider group shrink-0"
            >
              <span>View All Detailed Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1: Pre-Construction */}
            <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="h-52 overflow-hidden relative">
                <SafeImage
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
                  alt="Pre-Construction Services"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono uppercase px-2.5 py-1 rounded">
                  Phase 01
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#e52424] transition-colors mb-2">
                    Pre-Construction Work
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    Concept design, digital total station land surveying, geotechnical soil investigation, 3D architectural/MEP modeling, and itemized BOQ estimation.
                  </p>
                  
                  <ul className="space-y-2 mb-6 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Digital Land Survey & Borehole Soil Test</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Civil, Structural & MEP Engineering</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>RAJUK & Fire Regulatory Approvals</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => navigateTo('services', 'pre-construction')}
                  className="w-full bg-slate-900 hover:bg-[#e52424] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                >
                  <span>Explore 10 Phases</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Construction */}
            <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="h-52 overflow-hidden relative">
                <SafeImage
                  src="/images/smart_steel_frame_1789123531862.jpg"
                  alt="Construction & Monitoring"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono uppercase px-2.5 py-1 rounded">
                  Phase 02
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#e52424] transition-colors mb-2">
                    Construction & Monitoring
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    Structural steel fabrication, mobile crane erection, QA/QC ultrasonic weld inspections, HSE site safety, and transparent cost oversight.
                  </p>

                  <ul className="space-y-2 mb-6 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Heavy Steel Superstructure Erection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Ultrasonic Weld QA/QC & Torque Checks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Daily Safety & Progress Monitoring</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => navigateTo('services', 'construction')}
                  className="w-full bg-slate-900 hover:bg-[#e52424] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                >
                  <span>Explore Construction</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Post-Construction */}
            <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="h-52 overflow-hidden relative">
                <SafeImage
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80"
                  alt="Post-Construction Handover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono uppercase px-2.5 py-1 rounded">
                  Phase 03
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#e52424] transition-colors mb-2">
                    Post-Construction Handover
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    Formal facility handover, as-built CAD/BIM models, structural integrity certification, client facility training, and ongoing maintenance.
                  </p>

                  <ul className="space-y-2 mb-6 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Complete As-Built Documentation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Facility Team Safety Commissioning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Lifetime Warranty & Maintenance Support</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => navigateTo('services', 'post-construction')}
                  className="w-full bg-slate-900 hover:bg-[#e52424] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                >
                  <span>Explore Handover</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. ABOUT SMART ENGINEERING SPOTLIGHT */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e52424]">
                <Sparkles className="w-4 h-4" />
                <span>Established in 2007</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Design-Based Industrial Construction Management in Bangladesh
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Smart Engineering (SE) is a design-based construction management company focusing on the industrial and commercial sector in Bangladesh. We bring together multidisciplinary engineering wings coordinating architectural, structural, electrical, plumbing, and landscaping disciplines for production-efficient facility realization.
              </p>

              {/* Stats Box */}
              <div className="grid grid-cols-2 gap-6 pt-2 pb-2">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <div className="text-3xl sm:text-4xl font-black text-slate-900">
                    50<span className="text-[#e52424]">+</span>
                  </div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">
                    Total Corporate Clients
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <div className="text-3xl sm:text-4xl font-black text-slate-900">
                    42<span className="text-emerald-600">+</span>
                  </div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">
                    Repeat Happy Clients
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => navigateTo('about')}
                  className="bg-[#e52424] hover:bg-[#c91818] text-white px-7 py-3.5 rounded-md font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span>Read Corporate Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('md-message')}
                  className="text-slate-700 hover:text-[#e52424] font-bold text-xs sm:text-sm uppercase tracking-wider px-4 py-3.5 inline-flex items-center gap-1.5"
                >
                  <span>MD's Message</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                <SafeImage
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80"
                  alt="Engineers reviewing blueprints"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                      Engineering Rigor
                    </p>
                    <p className="text-sm sm:text-base font-bold mt-1">
                      Full BNBC 2020 & International AISC Standard Verification
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FEATURED INDUSTRIAL PROJECTS PREVIEW */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e52424] mb-2">
                <span>Proven Execution</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Completed Engineering Projects
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-2">
                Specialized in heavy steel framing, clear-span superstructures, crane runways, and turn-key factories.
              </p>
            </div>

            <button
              onClick={() => navigateTo('projects')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#e52424] hover:text-[#c91818] uppercase tracking-wider group shrink-0"
            >
              <span>View Full Project Portfolio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featured.map((proj) => (
              <div
                key={proj.id}
                onClick={() => navigateTo('projects')}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              >
                <div className="h-56 overflow-hidden relative bg-slate-100">
                  <SafeImage
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded uppercase">
                    {proj.categoryLabel}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#e52424] transition-colors line-clamp-1 mb-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#e52424] mb-3">
                      {proj.client}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 truncate max-w-[170px]">
                      <MapPin className="w-3.5 h-3.5 text-[#e52424] shrink-0" />
                      <span className="truncate">{proj.location}</span>
                    </span>
                    <span className="font-bold text-slate-800">
                      {proj.coveredArea}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CORPORATE CLIENTS SPOTLIGHT */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Trusted by 50+ Premier Industrial Brands
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Collaborating with Bangladesh’s leading conglomerates and multinationals
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 mb-8 sm:mb-10">
            {bigBrands.map((brand, idx) => (
              <div
                key={idx}
                onClick={() => navigateTo('customers')}
                className={`p-4 sm:p-5 bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#e52424] rounded-xl flex flex-col items-center justify-center text-center transition-all cursor-pointer group shadow-2xs hover:shadow-md ${
                  idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-slate-200 group-hover:bg-red-50 text-slate-800 group-hover:text-[#e52424] flex items-center justify-center font-bold text-xs mb-2 transition-colors">
                  {brand.code}
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#e52424] transition-colors leading-tight">
                  {brand.name}
                </h4>
                <span className="text-[10px] text-slate-400 mt-1">
                  {brand.tag}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigateTo('customers')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs uppercase font-bold tracking-wider px-6 py-3 rounded-md transition-colors cursor-pointer"
          >
            <span>Explore All 50+ Clients & Locations</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#e52424]" />
          </button>

        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION */}
      <section className="bg-slate-950 text-white py-12 sm:py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e52424]/20 border border-[#e52424]/40 text-[#e52424] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span>Ready for Construction?</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Would You Like to Start a Project With Us?
          </h2>

          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Our principal structural engineers and cost estimating specialists are available 24/7 for technical consultation and itemized feasibility budgeting.
          </p>

          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <a
              href="tel:+8801679242424"
              className="w-full sm:w-auto justify-center bg-[#e52424] hover:bg-[#c91818] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-red-600/30 inline-flex items-center gap-2.5 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +880 1679242424</span>
            </a>

            <button
              onClick={() => navigateTo('contact')}
              className="w-full sm:w-auto justify-center bg-white hover:bg-slate-100 text-slate-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Submit Project Inquiry</span>
              <ArrowRight className="w-4 h-4 text-[#e52424]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
