import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building, 
  MapPin, 
  Maximize2, 
  Layers, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Search, 
  ArrowUpRight, 
  X,
  Weight,
  Factory,
  ChevronRight
} from 'lucide-react';
import { Project, ProjectCategory } from '../types';

export const ProjectsGallerySection: React.FC = () => {
  const { projects, selectedProject, setSelectedProject } = useApp();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'industrial', label: 'Industrial Plants' },
    { id: 'warehouse', label: 'Warehouses & Logistics' },
    { id: 'commercial', label: 'Commercial & Multi-Story' },
    { id: 'agro', label: 'Agro & Cold Storage' },
    { id: 'ongoing', label: 'Active Sites' },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter(proj => {
      const matchesCat = activeCategory === 'all' || proj.category === activeCategory;
      const matchesSearch = 
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <section id="projects" className="py-12 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
              <span>Executed Steel Facilities</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-display">
              Project Portfolio Across Bangladesh
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Engineered and fabricated by Smart Engineering BD. From mega clear-span logistics hubs in Savar to high-load textile manufacturing plants in Gazipur and heavy machine foundries in Chattogram.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-72 relative shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client, district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-9 pr-8 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters (Horizontal Scrollable on Mobile) */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isCurrent = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-2 sm:px-4 sm:py-2 rounded-lg text-xs font-semibold transition-all shrink-0 active:scale-95 ${
                  isCurrent
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <Factory className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Projects Found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              No steel building projects matched "{searchQuery}". Try selecting another category or clear the search query.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="text-xs bg-slate-900 text-white px-3.5 py-1.5 rounded font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col group"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} - Smart Engineering Steel Construction`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs border border-slate-200/80 uppercase tracking-wider">
                      {project.categoryLabel}
                    </span>
                    {project.status === 'Completed' ? (
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="bg-amber-50 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        <span>Under Construction</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="bg-white/95 hover:bg-white text-slate-800 p-2 rounded-lg shadow-xs text-xs font-semibold flex items-center gap-1 border border-slate-200 transition-colors"
                      title="View Details"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-slate-700" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display leading-snug group-hover:text-amber-700 transition-colors mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Key Engineering Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 py-2.5 px-3 bg-slate-50 rounded-lg border border-slate-100 text-xs mb-4">
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 font-bold block">Floor Area</span>
                        <span className="font-bold text-slate-800">{project.coveredArea}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 font-bold block">Steel Tonnage</span>
                        <span className="font-bold text-amber-700">{project.steelTonnage}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <span>Project Specs & Scope</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header Image */}
            <div className="relative aspect-16/10 sm:aspect-21/9 bg-slate-950 overflow-hidden">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-slate-900 text-white p-2.5 rounded-full backdrop-blur-xs transition-colors shadow-lg active:scale-95"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 sm:gap-2">
                <span className="bg-slate-900/90 text-amber-400 text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded">
                  {selectedProject.categoryLabel}
                </span>
                <span className="bg-white/90 text-slate-900 text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded">
                  {selectedProject.status}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-8">
              
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-[11px] sm:text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Client: <strong className="text-slate-700">{selectedProject.client}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Location: <strong className="text-slate-700">{selectedProject.location}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Year: <strong className="text-slate-700">{selectedProject.year}</strong></span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-950 font-display mb-3">
                {selectedProject.title}
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                {selectedProject.description}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 bg-slate-50 p-3.5 sm:p-4 rounded-lg border border-slate-200 mb-5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Covered Area</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">{selectedProject.coveredArea}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Steel Weight</span>
                  <span className="text-xs sm:text-sm font-bold text-amber-700">{selectedProject.steelTonnage}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Execution Code</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">BNBC 2020</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Steel Grade</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">ASTM A572 Gr. 50</span>
                </div>
              </div>

              {/* Scope of Work */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
                  Scope of Engineering & Construction Work
                </h4>
                <div className="space-y-2">
                  {selectedProject.scope.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-4 border-t border-slate-200">
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-5 py-3 rounded-lg uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 text-center shadow-xs"
                >
                  <span>Inquire About Similar Steel Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors text-center"
                >
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
