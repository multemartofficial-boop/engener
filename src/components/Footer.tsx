import React from 'react';
import { useApp } from '../context/AppContext';
import { SmartLogo } from './SmartLogo';
import { ArrowUp, MapPin, Phone, Mail, Building2, ShieldCheck, ChevronRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white text-xs border-t border-slate-800">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Col 1: Logo & Company Description */}
          <div className="lg:col-span-4 space-y-4">
            <SmartLogo lightMode={true} size="md" />
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm pt-1">
              Smart Engineering (SE) is an industrial construction management company established in 2007 in Dhaka, Bangladesh.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Leading turnkey design-build contractor for pre-engineered steel buildings (PEB), heavy manufacturing plants, export warehouses, and statutory licenses.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>BNBC 2020 & AISC Standard Certified</span>
            </div>
          </div>

          {/* Col 2: Navigation Pages */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Main Pages
            </h4>
            <ul className="space-y-2 text-xs uppercase font-semibold text-slate-300">
              <li>
                <button 
                  onClick={() => navigateTo('home')} 
                  className="hover:text-[#e52424] transition-colors text-left flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>HOME</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('md-message')} 
                  className="hover:text-[#e52424] transition-colors text-left flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>MESSAGE OF MD</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('services')} 
                  className="hover:text-[#e52424] transition-colors text-left flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>OUR SERVICES</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('products')} 
                  className="hover:text-[#e52424] transition-colors text-left flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>PRODUCTS & SOLUTIONS</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('customers')} 
                  className="hover:text-[#e52424] transition-colors text-left flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>OUR CUSTOMERS</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Engineering */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Engineering Phases
            </h4>
            <ul className="space-y-2 text-xs uppercase font-semibold text-slate-300">
              <li>
                <button 
                  onClick={() => navigateTo('services', 'pre-construction')} 
                  className="hover:text-[#e52424] transition-colors text-left flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>PRE-CONSTRUCTION PHASE</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('services', 'construction')} 
                  className="hover:text-[#e52424] transition-colors text-left flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>CONSTRUCTION & ERECTION</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('services', 'post-construction')} 
                  className="hover:text-[#e52424] transition-colors text-left flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>POST-CONSTRUCTION & QA/QC</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('projects')} 
                  className="hover:text-[#e52424] transition-colors text-left flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>COMPLETED PROJECTS</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('about')} 
                  className="hover:text-[#e52424] transition-colors text-left flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>ABOUT SMART ENGINEERING</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('admin')} 
                  className="hover:text-amber-400 text-amber-500/90 transition-colors text-left flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span className="font-semibold">ADMIN PORTAL (CMS)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Get In Touch */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Head Office Contact
            </h4>
            
            <div className="space-y-3 text-xs text-slate-300">
              <p className="leading-relaxed">
                <span className="font-bold text-white block mb-0.5">SUITE # 301 (3RD FLOOR), 65 ELEPHANT ROAD</span>
                DHAKA-1205, BANGLADESH.
              </p>
              
              <p className="leading-snug">
                <span className="font-bold text-white block">24/7 PROJECT HOTLINE:</span>
                <a href="tel:+8801679242424" className="hover:text-[#e52424] text-white font-extrabold text-sm transition-colors block mt-0.5">
                  +880 1679242424
                </a>
              </p>

              <p className="leading-snug">
                <span className="font-bold text-white block">OFFICIAL EMAIL:</span>
                <a href="mailto:contact@smartengineering-bd.com" className="hover:text-[#e52424] text-slate-300 transition-colors block mt-0.5">
                  contact@smartengineering-bd.com
                </a>
              </p>

              <div className="pt-1">
                <button
                  onClick={() => navigateTo('contact')}
                  className="bg-[#e52424] hover:bg-[#c91818] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded transition-colors"
                >
                  Submit Project Inquiry
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Red Copyright Bottom Bar */}
      <div className="bg-[#e52424] text-white py-3.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="mx-auto sm:mx-0">
            COPYRIGHT © 2026 SMART ENGINEERING • ALL RIGHTS RESERVED
          </span>
          <div className="flex items-center gap-4 mx-auto sm:mx-0">
            <button
              onClick={() => navigateTo('admin')}
              className="hover:text-slate-900 transition-colors cursor-pointer text-[11px]"
            >
              ADMIN PORTAL
            </button>
            <span className="opacity-50">•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
