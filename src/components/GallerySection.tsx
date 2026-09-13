import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Maximize2, X, Eye, Tag, Calendar, Layers } from 'lucide-react';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const { gallery, selectedGalleryItem, setSelectedGalleryItem } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Media' },
    { id: 'erection', label: 'Steel Erection' },
    { id: 'factory', label: 'Completed Facilities' },
    { id: 'framing', label: 'Steel Frameworks' },
    { id: 'visualization', label: '3D BIM Models' },
  ];

  const filteredGallery = gallery.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <section id="gallery" className="py-12 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
            <span>Visual Evidence & Craftsmanship</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-display">
            On-Site Construction & Engineering Gallery
          </h2>
          <p className="mt-2 text-xs sm:text-base text-slate-600 leading-relaxed">
            High-resolution photographic documentation of our steel fabrication lines, crane erection procedures, completed architectural facades, and millimeter-precise 3D Tekla BIM models.
          </p>
        </div>

        {/* Category Filter Pills (Horizontal Scroll on Mobile) */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isCurrent = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-lg text-xs font-semibold transition-all shrink-0 active:scale-95 ${
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedGalleryItem(item)}
              className="group relative bg-slate-100 rounded-xl overflow-hidden cursor-pointer aspect-16/10 sm:aspect-4/3 shadow-xs hover:shadow-md transition-all border border-slate-200 active:scale-99"
            >
              <img
                src={item.imageUrl}
                alt={item.altText}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Tag in corner */}
              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                <span className="bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 text-slate-900 p-1.5 sm:p-2 rounded-full shadow-md">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 transform translate-y-0 sm:translate-y-1 group-hover:translate-y-0 transition-transform">
                <h3 className="text-xs sm:text-sm font-bold text-white font-display mb-0.5 sm:mb-1 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-1 sm:line-clamp-2 leading-relaxed opacity-85">
                  {item.caption}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-amber-400/80 mt-1 sm:mt-2">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Fullscreen Modal */}
      {selectedGalleryItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedGalleryItem(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-16/10 sm:aspect-16/9 bg-black max-h-[65vh]">
              <img
                src={selectedGalleryItem.imageUrl}
                alt={selectedGalleryItem.altText}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setSelectedGalleryItem(null)}
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-slate-900 text-white p-2.5 rounded-full transition-colors shadow-md active:scale-95"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 bg-slate-900 text-white border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-amber-500/20 text-amber-400 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded uppercase">
                    {selectedGalleryItem.categoryLabel}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400">{selectedGalleryItem.date}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold font-display text-white">
                  {selectedGalleryItem.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  {selectedGalleryItem.caption}
                </p>
              </div>

              <a
                href="#contact"
                onClick={() => setSelectedGalleryItem(null)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-3 rounded-lg uppercase tracking-wider transition-colors shrink-0 text-center w-full sm:w-auto"
              >
                Request Consultation
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
