import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SafeImage } from '../components/SafeImage';
import { 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight, 
  Search, 
  Layers, 
  ShieldCheck, 
  FileText, 
  HardHat, 
  Compass, 
  Phone,
  Flame,
  Award,
  Factory,
  Leaf
} from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  category: 'Planning & Survey' | 'Design & Engineering' | 'Construction & Piling' | 'Licenses & Clearances';
  subtitle: string;
  description: string;
  codeStandard: string;
  deliverables: string[];
  imageUrl: string;
}

const productList: ProductItem[] = [
  {
    id: 'prod-survey',
    name: 'Digital Land Surveying',
    category: 'Planning & Survey',
    subtitle: 'Total Station & Aerial Drone Topography',
    description: 'High-precision geodetic digital surveying utilizing electronic total stations and drone aerial photogrammetry. Captures exact boundary coordinates, elevation contours, and RL levels.',
    codeStandard: 'Survey of Bangladesh (SoB) & Cadastral Standards',
    deliverables: ['Digital Contour Survey Map (CAD)', 'Digital Elevation Model (DEM)', 'Boundary Cadastral Alignment Report', 'Bench Mark (BM) Fixation'],
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod-soil',
    name: 'Geotechnical Soil Test',
    category: 'Planning & Survey',
    subtitle: 'Borehole SPT & Sub-Soil Bearing Capacity',
    description: 'Drilling exploration boreholes down to 30–45m depth. Executing Standard Penetration Tests (SPT), laboratory triaxial shear, moisture content, Atterberg limits, and consolidation testing.',
    codeStandard: 'ASTM D1586, ASTM D2166, BNBC 2020 Chapter 3',
    deliverables: ['Field SPT Value Logs', 'Laboratory Test Soil Profile', 'Net Allowable Bearing Capacity (q_all)', 'Foundation Recommendation (Shallow vs Cast-in-situ Pile)'],
    imageUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod-concept',
    name: 'Conceptual Discussion & Feasibility',
    category: 'Planning & Survey',
    subtitle: 'Project Sizing, Workflows & Budget Planning',
    description: 'Early-stage technical and financial evaluation of industrial plant requirements. Sizing eave heights, column spacings, crane loads, floor loadings, and electrical power demands.',
    codeStandard: 'Industrial Ergonomics & Master Planning Norms',
    deliverables: ['Preliminary Plant Sizing Matrix', 'Technology & Material Evaluation', 'Rough Order of Magnitude (ROM) Budget', 'Risk Mitigation Blueprint'],
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod-layout',
    name: 'Industrial Flow Layout Plan',
    category: 'Planning & Survey',
    subtitle: 'Machinery Accommodation & Production Routing',
    description: 'Scientific layout planning considering machinery accommodation, raw material storage, finished product movement, administrative offices, and fire egress pathways.',
    codeStandard: 'BNBC 2020 Part 4 Fire Protection & Life Safety',
    deliverables: ['Industrial Flow Process Diagram', 'Machinery Layout Plan (1:100 scale)', 'Internal Forklift & Heavy Logistics Routes', 'Fire Separation & Egress Plan'],
    imageUrl: '/images/smart_steel_frame_1789123531862.jpg'
  },
  {
    id: 'prod-boq',
    name: 'Cost Estimation & Itemized BOQ',
    category: 'Planning & Survey',
    subtitle: 'Transparent Bill of Quantities with Unit Rates',
    description: 'Detailed structural steel take-offs, civil concrete, rebar, cladding sheets, accessories, and labor estimates with zero hidden margins. Prevents unexpected contractor cost overruns.',
    codeStandard: 'PWD Schedule of Rates & Mill Direct Index',
    deliverables: ['Itemized BOQ with Unit Rates & Totals', 'Material Sourcing Procurement Schedule', 'Milestone-Linked Cash Flow Projection', 'Tender Evaluation Matrix'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod-arch-d',
    name: 'Architectural Design',
    category: 'Design & Engineering',
    subtitle: 'Modern Industrial Facades & Functional Aesthetics',
    description: 'Contemporary architectural design blending sleek industrial aesthetics with energy efficiency, daylighting polycarbonates, natural ridge ventilation, and executive administrative blocks.',
    codeStandard: 'BNBC 2020 & RAJUK Building By-laws',
    deliverables: ['Architectural Master Plans & Elevations', 'Sectional Details & Working Drawings', '3D Photorealistic Exterior Perspectives', 'Administrative & Labor Accommodation Layouts'],
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod-arch-s',
    name: 'Structural Design (Civil & PEB Steel)',
    category: 'Design & Engineering',
    subtitle: 'ETABS, STAAD.Pro & AISC Steel Frame Engineering',
    description: 'Full computerized 3D analysis of heavy pre-engineered steel frames (PEB) and reinforced concrete substructures under 160–220 km/h cyclonic winds and seismic Zone-2/3 earthquake loads.',
    codeStandard: 'BNBC 2020, AISC 360-16, MBMA 2010, AWS D1.1',
    deliverables: ['ETABS / STAAD.Pro Math Modeling Report', 'Moment Connection & Anchor Bolt Details', 'Member Sizes & Weight Schedules', 'Civil RCC Foundation Drawings'],
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod-arch-e',
    name: 'Electrical Design & Substation',
    category: 'Design & Engineering',
    subtitle: 'HT/LT Panels, Transformer Substation & Lighting',
    description: 'Complete industrial electrical engineering including HT/LT switchgear, distribution panels, busbar trunking (BBT), lightning protection systems, and automated diesel generator backup.',
    codeStandard: 'BNBC 2020 Part 8, IEC & BREB Standards',
    deliverables: ['Single Line Diagram (SLD)', 'Substation & Transformer Room Layout', 'Load Calculation & Cable Sizing Schedule', 'Lightning Protection & Earthing System'],
    imageUrl: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod-arch-p',
    name: 'Plumbing & Fire Hydrant Design',
    category: 'Design & Engineering',
    subtitle: 'Siphonic Roof Drainage & NFPA Fire Sprinklers',
    description: 'Engineered drainage networks, siphonic roof rainwater management, deep water reservoir sizing, overhead water storage, and NFPA compliant automated fire hydrant/sprinkler systems.',
    codeStandard: 'BNBC 2020 Part 8 & NFPA 13, 14, 20',
    deliverables: ['Water Supply & Drainage Schematics', 'Siphonic Rainwater Gutter Calculations', 'Fire Hydrant & Standpipe Pipe Network', 'Underground Reservoir Structural Layout'],
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod-mon',
    name: 'Construction Monitoring & Supervision',
    category: 'Construction & Piling',
    subtitle: 'Third-Party Independent QA/QC & Progress Verification',
    description: 'Certified civil and steel structural engineers stationed on your project to enforce specification compliance, verify contractor bills, perform torque wrench tests, and monitor HSE protocols.',
    codeStandard: 'FIDIC Client/Consultant Agreement Norms',
    deliverables: ['Daily Inspection & Weather Logs', 'Ultrasonic Weld & Concrete Cube Test Checks', 'Certified Contractor Payment Sheets', 'Aerial Drone Weekly Progress Videos'],
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod-piling',
    name: 'Piling & Deep Foundation Works',
    category: 'Construction & Piling',
    subtitle: 'Cast-in-Situ Bored Piles & Precast Driven Piles',
    description: 'Execution and engineering supervision of cast-in-situ bored piles (500mm to 1000mm diameter), precast reinforced concrete driven piles, and soldier sheet shore piling for deep basements.',
    codeStandard: 'BNBC 2020 Chapter 3 & ASTM D1143 (Pile Load Test)',
    deliverables: ['Pile Boring & Concreting Logs', 'Pile Integrity Testing (PIT) Reports', 'Axial Static Pile Load Test Certification', 'Pile Cap Structural Execution'],
    imageUrl: '/images/smart_steel_hero_1789123504292.jpg'
  },
  {
    id: 'prod-loan',
    name: 'Bank Loan Processing Support',
    category: 'Licenses & Clearances',
    subtitle: 'Bankable Project Profiles & Financial Feasibility',
    description: 'Formulating exhaustive technical project profiles, machinery import schedules, and financial projections compliant with Bangladesh Bank requirements for commercial bank loans and IDCOL financing.',
    codeStandard: 'Bangladesh Bank Commercial Credit Regulations',
    deliverables: ['Comprehensive Project Profile (Bankable)', 'Machinery Cost & Import Documentation', 'Financial IRR, NPV & Payback Analysis', 'Civil & PEB Steel Cost Vetting for Bank Valuations'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod-approval',
    name: 'Plan Approval & Statutory Licenses Support',
    category: 'Licenses & Clearances',
    subtitle: 'RAJUK, CDA, Fire License, Factory & DoE Clearances',
    description: 'Turnkey regulatory clearance processing across all statutory bodies in Bangladesh. We prepare vetted drawings, process applications, and coordinate inspections to obtain official clearances.',
    codeStandard: 'RAJUK, CDA, DoE, DIFE & FSCD Bangladesh',
    deliverables: ['Building Plan Sanction Approval (RAJUK/CDA/KDA)', 'Fire License from Fire Service & Civil Defence', 'Department of Environment (DoE) Clearance', 'Factory License (DIFE Compliance)'],
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
  }
];

export const ProductsPage: React.FC = () => {
  const { currentSubPage, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [highlightedProduct, setHighlightedProduct] = useState<string | null>(null);

  useEffect(() => {
    if (currentSubPage) {
      const targetId = currentSubPage.toLowerCase();
      const product = productList.find(p => p.id.toLowerCase() === targetId || p.id.toLowerCase().includes(targetId));
      if (product) {
        setHighlightedProduct(product.id);
        const timer = setTimeout(() => {
          const el = document.getElementById(product.id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);

        const clearTimer = setTimeout(() => {
          setHighlightedProduct(null);
        }, 3500);

        return () => {
          clearTimeout(timer);
          clearTimeout(clearTimer);
        };
      }
    }
  }, [currentSubPage]);

  const categories = ['All', 'Planning & Survey', 'Design & Engineering', 'Construction & Piling', 'Licenses & Clearances'];

  const filteredProducts = useMemo(() => {
    return productList.filter((prod) => {
      const matchCat = selectedCategory === 'All' || prod.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = 
        prod.name.toLowerCase().includes(q) || 
        prod.description.toLowerCase().includes(q) ||
        prod.deliverables.some(d => d.toLowerCase().includes(q));
      return matchCat && matchSearch;
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
            <span className="text-white font-semibold">Products & Engineering Solutions</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#e52424]/20 border border-[#e52424]/40 text-[#e52424] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Technical Product Portfolio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Engineering Solutions & Products
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Specialized civil, structural, architectural, piling, and regulatory licensing services engineered for Bangladesh's industrial sector.
            </p>
          </div>

        </div>
      </div>

      {/* 2. FILTER & SEARCH TOOLBAR (Mobile-Friendly Responsive Bar) */}
      <div className="sticky top-0 sm:top-14 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
          <div className="flex flex-col md:flex-row gap-2.5 sm:gap-4 items-stretch md:items-center justify-between">
            
            {/* Category Chips with Horizontal Scroll */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#e52424] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
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
                placeholder="Search solutions, codes, tests..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#e52424] focus:bg-white"
              />
            </div>

          </div>
        </div>
      </div>

      {/* 3. PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing <span className="text-[#e52424] font-black">{filteredProducts.length}</span> Engineering Solutions
          </p>
          <span className="text-xs text-slate-400 font-medium">
            Turnkey BNBC 2020 Compliance
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((prod) => {
            const isHighlighted = highlightedProduct === prod.id;

            return (
              <div
                key={prod.id}
                id={prod.id}
                className={`bg-white rounded-xl border overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between group ${
                  isHighlighted 
                    ? 'border-[#e52424] ring-4 ring-red-500/25 scale-[1.02]' 
                    : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Image */}
                  <div className="h-48 overflow-hidden relative bg-slate-100">
                    <SafeImage
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded uppercase">
                      {prod.category}
                    </div>
                  </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#e52424] transition-colors leading-snug">
                      {prod.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {prod.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {prod.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Standard Code:
                    </span>
                    <span className="inline-block bg-slate-50 border border-slate-200 text-slate-800 text-[11px] font-mono px-2 py-0.5 rounded font-medium">
                      {prod.codeStandard}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Key Deliverables:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {prod.deliverables.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Smart Engineering
                </span>
                <button
                  onClick={() => navigateTo('contact')}
                  className="text-xs font-bold uppercase text-[#e52424] hover:text-[#c91818] inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
        </div>

      </div>

    </div>
  );
};
