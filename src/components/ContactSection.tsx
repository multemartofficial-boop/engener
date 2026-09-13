import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  ChevronDown
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { submitInquiry } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: 'Pre-Construction',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const servicesList = [
    'Pre-Construction Work',
    'Construction & Supervision',
    'Post-Construction Handover',
    'Digital Land Surveying',
    'Geotechnical Soil Test',
    'Architectural & Engineering Design',
    'Steel PEB Fabrication',
    'Factory / Fire License Support'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setError('Please provide your name and phone number.');
      return;
    }

    submitInquiry({
      fullName: formData.fullName,
      email: formData.email || 'direct@smartengineering-bd.com',
      phone: formData.phone,
      companyName: 'Private Client',
      projectType: formData.service,
      location: 'Bangladesh',
      estimatedArea: 'Standard Industrial Size',
      timeline: 'Immediate Consultation',
      message: formData.message
    });

    setIsSubmitted(true);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      service: 'Pre-Construction Work',
      message: ''
    });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 6000);
  };

  return (
    <section id="contact" className="relative bg-slate-100 pb-20 overflow-hidden">
      
      {/* Top Red Header Banner (as shown in reference image 7) */}
      <div className="bg-[#e52424] text-white pt-14 pb-28 px-4 text-center relative overflow-hidden">
        {/* Subtle geometric line pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider mb-3">
            GET IN TOUCH
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-xl mx-auto leading-relaxed font-normal">
            Have an upcoming industrial or commercial steel construction project? Reach out to our engineering team for expert consulting and itemized budget estimates.
          </p>
        </div>
      </div>

      {/* Overlapping Two-Column Card (exact structure from reference image 7) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-slate-200">
          
          {/* Left Form (White Background): "Drop a Massege" */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12">
            <h3 className="text-2xl font-extrabold text-[#e52424] mb-8 tracking-tight">
              Drop a Massege
            </h3>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center text-emerald-800 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-lg">Thank You! Your message was sent.</h4>
                <p className="text-xs text-emerald-700">
                  Our engineering representative will contact you shortly at your provided phone number.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded border border-red-200">
                    {error}
                  </div>
                )}

                {/* Full Name (Underline input as in reference image 7) */}
                <div>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Full Name"
                    className="w-full pb-2.5 pt-1 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent border-b border-slate-300 focus:outline-hidden focus:border-[#e52424] transition-colors"
                  />
                </div>

                {/* Phone & Email side by side or stacked */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Phone"
                      className="w-full pb-2.5 pt-1 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent border-b border-slate-300 focus:outline-hidden focus:border-[#e52424] transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email"
                      className="w-full pb-2.5 pt-1 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent border-b border-slate-300 focus:outline-hidden focus:border-[#e52424] transition-colors"
                    />
                  </div>
                </div>

                {/* Select Service Dropdown */}
                <div className="relative">
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full pb-2.5 pt-1 text-sm sm:text-base text-slate-800 bg-transparent border-b border-slate-300 focus:outline-hidden focus:border-[#e52424] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Service</option>
                    {servicesList.map((srv, idx) => (
                      <option key={idx} value={srv}>{srv}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-1 top-2 pointer-events-none" />
                </div>

                {/* Massege (Textarea with underline as in image 7) */}
                <div>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Massege"
                    className="w-full pb-2.5 pt-1 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent border-b border-slate-300 focus:outline-hidden focus:border-[#e52424] transition-colors resize-none"
                  />
                </div>

                {/* Red Pill Button: "SEND MASSEGE" */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#e52424] hover:bg-[#c91818] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                  >
                    <span>SEND MASSEGE</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column (Navy Blue Background): "Contact Information" */}
          <div className="lg:col-span-5 bg-[#1b2675] text-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-8 tracking-tight">
                Contact Information
              </h3>

              {/* Information Items with Circle Icons */}
              <div className="space-y-6">
                
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white mt-0.5 border border-white/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-200 leading-snug">
                    <p className="font-semibold text-white">Suite # 301 (3rd Floor),</p>
                    <p>65 Elephant Road Dhaka-1205</p>
                    <p className="text-slate-300">Bangladesh</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white mt-0.5 border border-white/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-200 leading-snug">
                    <a 
                      href="tel:+8801679242424" 
                      className="font-bold text-white hover:text-amber-300 transition-colors block text-base"
                    >
                      +880 1679-242424
                    </a>
                    <p className="text-slate-300 text-xs mt-0.5">24/7 Hotline Support</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white mt-0.5 border border-white/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-200 leading-snug">
                    <a 
                      href="mailto:contact@smartengineering-bd.com" 
                      className="font-medium text-white hover:text-amber-300 transition-colors block"
                    >
                      contact@smartengineering-bd.com
                    </a>
                    <p className="text-slate-300 text-xs mt-0.5">Official Inquiries</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Social Icons at bottom of blue card (as shown in reference image 7) */}
            <div className="pt-10 border-t border-white/15 flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#1b2675] flex items-center justify-center text-white transition-all text-xs font-bold"
                title="Facebook"
              >
                f
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#1b2675] flex items-center justify-center text-white transition-all text-xs font-bold"
                title="Twitter"
              >
                𝕏
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#1b2675] flex items-center justify-center text-white transition-all text-xs font-bold"
                title="YouTube"
              >
                yt
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#1b2675] flex items-center justify-center text-white transition-all text-xs font-bold"
                title="LinkedIn"
              >
                in
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
