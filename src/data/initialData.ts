import { MenuItem, Project, GalleryItem, ServiceItem, InquiryForm, CompanySettings } from '../types';

export const initialCompanySettings: CompanySettings = {
  companyName: 'Smart Engineering BD',
  tagline: 'Design-Build Steel Building Construction Management in Bangladesh',
  shortBio: 'Established in 2007, Smart Engineering is a premier design-based industrial construction management firm in Bangladesh specializing in Pre-Engineered Steel Buildings (PEB), heavy industrial facilities, automated logistics warehouses, and turnkey factory solutions.',
  foundedYear: '2007',
  phone: '+880 1679-242424',
  phoneSecondary: '+880 1711-889922',
  email: 'contact@smartengineering-bd.com',
  address: 'Suite # 301 (3rd Floor), 65 Elephant Road',
  city: 'Dhaka-1205, Bangladesh',
  businessHours: 'Sat - Thu: 9:00 AM - 6:30 PM (Friday Closed)',
  completedProjectsCount: 145,
  totalSqFtBuilt: '4.8M+ Sq. Ft.',
  steelFabricatedTons: '38,000+ MT',
  clientSatisfactionRate: '99.4%'
};

export const initialNavMenus: MenuItem[] = [
  {
    id: 'menu-home',
    label: 'HOME',
    href: '#home',
    order: 1
  },
  {
    id: 'menu-md-message',
    label: 'MESSAGE OF MD',
    href: '#md-message',
    order: 2
  },
  {
    id: 'menu-services',
    label: 'SERVICES',
    href: '#services',
    order: 3,
    children: [
      {
        id: 'sub-srv-pre',
        label: 'PRE-CONSTRUCTION WORK',
        href: '#services/pre-construction',
        order: 1,
        children: [
          { id: 'ss-consult', label: 'INITIAL PROJECT CONSULTATION & SCOPE DEFINITION', href: '#services/pre-construction/stage-1', order: 1 },
          { id: 'ss-survey', label: 'DIGITAL LAND SURVEYING', href: '#services/pre-construction/stage-2', order: 2 },
          { id: 'ss-soil', label: 'GEOTECHNICAL SOIL TEST', href: '#services/pre-construction/stage-3', order: 3 },
          { id: 'ss-layout', label: 'CONCEPTUAL & LAYOUT PLAN', href: '#services/pre-construction/stage-4', order: 4 },
          { id: 'ss-arch', label: 'ARCHITECTURAL & ENGINEERING DESIGN', href: '#services/pre-construction/stage-5', order: 5 },
          { id: 'ss-3d', label: '3D ANIMATION & VISUALIZATION', href: '#services/pre-construction/stage-6', order: 6 },
          { id: 'ss-cost', label: 'COST ESTIMATION & BUDGETING', href: '#services/pre-construction/stage-7', order: 7 },
          { id: 'ss-permit', label: 'PERMITTING AND REGULATORY APPROVALS', href: '#services/pre-construction/stage-8', order: 8 },
          { id: 'ss-sched', label: 'SCHEDULING & PROCUREMENT PLANNING', href: '#services/pre-construction/stage-9', order: 9 },
          { id: 'ss-final', label: 'FINAL PRE-CONSTRUCTION MEETING', href: '#services/pre-construction/stage-10', order: 10 }
        ]
      },
      {
        id: 'sub-srv-const',
        label: 'CONSTRUCTION',
        href: '#services/construction',
        order: 2,
        children: [
          { id: 'ss-c-progress', label: 'PROGRESS AND SCHEDULE MONITORING', href: '#services/construction/stage-1', order: 1 },
          { id: 'ss-c-qa', label: 'QUALITY ASSURANCE AND QUALITY CONTROL (QA/QC)', href: '#services/construction/stage-2', order: 2 },
          { id: 'ss-c-hse', label: 'HEALTH, SAFETY, AND ENVIRONMENTAL (HSE) MONITORING', href: '#services/construction/stage-3', order: 3 },
          { id: 'ss-c-cost', label: 'FINANCIAL AND COST OVERSIGHT', href: '#services/construction/stage-4', order: 4 },
          { id: 'ss-c-struct', label: 'STRUCTURAL AND SITE CONDITIONS MONITORING', href: '#services/construction/stage-5', order: 5 },
          { id: 'ss-c-doc', label: 'DOCUMENTATION AND REPORTING', href: '#services/construction/stage-6', order: 6 }
        ]
      },
      {
        id: 'sub-srv-post',
        label: 'POST-CONSTRUCTION',
        href: '#services/post-construction',
        order: 3,
        children: [
          { id: 'ss-p-close', label: 'PROJECT CLOSEOUT AND HANDOVER', href: '#services/post-construction/stage-1', order: 1 },
          { id: 'ss-p-doc', label: 'DOCUMENTATION AND DELIVERABLES', href: '#services/post-construction/stage-2', order: 2 },
          { id: 'ss-p-train', label: 'CLIENT TRAINING AND SYSTEM COMMISSIONING', href: '#services/post-construction/stage-3', order: 3 },
          { id: 'ss-p-admin', label: 'FACILITY ADMINISTRATION AND MAINTENANCE', href: '#services/post-construction/stage-4', order: 4 }
        ]
      }
    ]
  },
  {
    id: 'menu-products',
    label: 'Products',
    href: '#products',
    order: 4,
    children: [
      { id: 'prod-survey', label: 'DIGITAL LAND SURVEYING', href: '#products/prod-survey', order: 1 },
      { id: 'prod-discuss', label: 'CONCEPTUAL DISCUSSION WITH CLIENTS', href: '#products/prod-discuss', order: 2 },
      { id: 'prod-layout', label: 'CONCEPTUAL & LAYOUT PLAN', href: '#products/prod-layout', order: 3 },
      { id: 'prod-cost', label: 'COST ESTIMATION & BUDGETING', href: '#products/prod-cost', order: 4 },
      { id: 'prod-soil', label: 'GEOTECHNICAL SOIL TEST', href: '#products/prod-soil', order: 5 },
      { id: 'prod-loan', label: 'BANK LOAN PROCESSING SUPPORT', href: '#products/prod-loan', order: 6 },
      { 
        id: 'prod-arch', 
        label: 'ARCHITECTURAL & ENGINEERING DESIGN', 
        href: '#products/prod-arch', 
        order: 7,
        children: [
          { id: 'prod-arch-d', label: 'ARCHITECTURAL DESIGN', href: '#products/prod-arch-d', order: 1 },
          { id: 'prod-arch-s', label: 'STRUCTURAL DESIGN (CIVIL & STEEL)', href: '#products/prod-arch-s', order: 2 },
          { id: 'prod-arch-e', label: 'ELECTRICAL DESIGN', href: '#products/prod-arch-e', order: 3 },
          { id: 'prod-arch-p', label: 'PLUMBING DESIGN', href: '#products/prod-arch-p', order: 4 }
        ]
      },
      { id: 'prod-mon', label: 'CONSTRUCTION MONITORING & SUPERVISION', href: '#products/prod-mon', order: 8 },
      { id: 'prod-piling', label: 'PILING', href: '#products/prod-piling', order: 9 },
      { id: 'prod-approval', label: 'PLAN APPROVAL SUPPORT', href: '#products/prod-approval', order: 10 },
      { id: 'prod-fire', label: 'FIRE LICENSE', href: '#products/prod-fire', order: 11 },
      { id: 'prod-factory', label: 'FACTORY LICENSE', href: '#products/prod-factory', order: 12 },
      { id: 'prod-env', label: 'ENVIRONMENTAL LICENSE', href: '#products/prod-env', order: 13 }
    ]
  },
  {
    id: 'menu-customers',
    label: 'CUSTOMERS',
    href: '#customers',
    order: 5
  },
  {
    id: 'menu-projects',
    label: 'PROJECTS',
    href: '#projects',
    order: 6
  },
  {
    id: 'menu-about',
    label: 'ABOUT US',
    href: '#about',
    order: 7
  },
  {
    id: 'menu-contact',
    label: 'CONTACT US',
    href: '#contact',
    order: 8
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Apex Composite Textile Spinning Mill',
    category: 'industrial',
    categoryLabel: 'Industrial Manufacturing',
    client: 'Apex Group Bangladesh',
    location: 'Kashimpur, Gazipur',
    coveredArea: '185,000 Sq. Ft.',
    steelTonnage: '920 Metric Tons',
    year: '2024',
    status: 'Completed',
    description: 'Turnkey pre-engineered steel superstructure featuring a 54-meter clear-span design without internal columns, optimized for modern high-speed spinning machinery, centralized HVAC ducting, and dust filtration shafts.',
    imageUrl: '/images/smart_steel_factory_1789123518500.jpg',
    scope: [
      'Digital Land Surveying & Soil Bearing Capacity Testing',
      'Structural Analysis with Seismic Zone-2 & 160 km/h Wind Load Rating',
      'Fabrication of High-Yield Built-up Welded I-Beams (Grade 50)',
      'Installation of 50mm Polyurethane (PU) Insulated Sandwich Roofing',
      'Fire-Rated Steel Framing & Smoke Exhaust System'
    ],
    featured: true
  },
  {
    id: 'proj-2',
    title: 'Akij Mega Logistics & E-Commerce Fulfillment Hub',
    category: 'warehouse',
    categoryLabel: 'Warehouses & Logistics',
    client: 'Akij Logistics Ltd.',
    location: 'Hemayetpur, Savar, Dhaka',
    coveredArea: '240,000 Sq. Ft.',
    steelTonnage: '1,250 Metric Tons',
    year: '2023',
    status: 'Completed',
    description: 'State-of-the-art heavy structural steel distribution depot with 12-meter clear internal eaves height, 28 hydraulic loading dock bays, and laser-screed floor slabs for automated racking systems.',
    imageUrl: '/images/smart_steel_frame_1789123531862.jpg',
    scope: [
      'High-Bay Automated Storage & Retrieval Racking Integration',
      'Continuous Ridge Ventilators & Polycarbonate Daylighting Skylights',
      'Structural Steel Truss Framing with 40-meter Main Spans',
      'Anti-Corrosive Epoxy Primer & Polyurethane Finish Coating',
      'Heavy-Duty Rainwater Siphonic Drainage Engineering'
    ],
    featured: true
  },
  {
    id: 'proj-3',
    title: 'Meghna Heavy Industrial Auto Workshop & Assembly Plant',
    category: 'industrial',
    categoryLabel: 'Industrial Manufacturing',
    client: 'Meghna Industrial Hub',
    location: 'Meghnaghat, Narayanganj',
    coveredArea: '130,000 Sq. Ft.',
    steelTonnage: '840 Metric Tons',
    year: '2024',
    status: 'Completed',
    description: 'Heavy industrial manufacturing facility engineered with dual 20-ton overhead crane runway beams, mezzanine office structure, and acoustic wall panels.',
    imageUrl: '/images/smart_steel_hero_1789123504292.jpg',
    scope: [
      'Overhead Crane Gantry Beam Design (2x 20-Ton Capacities)',
      'Heavy RCC Pedestal Foundations with Anchor Bolt Tension Testing',
      'Mezzanine Steel Deck with 75mm Cast-in-place Concrete Floor',
      'Full Compliance with BNBC 2020 and AISC Standards'
    ],
    featured: true
  },
  {
    id: 'proj-4',
    title: 'Pran-RFL Automated Cold Chain Depot & Logistics Shed',
    category: 'agro',
    categoryLabel: 'Agro & Cold Storage',
    client: 'Pran-RFL Group',
    location: 'Shayestaganj, Habiganj',
    coveredArea: '95,000 Sq. Ft.',
    steelTonnage: '480 Metric Tons',
    year: '2023',
    status: 'Completed',
    description: 'Precision thermal-insulated pre-engineered cold warehouse maintainable down to -25°C. Structural steel frame completely decoupled from thermal bridging.',
    imageUrl: '/images/smart_steel_erect_1789123548062.jpg',
    scope: [
      'PIR Core 100mm Cold Storage Cladding Integration',
      'Under-floor Sub-base Ventilation Against Frost Heave',
      'Galvanized Z & C Cold-Formed Purlins (275 GSM Zinc Coating)',
      'Comprehensive Handover with As-Built BIM Documentation'
    ],
    featured: false
  },
  {
    id: 'proj-5',
    title: 'Bengal Commercial Tower & Multi-Story Steel Plaza',
    category: 'multistory',
    categoryLabel: 'Commercial & Multi-Story',
    client: 'Bengal Urban Developers',
    location: 'Tejgaon I/A, Dhaka',
    coveredArea: '160,000 Sq. Ft.',
    steelTonnage: '1,100 Metric Tons',
    year: '2024',
    status: 'Ongoing',
    description: 'G+8 multi-story composite structural steel commercial building in Dhaka featuring composite steel columns, metal decking, and curtain-wall glass facade support.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    scope: [
      'Composite Steel-Concrete Moment-Resisting Frame (SMRF)',
      'Ultra-Fast Erection Pace (40% faster than conventional RCC)',
      'Intumescent Fire-Proofing Paint Coating (2-Hour Fire Rating)',
      'Complete RAJUK Special Project Clearance'
    ],
    featured: false
  },
  {
    id: 'proj-6',
    title: 'Mirsharai SEZ Heavy Machine Tool Foundry',
    category: 'ongoing',
    categoryLabel: 'Active Sites',
    client: 'Bangabandhu Hi-Tech Steel Industries',
    location: 'BSMSN Economic Zone, Mirsharai, Chattogram',
    coveredArea: '310,000 Sq. Ft.',
    steelTonnage: '2,150 Metric Tons',
    year: '2025',
    status: 'Ongoing',
    description: 'Massive heavy fabrication facility in Bangladesh’s largest economic zone. Engineered to resist 220 km/h coastal cyclonic gusts with high-grade marine anti-corrosion coating.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    scope: [
      'Coastal Marine Salt-Spray Resistant 3-Coat Paint System',
      'Foundation Deep-Piling Civil Coordination',
      '40-Ton Heavy Duty Gantry Cranes Structure',
      'Real-Time Weekly Drone Video Monitoring for Client'
    ],
    featured: true
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'High-Elevation Structural Steel Truss Erection',
    category: 'erection',
    categoryLabel: 'Steel Erection',
    imageUrl: '/images/smart_steel_hero_1789123504292.jpg',
    caption: 'Tandem mobile crane lift for a 48m span roof girder during sunset at Narayanganj site.',
    altText: 'Heavy pre-engineered steel truss erection by Smart Engineering in Bangladesh',
    date: 'February 2024'
  },
  {
    id: 'gal-2',
    title: 'Completed Industrial Plant Cladding & Modern Facade',
    category: 'factory',
    categoryLabel: 'Completed Facilities',
    imageUrl: '/images/smart_steel_factory_1789123518500.jpg',
    caption: 'Modern architectural aesthetics combined with thermally efficient insulated sandwich panels.',
    altText: 'Modern industrial steel factory exterior building in Gazipur Bangladesh',
    date: 'January 2024'
  },
  {
    id: 'gal-3',
    title: 'Spacious Clear-Span Internal Warehouse Space',
    category: 'framing',
    categoryLabel: 'Steel Frameworks',
    imageUrl: '/images/smart_steel_frame_1789123531862.jpg',
    caption: 'Unobstructed internal floor layout enabling continuous high-speed forklift traffic.',
    altText: 'Interior view of pre-engineered steel warehouse framing and crane rails',
    date: 'November 2023'
  },
  {
    id: 'gal-4',
    title: 'High-Tensile Bolted Column-Rafter Moment Connection',
    category: 'erection',
    categoryLabel: 'Steel Erection',
    imageUrl: '/images/smart_steel_erect_1789123548062.jpg',
    caption: 'Engineers performing torque calibration check on Grade 8.8 structural bolts.',
    altText: 'Site engineers verifying structural steel bolted joints and quality compliance',
    date: 'March 2024'
  },
  {
    id: 'gal-5',
    title: 'Architectural Steel Framework Alignment Inspection',
    category: 'framing',
    categoryLabel: 'Steel Frameworks',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80',
    caption: 'Precision optical laser leveling of crane runway beams and vertical plumb lines.',
    altText: 'Industrial steel frame laser alignment and leveling during installation',
    date: 'December 2023'
  },
  {
    id: 'gal-6',
    title: 'Tekla 3D BIM Detailing & Erection Simulation',
    category: 'visualization',
    categoryLabel: '3D BIM Visualization',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    caption: 'Millimeter-accurate shop drawings and automated CNC cutting nesting before steel fabrication.',
    altText: '3D BIM computer model for structural steel building pre-construction',
    date: 'October 2023'
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-pre',
    phase: 'pre-construction',
    title: 'Pre-Construction Engineering',
    tagline: 'Precision Planning, Land Survey, Architectural & Structural Design',
    description: 'Before breaking ground, Smart Engineering eliminates project risks through rigorous geotechnical soil testing, BNBC structural engineering, 3D BIM visualization, and accurate BOQ costing.',
    iconName: 'Compass',
    keyDeliverables: [
      'Digital Total Station & Drone Land Surveying',
      'Geotechnical Soil Investigation & Boring Reports',
      'Structural Analysis with ETABS & STAAD.Pro (Wind & Seismic)',
      '3D Architectural Animation, BIM & Tekla Connection Detailing',
      'Accurate Material Take-Off & Itemized BOQ Cost Estimation',
      'Permitting: RAJUK, CDA, Fire Safety & Environmental Clearances'
    ],
    subServices: [
      {
        name: 'Land Survey & Geotechnical Soil Investigation',
        description: 'Comprehensive digital contour surveying, borehole soil extraction, SPT value testing, and sub-soil bearing capacity analysis to engineer foundation safety.'
      },
      {
        name: 'Architectural & PEB Structural Design',
        description: 'Complete layout optimization for manufacturing workflows, compliant with the Bangladesh National Building Code (BNBC) and international AISC standards.'
      },
      {
        name: 'BOQ Costing & Tendering Assistance',
        description: 'Transparent quantity estimations, mill-direct structural steel procurement strategies, and tender evaluation to ensure zero budget overruns.'
      }
    ]
  },
  {
    id: 'srv-construction',
    phase: 'construction',
    title: 'Construction, Fabrication & Monitoring',
    tagline: 'In-House Steel Fabrication, Heavy Erection & Quality Oversight',
    description: 'We turn engineering drawings into reality with certified welding, rapid on-site crane erection, civil foundations, and daily QA/QC inspection protocols.',
    iconName: 'HardHat',
    keyDeliverables: [
      'CNC Plasma Plate Cutting & Submerged Arc Welding (SAW)',
      'Sandblasting (SA 2.5) & High-Performance Anti-Corrosive Coating',
      'High-Tensile Grade 8.8 / 10.9 Bolted Erection via Mobile Cranes',
      'Laser-Guided Civil Flooring & Heavy Machine Foundation Pedestals',
      'Full QA/QC: Ultrasonic Testing (UT) & Radiographic Weld Checks',
      'Strict HSE (Health, Safety & Environment) Site Management'
    ],
    subServices: [
      {
        name: 'PEB Steel Fabrication & Assembly',
        description: 'High-strength Grade 50 structural steel fabrication, automated welding lines, and rigorous dimensional tolerance verifications.'
      },
      {
        name: 'Site Erection & Crane Rigging',
        description: 'Trained erection crews, heavy hydraulic mobile cranes, and fall-arrest safety netting delivering swift assembly up to 40% faster than concrete.'
      },
      {
        name: 'Civil Works & Floor Slabs',
        description: 'High-load bearing concrete footings, grade beams, stub columns, and tremix hard-wearing industrial floorings.'
      }
    ]
  },
  {
    id: 'srv-post',
    phase: 'post-construction',
    title: 'Post-Construction & Handover',
    tagline: 'Commissioning, Documentation, Maintenance & Retrofits',
    description: 'Our relationship does not stop at handover. We provide comprehensive as-built records, facility maintenance manuals, and warranty backing for your steel structure.',
    iconName: 'CheckCircle2',
    keyDeliverables: [
      'Full Project Handover Documentation & As-Built CAD/BIM Models',
      'Load Testing & Structural Integrity Certification',
      'Client Facility Team Training & Maintenance Checklists',
      'Warranty Backing on Structural Framing & Roof Sheet Claddings',
      'Periodic Annual Structural Health Inspections & Expansion Support'
    ],
    subServices: [
      {
        name: 'Project Handover & As-Built Records',
        description: 'Complete handover binder containing mill test certificates, weld test logs, electrical/plumbing diagrams, and as-built drawings.'
      },
      {
        name: 'Facility Administration Guidance',
        description: 'Maintenance schedules for roof gutters, siphonic downspouts, fasteners, and protective coatings to ensure 50+ year structural lifespans.'
      },
      {
        name: 'Expansion & Structural Retrofitting',
        description: 'Engineered mezzanine additions, overhead crane upgrades, and bay extensions as your production volume expands.'
      }
    ]
  }
];

