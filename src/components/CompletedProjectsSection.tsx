import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Project } from '../types';
import { ArrowRight, MapPin, Building, Calendar, Layers, X } from 'lucide-react';

const featuredProjects = [
  {
    id: 'feat-1',
    code: '45001818_866421316885700_7999240648790114304_n',
    title: 'Multi-Tier Industrial Steel Frame Complex',
    location: 'Ashulia Industrial Zone, Savar, Dhaka',
    client: 'Metro Foils Ltd. (Rangs Group)',
    category: 'Industrial Plant',
    area: '145,000 Sq. Ft.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=800&q=80',
    description: 'Circular foundation with heavy multistory structural steel framework engineered for high vibrational loads and continuous industrial operation.'
  },
  {
    id: 'feat-2',
    code: '54514370_955591937968637_1974979486306795520_n',
    title: 'Heavy Chemical & Petroleum Manufacturing Plant',
    location: 'Hemayetpur, Savar, Dhaka',
    client: 'Basumati Oasis Petroleum Industries Ltd.',
    category: 'Petroleum & Chemical',
    area: '220,000 Sq. Ft.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    description: 'Turnkey industrial construction including storage vessel foundations, heavy crane gantries, and specialized fire-rated steel framing.'
  },
  {
    id: 'feat-3',
    code: '139708320_1497274290467063_8790585051029057172_n',
    title: 'Master-Planned Integrated Garment Facility',
    location: 'Katgora, Ashulia, Dhaka',
    client: 'Future Clothing Ltd.',
    category: 'RMG & Textile',
    area: '380,000 Sq. Ft.',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    description: 'State-of-the-art industrial compound with signature blue PEB roofs, heavy internal logistics roads, comprehensive drainage, and BNBC compliance.'
  }
];

export const CompletedProjectsSection: React.FC = () => {
  const { projects, setSelectedProject } = useApp();
  const [isFullCatalogOpen, setIsFullCatalogOpen] = useState(false);

  return (
    <section id="projects" className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Centered Red title & subtitle from prompt) */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#e52424] tracking-tight mb-2">
            Completed Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-700 font-semibold">
            We are Experts In Still Construction. 5 years & 50+ projects !
          </p>
        </div>

        {/* 3 Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredProjects.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image */}
              <div className="h-60 w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  {item.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#e52424] transition-colors mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 truncate max-w-[170px]">
                    <MapPin className="w-3.5 h-3.5 text-[#e52424] shrink-0" />
                    <span className="truncate">{item.location.split(',')[0]}</span>
                  </span>
                  <span className="font-semibold text-slate-700">
                    {item.area}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEE MORE PROJECT Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setIsFullCatalogOpen(true)}
            className="bg-[#e52424] hover:bg-[#c91818] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
          >
            <span>SEE MORE PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Full Catalog Modal */}
      {isFullCatalogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div 
            className="relative bg-white text-slate-900 rounded-xl shadow-2xl max-w-6xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-neutral-800">
              <div>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
                  Smart Engineering Project Portfolio
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Over 50+ Industrial, Commercial & PEB Steel Facilities Across Bangladesh
                </p>
              </div>
              <button
                onClick={() => setIsFullCatalogOpen(false)}
                className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="Close catalog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
              {projects.map((proj) => (
                <div 
                  key={proj.id}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                        <span>{proj.category}</span>
                        <span className="text-emerald-600">{proj.status}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mb-1">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-[#e52424] font-semibold mb-2">
                        {proj.client}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                        {proj.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#e52424]" />
                        {proj.location}
                      </span>
                      <span className="font-bold text-slate-700">
                        {proj.areaSqFt ? `${proj.areaSqFt.toLocaleString()} sqft` : 'Completed'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
              <span className="text-slate-600">
                Contact our engineering office to schedule an industrial site visit.
              </span>
              <a
                href="tel:+8801679242424"
                className="bg-[#e52424] hover:bg-[#c91818] text-white px-4 py-1.5 rounded font-bold uppercase tracking-wider transition-colors"
              >
                Hotline: +880 1679242424
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
