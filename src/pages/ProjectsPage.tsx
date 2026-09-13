import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Project, ProjectCategory } from '../types';
import { SafeImage } from '../components/SafeImage';
import { 
  Building2, 
  MapPin, 
  Layers, 
  Calendar, 
  Search, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight, 
  X, 
  Scale, 
  Maximize2,
  HardHat,
  ExternalLink
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects, navigateTo, currentSubPage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [highlightedProject, setHighlightedProject] = useState<string | null>(null);

  useEffect(() => {
    if (currentSubPage) {
      const targetId = currentSubPage.toLowerCase();
      const proj = projects.find(p => p.id.toLowerCase() === targetId || p.id.toLowerCase().includes(targetId));
      if (proj) {
        setHighlightedProject(proj.id);
        const timer = setTimeout(() => {
          const el = document.getElementById(proj.id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);

        const clearTimer = setTimeout(() => {
          setHighlightedProject(null);
        }, 3500);

        return () => {
          clearTimeout(timer);
          clearTimeout(clearTimer);
        };
      }
    }
  }, [currentSubPage, projects]);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'industrial', label: 'Industrial Manufacturing' },
    { id: 'warehouse', label: 'Warehouses & Logistics' },
    { id: 'commercial', label: 'Commercial & Multi-Story' },
    { id: 'agro', label: 'Agro & Cold Storage' },
    { id: 'ongoing', label: 'Active Sites' }
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = 
        p.title.toLowerCase().includes(q) || 
        p.client.toLowerCase().includes(q) || 
        p.location.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

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
            <span className="text-white font-semibold">Projects</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#e52424]/20 border border-[#e52424]/40 text-[#e52424] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>500+ Projects Completed</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Industrial & Steel Projects Portfolio
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Engineered for Bangladesh's leading manufacturing enterprises with turnkey steel framing, gantry crane runways, and rapid erection.
            </p>
          </div>

        </div>
      </div>

      {/* 2. CATEGORY TABS & SEARCH BAR */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[#e52424] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or clients..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#e52424] focus:bg-white"
              />
            </div>

          </div>
        </div>
      </div>

      {/* 3. PROJECTS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing <span className="text-[#e52424] font-black">{filteredProjects.length}</span> Engineering Projects
          </p>
          <span className="text-xs text-slate-400 font-medium">
            BNBC 2020 & AISC Standard
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((proj) => {
            const isHighlighted = highlightedProject === proj.id;

            return (
              <div
                key={proj.id}
                id={proj.id}
                className={`bg-white rounded-xl border overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between group ${
                  isHighlighted 
                    ? 'border-[#e52424] ring-4 ring-red-500/25 scale-[1.02]' 
                    : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Image */}
                  <div 
                    onClick={() => setActiveModalProject(proj)}
                    className="h-56 overflow-hidden relative bg-slate-100 cursor-pointer"
                  >
                    <SafeImage
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded uppercase">
                      {proj.categoryLabel}
                    </div>
                    <div className={`absolute top-3 right-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                      proj.status === 'Completed' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-amber-500 text-slate-900'
                    }`}>
                      {proj.status}
                    </div>
                  </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div 
                    onClick={() => setActiveModalProject(proj)}
                    className="cursor-pointer"
                  >
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#e52424] transition-colors line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#e52424] mt-0.5">
                      {proj.client}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Technical Specs Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Area</span>
                      <span className="font-bold text-slate-800">{proj.coveredArea}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Steel Tonnage</span>
                      <span className="font-bold text-slate-800">{proj.steelTonnage}</span>
                    </div>
                  </div>

                  {/* Location & Year */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#e52424] shrink-0" />
                      <span className="truncate max-w-[180px]">{proj.location}</span>
                    </span>
                    <span className="font-mono text-slate-400">{proj.year}</span>
                  </div>

                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(proj)}
                  className="text-xs font-bold uppercase text-slate-700 hover:text-[#e52424] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Project Scope</span>
                </button>

                <button
                  onClick={() => navigateTo('contact')}
                  className="text-xs font-bold uppercase text-[#e52424] hover:text-[#c91818] inline-flex items-center gap-1"
                >
                  <span>Inquire Similar</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
        </div>

        {/* 4. BOTTOM CTA */}
        <div className="mt-14 bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight">
              Have an Industrial Plant or Steel Warehouse in Mind?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Get an accurate preliminary BOQ and structural framing scheme prepared within 48 hours.
            </p>
          </div>

          <button
            onClick={() => navigateTo('contact')}
            className="bg-[#e52424] hover:bg-[#c91818] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg transition-colors inline-flex items-center gap-2 shrink-0 shadow-lg"
          >
            <span>Request Project BOQ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 5. PROJECT DETAIL INSPECTION MODAL */}
      {activeModalProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-fadeIn"
          onClick={() => setActiveModalProject(null)}
        >
          <div 
            className="relative bg-white text-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#e52424] font-bold">
                  {activeModalProject.categoryLabel}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Image */}
              <div className="h-64 rounded-xl overflow-hidden relative bg-slate-100">
                <SafeImage
                  src={activeModalProject.imageUrl}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Client</span>
                  <span className="text-xs font-bold text-slate-900">{activeModalProject.client}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Location</span>
                  <span className="text-xs font-bold text-slate-900">{activeModalProject.location}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Covered Area</span>
                  <span className="text-xs font-bold text-slate-900">{activeModalProject.coveredArea}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Steel Tonnage</span>
                  <span className="text-xs font-bold text-slate-900">{activeModalProject.steelTonnage}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Project Description
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeModalProject.description}
                </p>
              </div>

              {/* Engineering Scope */}
              {activeModalProject.scope && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Scope of Engineering & Execution
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {activeModalProject.scope.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                Project Ref: {activeModalProject.id.toUpperCase()}
              </span>
              <button
                onClick={() => {
                  setActiveModalProject(null);
                  navigateTo('contact');
                }}
                className="bg-[#e52424] hover:bg-[#c91818] text-white text-xs font-bold uppercase px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <span>Inquire About This Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