export const initialInquiries: InquiryForm[] = [
  {
    id: 'inq-101',
    fullName: 'Engr. Mahbubur Rahman',
    email: 'm.rahman@dhakaindustries.com.bd',
    phone: '+880 1712-459821',
    companyName: 'Dhaka Composite Mills Ltd.',
    projectType: 'Industrial Manufacturing Plant',
    location: 'Kaliakair, Gazipur',
    estimatedArea: '120,000 Sq. Ft.',
    timeline: 'Within 3 Months',
    message: 'We require a turnkey steel building proposal for our new knitting and dyeing shed. Needs 10-ton overhead crane support and 35m clear span.',
    createdAt: '2026-09-08T10:15:00Z',
    status: 'In Review',
    notes: 'Called client. Sent preliminary questionnaire for soil data and machinery layout.'
  },
  {
    id: 'inq-102',
    fullName: 'Tanvir Hossain',
    email: 'tanvir@greenlogistic-bd.com',
    phone: '+880 1819-332211',
    companyName: 'Green Logistics BD',
    projectType: 'Warehouse & Logistics Hub',
    location: 'Narayanganj',
    estimatedArea: '80,000 Sq. Ft.',
    timeline: 'Immediate (1-2 Months)',
    message: 'Looking for fast PEB warehouse construction with high eave height (minimum 32 feet) for automated pallet racking.',
    createdAt: '2026-09-10T14:30:00Z',
    status: 'New',
    notes: 'Urgent requirement. Assigned to chief estimating engineer.'
  },
  {
    id: 'inq-103',
    fullName: 'Dr. Kabir Ahmed',
    email: 'kabir@agrofuture.org',
    phone: '+880 1911-665544',
    companyName: 'Agro Future Feed & Seeds',
    projectType: 'Agro & Cold Storage Facility',
    location: 'Sherpur, Bogura',
    estimatedArea: '45,000 Sq. Ft.',
    timeline: '6 Months',
    message: 'We want structural steel design and supply for animal feed plant tower and adjacent storage warehouse.',
    createdAt: '2026-09-05T09:00:00Z',
    status: 'Quoted',
    notes: 'Formal BOQ quote #SE-2026-089 sent via email on Sept 7.'
  }
];
