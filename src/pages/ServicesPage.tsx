import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SafeImage } from '../components/SafeImage';
import { 
  Compass, 
  HardHat, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight, 
  Layers, 
  FileText, 
  ShieldCheck, 
  Clock, 
  Search,
  Building,
  Wrench,
  Cpu,
  Phone
} from 'lucide-react';

interface ServicePhase {
  id: 'pre-construction' | 'construction' | 'post-construction';
  title: string;
  tabLabel: string;
  badge: string;
  tagline: string;
  heroImage: string;
  description: string;
  steps: {
    number: string;
    title: string;
    subtitle: string;
    description: string;
    deliverables: string[];
    image?: string;
  }[];
}

const servicePhases: ServicePhase[] = [
  {
    id: 'pre-construction',
    tabLabel: 'Pre-Construction (10 Stages)',
    title: 'Pre-Construction Engineering & Planning',
    badge: 'Phase 01: Concept to Approvals',
    tagline: 'Precision Land Surveying, BNBC Structural Analysis, 3D BIM & Regulatory Permitting',
    heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    description: 'Before any earth is excavated or steel is fabricated, Smart Engineering mitigates technical and financial risks through exhaustive engineering planning. We ensure complete alignment between your production requirements, architectural optimization, and local statutory compliances.',
    steps: [
      {
        number: '01',
        title: 'Initial Project Consultation & Scope Definition',
        subtitle: 'Production Requirements & Capacity Sizing',
        description: 'Collaborative preliminary sessions to determine production capacities, crane tonnages, machinery footprints, fire segregation needs, and budget boundaries.',
        deliverables: ['Project Scope Document', 'Preliminary Master Schedule', 'Design Parameter Matrix'],
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
      },
      {
        number: '02',
        title: 'Digital Land Surveying (Total Station & Drone GPS)',
        subtitle: 'Millimeter-Accurate Site Topography',
        description: 'Advanced geodetic digital surveying utilizing high-precision electronic Total Stations and GPS-enabled aerial drone contour mapping for site levels and boundary verification.',
        deliverables: ['Contour & Topographic Survey Map', 'Digital Elevation Model (DEM)', 'Boundary Cadastral Alignment Report'],
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
      },
      {
        number: '03',
        title: 'Geotechnical Soil Test & Sub-Soil Investigation',
        subtitle: 'Borehole SPT & Safe Soil Bearing Capacity',
        description: 'Drilling exploration boreholes down to 30–45 meters. Performing Standard Penetration Tests (SPT), laboratory shear strength, moisture content, and consolidation testing.',
        deliverables: ['Comprehensive Soil Investigation Report', 'Allowable Soil Bearing Capacity (q_all)', 'Foundation Recommendation (Shallow vs Deep Piling)'],
        image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80'
      },
      {
        number: '04',
        title: 'Conceptual & Industrial Flow Layout Plan',
        subtitle: 'Machinery Flow & Production Efficiency',
        description: 'Optimizing industrial flow from raw material receiving docks to finished goods dispatch bays. Ensuring minimal cross-traffic and maximum worker ergonomics.',
        deliverables: ['Industrial Flow Process Diagram', 'Machinery Layout Accommodation Plan', 'Internal Forklift & Logistics Routing'],
        image: '/images/smart_steel_frame_1789123531862.jpg'
      },
      {
        number: '05',
        title: 'Architectural & Engineering Design (Civil, Structural, MEP)',
        subtitle: 'Full BNBC 2020 & AISC Compliance',
        description: 'Complete multi-disciplinary engineering packages in ETABS and STAAD.Pro for wind (up to 220 km/h) and seismic Zone-2/3 safety, plus substation, lighting, and plumbing.',
        deliverables: ['Architectural Working Drawings', 'Structural Analysis Calculations & Member Schedules', 'MEP (Substation, Lighting, Drainage & Hydrant) Sheets'],
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
      },
      {
        number: '06',
        title: '3D Animation & BIM Virtual Walkthrough',
        subtitle: 'Tekla Structures & 3D Spatial Coordination',
        description: 'High-detail 3D Building Information Modeling (BIM) eliminating spatial clashes between crane girders, HVAC ducts, fire pipes, and structural steel trusses.',
        deliverables: ['Tekla 3D Steel Structure Model', 'Virtual Walkthrough Animation', 'Clash Detection & Resolution Report'],
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
      },
      {
        number: '07',
        title: 'Cost Estimation & Itemized BOQ Budgeting',
        subtitle: 'Transparent Bill of Quantities',
        description: 'Itemized material take-offs detailing exact steel tonnages (Grade 50 built-up & hot-rolled), roofing sheet areas, anchor bolts, foundation concrete, and labor rates.',
        deliverables: ['Itemized BOQ with Unit Rates', 'Material Procurement Schedule', 'Cash-Flow Milestone Forecast'],
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
      },
      {
        number: '08',
        title: 'Permitting & Regulatory Approvals Support',
        subtitle: 'Statutory Clearances Across Authorities',
        description: 'Complete liaison and drawing submissions for RAJUK, Chittagong Development Authority (CDA), Department of Environment (DoE), and Fire Service & Civil Defence.',
        deliverables: ['Statutory Vetted Plan Sets', 'Fire Safety Clearance Application', 'DoE Environmental Clearance Approval Documentation'],
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
      },
      {
        number: '09',
        title: 'Scheduling & Procurement Planning',
        subtitle: 'Steel Mill Sourcing & Fabrication Logistics',
        description: 'Critical Path Method (CPM) project scheduling and verified sourcing of Grade 50 steel plates, high-tensile Grade 8.8 bolts, and PU/PIR insulated sandwich panels.',
        deliverables: ['Master Gantt Chart Project Schedule', 'Mill Sourcing & Material Specifications', 'Sub-Contractor Tendering Guidelines'],
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
      },
      {
        number: '10',
        title: 'Final Pre-Construction Strategic Alignment Meeting',
        subtitle: 'Groundbreaking Preparedness Sign-Off',
        description: 'Multi-stakeholder workshop assembling the client executive team, site engineers, steel fabricators, and foundation contractors for synchronized execution.',
        deliverables: ['Signed Mobilization Protocols', 'Site Safety & Logistics Plan', 'Handover to Construction Command'],
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'construction',
    tabLabel: 'Construction & Monitoring (6 Stages)',
    title: 'Construction, Fabrication & Quality Oversight',
    badge: 'Phase 02: Precision Execution',
    tagline: 'CNC Steel Fabrication, Crane Superstructure Rigging & Certified QA/QC',
    heroImage: '/images/smart_steel_hero_1789123504292.jpg',
    description: 'Transforming engineering drawings into heavy industrial reality. Our on-site supervision and fabrication teams enforce AISC erection tolerances, ultrasonic weld certifications, and stringent safety standards.',
    steps: [
      {
        number: '01',
        title: 'Progress & Schedule Real-Time Monitoring',
        subtitle: 'Milestone Tracking & Drone Oversight',
        description: 'Daily activity tracking against the approved CPM schedule. Weekly drone aerial video updates and digital progress reports shared with executive management.',
        deliverables: ['Weekly Milestone Dashboards', 'Aerial Drone Progress Footage', 'Lookahead 2-Week Site Workplans'],
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
      },
      {
        number: '02',
        title: 'Quality Assurance & Quality Control (QA/QC Inspection)',
        subtitle: 'Non-Destructive Testing (NDT) & Torque Verification',
        description: 'Certified AWS welding inspectors conducting Ultrasonic Testing (UT) and Magnetic Particle Testing (MT) on full-penetration butt welds, plus torque wrench bolt calibration.',
        deliverables: ['NDT Ultrasonic Weld Test Reports', 'Bolt Torque Calibration Logs', 'Steel Mill Test Certificates (MTC)'],
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80'
      },
      {
        number: '03',
        title: 'Health, Safety & Environmental (HSE) Compliance',
        subtitle: 'Zero Accident Policy & Fall Arrest Rigging',
        description: 'Rigorous job safety analysis (JSA) before every crane lift. Mandatory full-body safety harnesses, edge fall-protection netting, and daily toolbox safety talks.',
        deliverables: ['Daily HSE Toolbox Talk Records', 'Heavy Crane Lift Safety Permits', 'Environmental Waste Management Logs'],
        image: '/images/smart_steel_erect_1789123548062.jpg'
      },
      {
        number: '04',
        title: 'Financial & Cost Oversight with Transparent Billing',
        subtitle: 'Zero Budget Overruns Through Exact Verification',
        description: 'Site quantity verification before processing contractor running bills (RA bills). Transparent tracking of structural steel tonnages and civil concrete volumes.',
        deliverables: ['Physical Measurement Verification Sheets', 'Certified Contractor Payment Certificates', 'Budget Variance Analysis Reports'],
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
      },
      {
        number: '05',
        title: 'Structural & Site Conditions Real-Time Monitoring',
        subtitle: 'Optical Laser Plumb Lines & Deflection Testing',
        description: 'Continuous electronic laser leveling of crane runway beams and vertical plumb lines on main building frames to ensure zero column tilting under thermal shifts.',
        deliverables: ['Laser Alignment & Plumb Surveys', 'Crane Runway Elevation Charts', 'Foundation Settlement Logs'],
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
      },
      {
        number: '06',
        title: 'Comprehensive Documentation & Executive Reporting',
        subtitle: 'Permanent Archival of Every Construction Step',
        description: 'Formal digital documentation of all site occurrences, test batches, weather logs, and engineer instructions compiled into centralized client binders.',
        deliverables: ['Monthly Comprehensive Executive Binder', 'Digital Photo & Video Archive', 'Statutory Authority Inspection Records'],
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'post-construction',
    tabLabel: 'Post-Construction (4 Stages)',
    title: 'Post-Construction, Handover & Lifetime Maintenance',
    badge: 'Phase 03: Seamless Handover',
    tagline: 'As-Built CAD/BIM Records, Structural Health Warranty & Expansion Support',
    heroImage: '/images/smart_steel_factory_1789123518500.jpg',
    description: 'Our engineering partnership extends far beyond roof sheet tightening. We deliver full as-built documentation, facility maintenance guidance, and structural warranty backing.',
    steps: [
      {
        number: '01',
        title: 'Project Closeout & Formal Handover',
        subtitle: 'Defect Liability Inspection & Keys Handover',
        description: 'Joint walkthrough with the owner’s engineering team, cataloging any punch-list items, certifying final electrical load testing, and issuing formal Certificate of Completion.',
        deliverables: ['Signed Certificate of Completion', 'Punch-List Clearance Sign-Off', 'Building Keys & Access Handover'],
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
      },
      {
        number: '02',
        title: 'As-Built Documentation & BIM Deliverables',
        subtitle: 'Exact As-Built Records for Future Maintenance',
        description: 'Handing over millimeter-accurate As-Built drawings in CAD and 3D BIM formats showing underground utility routes, anchor locations, and electrical conduits.',
        deliverables: ['As-Built Architectural & Structural CAD Sets', 'As-Built MEP Diagrams & Conduit Routes', 'Permanent Mill Test & Weld Certificates Binder'],
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
      },
      {
        number: '03',
        title: 'Client Facility Team Training & System Commissioning',
        subtitle: 'Empowering In-House Plant Managers',
        description: 'Hands-on operational training for plant engineers covering crane runway lubrications, siphonic gutter cleaning, fire pump operation, and roof sheet seal inspections.',
        deliverables: ['Operation & Maintenance (O&M) Manuals', 'Staff Training Attendance & Certification', 'Emergency Response Protocols'],
        image: '/images/smart_steel_erect_1789123548062.jpg'
      },
      {
        number: '04',
        title: 'Facility Administration Guidance & Expansion Support',
        subtitle: 'Annual Structural Health Checks & Mezzanines',
        description: 'Long-term structural warranty backing, periodic annual safety checkups, and engineering support when adding future mezzanine decks or crane upgrades.',
        deliverables: ['10-Year Structural Framing Warranty', 'Annual Health Inspection Agreement', 'Future Bay Expansion Engineering Readiness'],
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];

export const ServicesPage: React.FC = () => {
  const { currentSubPage, navigateTo } = useApp();

  // Determine active phase
  const initialPhase: 'pre-construction' | 'construction' | 'post-construction' = 
    (currentSubPage && (currentSubPage.includes('construction') && !currentSubPage.includes('pre-') && !currentSubPage.includes('post-')))
      ? 'construction'
      : (currentSubPage && currentSubPage.includes('post-construction'))
        ? 'post-construction'
        : 'pre-construction';

  const [activePhaseId, setActivePhaseId] = useState<'pre-construction' | 'construction' | 'post-construction'>(initialPhase);
  const [highlightedStage, setHighlightedStage] = useState<string | null>(null);

  useEffect(() => {
    if (!currentSubPage) return;
    
    let targetPhase: 'pre-construction' | 'construction' | 'post-construction' = 'pre-construction';
    let targetStage: string | null = null;

    if (currentSubPage.includes('post-construction')) {
      targetPhase = 'post-construction';
    } else if (currentSubPage.includes('pre-construction')) {
      targetPhase = 'pre-construction';
    } else if (currentSubPage.includes('construction')) {
      targetPhase = 'construction';
    }

    // Check if there is a stage identifier (e.g. stage-1, stage-2)
    const match = currentSubPage.match(/stage-(\d+)/i);
    if (match) {
      targetStage = `stage-${parseInt(match[1], 10)}`;
    }

    setActivePhaseId(targetPhase);

    if (targetStage) {
      setHighlightedStage(targetStage);
      const timer = setTimeout(() => {
        const el = document.getElementById(targetStage!);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);

      const clearTimer = setTimeout(() => {
        setHighlightedStage(null);
      }, 3500);

      return () => {
        clearTimeout(timer);
        clearTimeout(clearTimer);
      };
    }
  }, [currentSubPage]);

  const activePhase = servicePhases.find(p => p.id === activePhaseId) || servicePhases[0];

  const handleSelectPhase = (id: 'pre-construction' | 'construction' | 'post-construction') => {
    setActivePhaseId(id);
    navigateTo('services', id);
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
            <span className="text-white font-semibold">Services</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#e52424] font-semibold uppercase">{activePhase.tabLabel.split(' ')[0]}</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#e52424]/20 border border-[#e52424]/40 text-[#e52424] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>{activePhase.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {activePhase.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              {activePhase.tagline}
            </p>
          </div>

        </div>
      </div>

      {/* 2. PHASE SELECTOR TABS BAR (Horizontal Scroll on Mobile) */}
      <div className="sticky top-0 sm:top-14 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-2.5 no-scrollbar">
            {servicePhases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => handleSelectPhase(phase.id)}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activePhaseId === phase.id
                    ? 'bg-[#e52424] text-white shadow-sm ring-2 ring-red-500/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <span>{phase.tabLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. PHASE HERO SUMMARY CARD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 mb-8 sm:mb-10">
          <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-center space-y-3 sm:space-y-4">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#e52424]">
              Executive Overview
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {activePhase.title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed text-justify">
              {activePhase.description}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => navigateTo('contact')}
                className="w-full sm:w-auto justify-center bg-[#e52424] hover:bg-[#c91818] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Request Proposal For {activePhase.title.split(' ')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+8801679242424"
                className="w-full sm:w-auto justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#e52424]" />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 h-56 sm:h-72 lg:h-auto relative overflow-hidden bg-slate-100">
            <SafeImage
              src={activePhase.heroImage}
              alt={activePhase.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 4. DETAILED STAGES GRID */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Detailed Scope & Deliverables ({activePhase.steps.length} Stages)
            </h3>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
              BNBC 2020 Standard
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {activePhase.steps.map((step) => {
              const stageId = `stage-${parseInt(step.number, 10)}`;
              const isHighlighted = highlightedStage === stageId;

              return (
                <div
                  key={step.number}
                  id={stageId}
                  className={`bg-white rounded-xl border p-6 shadow-2xs hover:shadow-md transition-all duration-500 flex flex-col justify-between group ${
                    isHighlighted 
                      ? 'border-[#e52424] ring-4 ring-red-500/20 bg-red-50/10' 
                      : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-4">
                    
                    {/* Step Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-10 h-10 rounded-lg font-mono font-bold text-sm flex items-center justify-center transition-colors ${
                          isHighlighted ? 'bg-[#e52424] text-white' : 'bg-slate-900 group-hover:bg-[#e52424] text-white'
                        }`}>
                          {step.number}
                        </span>
                        <div>
                          <h4 className="text-base font-bold text-slate-900 group-hover:text-[#e52424] transition-colors leading-snug">
                            {step.title}
                          </h4>
                          <p className="text-xs font-semibold text-slate-500 mt-0.5">
                            {step.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Optional thumbnail */}
                    {step.image && (
                      <div className="h-44 rounded-lg overflow-hidden relative border border-slate-100 bg-slate-50">
                        <SafeImage
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Key Technical Deliverables:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {step.deliverables.map((deliv, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Smart Engineering Standard
                  </span>
                  <button
                    onClick={() => navigateTo('contact')}
                    className="text-xs font-bold uppercase text-[#e52424] hover:text-[#c91818] inline-flex items-center gap-1 group/btn"
                  >
                    <span>Inquire this stage</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
          </div>
        </div>

        {/* 5. BOTTOM TECHNICAL CONSULTATION CTA */}
        <div className="mt-14 bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight">
              Need End-to-End Execution for Your Industrial Facility?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              From land survey and soil test to heavy steel frame handover, Smart Engineering provides unified accountability.
            </p>
          </div>

          <button
            onClick={() => navigateTo('contact')}
            className="bg-[#e52424] hover:bg-[#c91818] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg transition-colors inline-flex items-center gap-2 shrink-0 shadow-lg"
          >
            <span>Speak with Chief Engineer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
