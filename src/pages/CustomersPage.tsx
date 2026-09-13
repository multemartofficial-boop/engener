import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { customerList, CustomerItem } from '../data/customerData';
import { 
  Building2, 
  Search, 
  MapPin, 
  Tag, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Phone,
  Briefcase,
  Layers,
  Award
} from 'lucide-react';

const conglomerateSpotlights = [
  {
    name: 'Bashundhara Group',
    tag: 'Diversified Conglomerate',
    description: 'Structural steel warehouses, utility shed infrastructure, and heavy plant foundations.',
    location: 'Dhaka & Chattogram',
    code: 'BG'
  },
  {
    name: 'BRAC Enterprise',
    tag: 'Social & Industrial Enterprise',
    description: 'Commercial facility engineering, industrial packaging sheds, and institutional buildings.',
    location: 'Nationwide Bangladesh',
    code: 'BRAC'
  },
  {
    name: 'Mamun Group',
    tag: 'Heavy Industrial Group',
    description: 'Large clear-span manufacturing plants, spinning mills, and heavy equipment foundations.',
    location: 'Gazipur & Narayanganj',
    code: 'MG'
  },
  {
    name: 'Meghna Group of Industries (MGI)',
    tag: 'Heavy Manufacturing & Ship Building',
    description: 'Overhead crane gantry steel structures, shipyard workshops, and multi-bay warehousing.',
    location: 'Meghnaghat, Narayanganj',
    code: 'MGI'
  },
  {
    name: 'Rangs Group',
    tag: 'Packaging & Diversified',
    description: 'Precision industrial packaging facility (Metro Foils Ltd.), logistics hubs, and assembly sheds.',
    location: 'Ashulia & Savar, Dhaka',
    code: 'RG'
  }
];

export const CustomersPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = new Set(customerList.map(c => c.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredCustomers = useMemo(() => {
    return customerList.filter(c => {
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        c.name.toLowerCase().includes(q) || 
        c.location.toLowerCase().includes(q) || 
        (c.group && c.group.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

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
            <span className="text-white font-semibold">Customers</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#e52424]/20 border border-[#e52424]/40 text-[#e52424] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Valued Client Network</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Our Esteemed Corporate Clients
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Proudly partnering with 50+ leading industrial conglomerates, multi-national joint ventures, and manufacturing enterprises across Bangladesh since 2007.
            </p>
          </div>

        </div>
      </div>

      {/* 2. MAJOR CONGLOMERATES SHOWCASE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 lg:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#e52424]">
                Flagship Partnerships
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                Conglomerates & Industrial Groups
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Repeat Trust Over 18+ Years
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {conglomerateSpotlights.map((grp, idx) => (
              <div
                key={idx}
                className={`bg-slate-50 border border-slate-200/90 rounded-xl p-4 sm:p-5 hover:border-[#e52424] hover:bg-white transition-all group flex flex-col justify-between cursor-pointer ${
                  idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-900 group-hover:bg-[#e52424] text-white flex items-center justify-center font-bold text-xs mb-2.5 transition-colors">
                    {grp.code}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#e52424] transition-colors leading-snug">
                    {grp.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500 block mt-0.5">
                    {grp.tag}
                  </span>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {grp.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/70 text-[11px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#e52424] shrink-0" />
                  <span className="truncate">{grp.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. SEARCH & DIRECTORY TOOLBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company name, group, or location..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#e52424] focus:bg-white"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs font-bold text-slate-600 whitespace-nowrap self-end sm:self-center">
              Showing <span className="text-[#e52424] font-black">{filteredCustomers.length}</span> of {customerList.length} Verified Clients
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider whitespace-nowrap transition-colors text-[11px] ${
                  selectedCategory === cat
                    ? 'bg-[#e52424] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4. CLIENTS DIRECTORY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCustomers.map((cust) => (
            <div
              key={cust.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#e52424] transition-colors leading-snug">
                    {cust.name}
                  </h3>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                    {cust.category.split(' ')[0]}
                  </span>
                </div>

                {cust.group && (
                  <p className="text-xs font-semibold text-[#e52424] mb-2">
                    {cust.group}
                  </p>
                )}

                <div className="flex items-start gap-1.5 text-xs text-slate-500 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-[#e52424] shrink-0 mt-0.5" />
                  <span className="line-clamp-2 leading-relaxed">{cust.location}</span>
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">
                  {cust.category}
                </span>
                <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Verified Client</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 5. BOTTOM CTA */}
        <div className="mt-14 bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight">
              Join Bangladesh’s Leading Industrial Portfolio
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Discuss your upcoming industrial factory, logistics center, or cold storage warehouse with our senior engineering team.
            </p>
          </div>

          <button
            onClick={() => navigateTo('contact')}
            className="bg-[#e52424] hover:bg-[#c91818] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg transition-colors inline-flex items-center gap-2 shrink-0 shadow-lg"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
