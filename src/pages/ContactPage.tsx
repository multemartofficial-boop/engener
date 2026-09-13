import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { navigateTo, submitInquiry } = useApp();

  const [formState, setFormState] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    projectType: 'Industrial Manufacturing Plant',
    location: '',
    estimatedArea: '',
    timeline: 'Within 3 Months',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.fullName || !formState.phone) return;

    submitInquiry({
      fullName: formState.fullName,
      companyName: formState.companyName,
      email: formState.email,
      phone: formState.phone,
      projectType: formState.projectType,
      location: formState.location,
      estimatedArea: formState.estimatedArea,
      timeline: formState.timeline,
      message: formState.message
    });

    setIsSubmitted(true);
  };

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
            <span className="text-white font-semibold">Contact Us</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#e52424]/20 border border-[#e52424]/40 text-[#e52424] text-xs font-bold uppercase tracking-wider">
              <Phone className="w-3.5 h-3.5" />
              <span>Headquarters & Inquiries</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Get in Touch with Our Engineering Team
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              We provide prompt preliminary structural BOQ estimates, site visits, and comprehensive feasibility consultations for your industrial development in Bangladesh.
            </p>
          </div>

        </div>
      </div>

      {/* 2. MAIN CONTACT SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Office Information & Directory (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Headquarters Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#e52424]">
                  Registered Head Office
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Smart Engineering (SE)
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-50 text-[#e52424] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Corporate Address:</span>
                    <span className="text-slate-600 leading-relaxed">
                      Suite # 301 (3rd Floor), 65 Elephant Road, Dhaka-1205, Bangladesh.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-50 text-[#e52424] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Direct Hotlines:</span>
                    <a href="tel:+8801679242424" className="text-[#e52424] font-bold block hover:underline">
                      +880 1679242424 (24/7 Available)
                    </a>
                    <a href="tel:+8801711889922" className="text-slate-600 block hover:underline">
                      +880 1711-889922 (Technical Desk)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-50 text-[#e52424] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Official Emails:</span>
                    <a href="mailto:contact@smartengineering-bd.com" className="text-slate-700 block hover:underline">
                      contact@smartengineering-bd.com
                    </a>
                    <a href="mailto:estimation@smartengineering-bd.com" className="text-slate-700 block hover:underline">
                      estimation@smartengineering-bd.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-50 text-[#e52424] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Office Working Hours:</span>
                    <span className="text-slate-600 block">
                      Saturday – Thursday: 9:00 AM – 7:00 PM
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Site Erection Supervision: 24/7 On-Duty
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant Call Button */}
              <div className="pt-2 border-t border-slate-100">
                <a
                  href="tel:+8801679242424"
                  className="w-full bg-[#e52424] hover:bg-[#c91818] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-lg transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Hotline Now</span>
                </a>
              </div>
            </div>

            {/* Department Extensions */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-md">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#e52424]">
                Direct Departments
              </h4>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="pb-2 border-b border-slate-800">
                  <span className="font-bold text-white block">Cost Estimating & BOQ Team</span>
                  <span>Direct: +880 1679242424 • estimation@smartengineering-bd.com</span>
                </div>
                <div className="pb-2 border-b border-slate-800">
                  <span className="font-bold text-white block">Structural & PEB Design Bureau</span>
                  <span>Direct: +880 1711-889922 • design@smartengineering-bd.com</span>
                </div>
                <div>
                  <span className="font-bold text-white block">Regulatory & Plan Approvals</span>
                  <span>RAJUK, CDA, Fire & Environmental Clearances</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Interactive Inquiry & Quote Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-md">
            
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Thank You! Your Inquiry Has Been Received.
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Our Chief Estimating Engineer will review your project details and contact you at <strong className="text-slate-900">{formState.phone}</strong> within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({
                        fullName: '',
                        companyName: '',
                        email: '',
                        phone: '',
                        projectType: 'Industrial Manufacturing Plant',
                        location: '',
                        estimatedArea: '',
                        timeline: 'Within 3 Months',
                        message: ''
                      });
                    }}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#e52424]">
                    Consultation & Quotation
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                    Request an Engineering Proposal
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Please provide project details to receive an itemized BOQ and technical framing assessment.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.fullName}
                      onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                      placeholder="e.g. Engr. Rafiqul Islam"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#e52424] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Company Name / Group
                    </label>
                    <input
                      type="text"
                      value={formState.companyName}
                      onChange={(e) => setFormState({ ...formState, companyName: e.target.value })}
                      placeholder="e.g. Meghna Group / Apex Spinning"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#e52424] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="e.g. +880 1712-345678"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#e52424] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="name@company.com.bd"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#e52424] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Project Type
                    </label>
                    <select
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#e52424] focus:bg-white"
                    >
                      <option>Industrial Manufacturing Plant</option>
                      <option>Warehouse & Logistics Shed</option>
                      <option>Commercial Multi-Story Steel Plaza</option>
                      <option>Agro / Cold Chain Facility</option>
                      <option>Spinning / Garments Factory</option>
                      <option>Other Pre-Engineered Structure</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Project Location
                    </label>
                    <input
                      type="text"
                      value={formState.location}
                      onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                      placeholder="e.g. Gazipur / Savar / Narayanganj"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#e52424] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Estimated Area (Sq. Ft.)
                    </label>
                    <input
                      type="text"
                      value={formState.estimatedArea}
                      onChange={(e) => setFormState({ ...formState, estimatedArea: e.target.value })}
                      placeholder="e.g. 50,000 Sq. Ft."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#e52424] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Project Scope / Specific Technical Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Provide details about crane capacity, clear span, eave height, soil condition, or required deliverables..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#e52424] focus:bg-white resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#e52424] hover:bg-[#c91818] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded-lg transition-all shadow-md hover:shadow-red-600/30 inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry for BOQ</span>
                  </button>
                  <span className="text-[11px] text-slate-400 block sm:inline-block sm:ml-4 mt-2 sm:mt-0">
                    No obligation • Confidential engineering review
                  </span>
                </div>
              </form>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
