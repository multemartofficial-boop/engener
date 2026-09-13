import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, MessageSquare, FileText, ShieldCheck, Home } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { currentPage, navigateTo } = useApp();

  // If on admin dashboard, don't show the public mobile contact bar
  if (currentPage === 'admin') {
    return null;
  }

  return (
    <aside 
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-2 py-1.5"
    >
      <div className="grid grid-cols-4 items-center gap-1 max-w-md mx-auto">
        
        {/* Home */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center py-1 rounded-lg transition-colors cursor-pointer ${
            currentPage === 'home' ? 'text-[#e52424]' : 'text-slate-600 active:text-[#e52424]'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">Home</span>
        </button>

        {/* Instant Phone Call */}
        <a
          href="tel:+8801679242424"
          className="flex flex-col items-center justify-center py-1 text-slate-700 active:text-[#e52424] transition-colors cursor-pointer group"
          title="Call 24/7 Hotline"
        >
          <div className="relative">
            <div className="w-6 h-6 rounded-full bg-red-50 group-hover:bg-[#e52424] text-[#e52424] group-hover:text-white flex items-center justify-center transition-colors">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5 text-[#e52424]">Call 24/7</span>
        </a>

        {/* WhatsApp Chat */}
        <a
          href="https://wa.me/8801679242424?text=Hello%20Smart%20Engineering,%20I%20would%20like%20to%20discuss%20an%20industrial%20construction%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-slate-700 active:text-emerald-600 transition-colors cursor-pointer group"
          title="Chat on WhatsApp"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-50 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white flex items-center justify-center transition-colors">
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5 text-emerald-700">WhatsApp</span>
        </a>

        {/* Request Quote / Proposal */}
        <button
          onClick={() => navigateTo('contact')}
          className={`flex flex-col items-center justify-center py-1 rounded-lg transition-colors cursor-pointer ${
            currentPage === 'contact' ? 'text-[#e52424]' : 'text-slate-600 active:text-[#e52424]'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5 text-slate-900">Get Quote</span>
        </button>

      </div>
    </aside>
  );
};
