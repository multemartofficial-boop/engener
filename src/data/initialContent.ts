import { SiteContent } from '../types';
import { customerList } from './customerData';
import { mdMessageData, aboutSmartEngineeringData } from './companyInfo';

export const initialSiteContent: SiteContent = {
  home: {
    heroSlides: [
      {
        id: 'slide-1',
        title: 'Precision Industrial Steel Construction Management',
        subtitle: 'Leading turnkey design-build contractor for pre-engineered steel buildings (PEB), heavy manufacturing plants, and logistics infrastructure across Bangladesh since 2007.',
        imageUrl: '/images/smart_steel_hero_1789123504292.jpg',
        tag: 'Industrial Engineering & PEB'
      },
      {
        id: 'slide-2',
        title: 'Structural, Architectural, Electrical & Plumbing Solutions',
        subtitle: 'From digital land surveying and geotechnical soil investigation to BNBC 2020 compliant structural analysis and precision crane erection.',
        imageUrl: '/images/smart_steel_frame_1789123531862.jpg',
        tag: 'One-Stop Turnkey Capability'
      },
      {
        id: 'slide-3',
        title: '500+ Completed Projects Across Bangladesh',
        subtitle: 'Trusted by industry leaders including Bashundhara Group, BRAC, Rangs Group, Meghna Group of Industries, and Mamun Group.',
        imageUrl: '/images/smart_steel_factory_1789123518500.jpg',
        tag: 'Proven Track Record'
      }
    ],
    aboutSection: {
      tag: 'ABOUT SMART ENGINEERING',
      heading: 'Leading Design-Based Steel Building & Industrial Facility Construction Management',
      paragraph1: 'Established in 2007, Smart Engineering is a premier design-based construction management firm specializing in Pre-Engineered Steel Buildings (PEB), heavy industrial facilities, automated logistics warehouses, and turnkey factory solutions in Bangladesh.',
      paragraph2: 'With over 18 years of technical mastery, our multidisciplinary team of structural engineers, architects, MEP specialists, and erection crews deliver world-class infrastructure engineered for durability, BNBC 2020 seismic compliance, and maximum cost efficiency.',
      experienceYears: '18+',
      projectsCount: '145+',
      steelTons: '38,000+ MT',
      sqFtBuilt: '4.8M+ Sq. Ft.',
      imageUrl: '/images/smart_steel_factory_1789123518500.jpg',
      bulletPoints: [
        'End-to-end design-build turnkey construction management',
        'BNBC 2020, AISC 360, and AWS D1.1 structural compliance',
        'In-house architectural, civil, mechanical, electrical, and plumbing engineering',
        'Transparent budget estimation, fast-track scheduling, and rigorous QA/QC inspection'
      ]
    },
    whyChooseUs: [
      {
        id: 'w-1',
        title: 'Complete Turnkey Accountability',
        description: 'From soil testing and architectural design to steel fabrication, crane erection, and statutory licensing, we provide a single point of responsibility.',
        iconName: 'ShieldCheck',
        tag: 'Single-Source Delivery'
      },
      {
        id: 'w-2',
        title: 'BNBC 2020 Code Compliance',
        description: 'Engineered for Zone-2/3 seismic resilience, 160-210 km/h cyclone wind ratings, and strict fire separation safety standards.',
        iconName: 'Award',
        tag: 'Certified Safety'
      },
      {
        id: 'w-3',
        title: '40% Faster Project Erection',
        description: 'Precision off-site prefabrication and modern hydraulic crane erection significantly reduce on-site construction schedules.',
        iconName: 'Clock',
        tag: 'Rapid Deployment'
      },
      {
        id: 'w-4',
        title: 'Value Engineering & Zero Wastage',
        description: 'Optimized tapered I-beam cross sections and high-tensile Grade 50 steel save up to 25% in overall structural foundation costs.',
        iconName: 'Building2',
        tag: 'Cost Optimization'
      }
    ],
    costEstimator: {
      baseRatePerSqFt: 1150,
      foundationRatePerSqFt: 450,
      mepRatePerSqFt: 280,
      notes: 'Estimates are indicative for standard 2024–2026 industrial PEB specifications with 50mm PU sandwich roofing in Bangladesh.'
    }
  },
  mdMessage: {
    title: mdMessageData.title,
    name: mdMessageData.name,
    designation: mdMessageData.designation,
    company: mdMessageData.company,
    experience: mdMessageData.experience,
    avatarUrl: mdMessageData.avatarUrl,
    quote: 'Only efficient construction management can ensure timely completion of projects maintaining quality and safety standards, which is mandatory for sustainable industrial growth.',
    paragraphs: mdMessageData.paragraphs,
    keyHighlights: [
      '20+ Years in Industrial Construction Management',
      'Pioneer in Turnkey PEB Multi-Story Industrial Projects',
      'Member of Bangladesh National Building Code Advisory Group',
      'Successfully Delivered Over 4.8 Million Sq. Ft. of Industrial Space'
    ]
  },
  aboutPage: {
    title: aboutSmartEngineeringData.title,
    establishedYear: aboutSmartEngineeringData.establishedYear,
    totalClients: aboutSmartEngineeringData.totalClients,
    happyClients: aboutSmartEngineeringData.happyClients,
    shortIntro: aboutSmartEngineeringData.shortIntro,
    paragraphs: aboutSmartEngineeringData.fullContent,
    keyPillars: aboutSmartEngineeringData.keyPillars,
    images: aboutSmartEngineeringData.images
  },
  products: [
    {
      id: 'prod-peb',
      title: 'Pre-Engineered Steel Superstructures (PEB)',
      category: 'Structural Steel',
      description: 'Clear-span industrial factory sheds, warehouses, and logistics centers engineered with high-yield Grade 50 built-up welded I-beams and moment-resisting rigid frames.',
      imageUrl: '/images/smart_steel_frame_1789123531862.jpg',
      features: [
        'Clear spans up to 60 meters without interior columns',
        'AISC 360 & BNBC 2020 structural design compliance',
        'Epoxy primer with high-durability polyurethane topcoat',
        'Custom overhead crane gantry runway beam integration'
      ],
      badge: 'Core Specialty'
    },
    {
      id: 'prod-roofing',
      title: 'Insulated Sandwich Panels & Metal Roofing',
      category: 'Roofing & Cladding',
      description: 'Polyurethane (PU) and Polyisocyanurate (PIR) insulated sandwich roof and wall panels providing superior thermal efficiency and sound attenuation.',
      imageUrl: '/images/smart_steel_factory_1789123518500.jpg',
      features: [
        '50mm to 100mm high-density thermal core',
        'Concealed fastener interlocking leak-proof system',
        'Class-1 fire retardant core certification',
        'High UV resistance with Alu-Zinc protective coating'
      ],
      badge: 'High Efficiency'
    },
    {
      id: 'prod-purlin',
      title: 'Galvanized Z & C Cold-Formed Purlins',
      category: 'Secondary Steel',
      description: 'High-strength cold-formed galvanized Z and C sections for secondary structural roof and wall purlins with pre-punched holes for fast bolting.',
      imageUrl: '/images/smart_steel_erect_1789123548062.jpg',
      features: [
        '275 GSM high-grade hot-dip zinc coating',
        'Yield strength of 345 MPa (50 ksi)',
        'Continuous overlap design for maximum stiffness',
        'Corrosion resistant for coastal and humid environments'
      ]
    },
    {
      id: 'prod-deck',
      title: 'Composite Floor Decking Sheets',
      category: 'Floor Systems',
      description: 'Galvanized trapezoidal profile metal decking acting as permanent formwork and composite tensile reinforcement for concrete slab floors.',
      imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      features: [
        'Eliminates temporary props and wooden shuttering',
        '40% faster multi-story construction progress',
        'Embossed ribs ensure composite bond with concrete',
        'Heavy live load capacity for warehouse mezzanines'
      ]
    },
    {
      id: 'prod-survey',
      title: 'Digital Land Surveying & Drone Topography',
      category: 'Pre-Construction',
      description: 'High-precision digital land surveying using Total Station and RTK GPS drones to establish accurate site boundaries, contours, and grading levels.',
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      features: [
        'Sub-centimeter contour mapping and boundary demarcation',
        'Cut-and-fill earthwork volume calculation',
        'Digital elevation models (DEM) for flood elevation analysis',
        'GIS-compatible CAD/BIM deliverables'
      ]
    },
    {
      id: 'prod-soil',
      title: 'Geotechnical Soil Testing & Pile Foundation',
      category: 'Civil & Foundation',
      description: 'Comprehensive subsurface soil borehole investigation, standard penetration test (SPT), and cast-in-situ bored pile engineering.',
      imageUrl: '/images/smart_steel_hero_1789123504292.jpg',
      features: [
        'Borehole exploration up to 45 meters depth',
        'Safe bearing capacity (SBC) computation',
        'Seismic liquefaction hazard assessment',
        'Cast-in-situ and pre-cast concrete piling oversight'
      ]
    },
    {
      id: 'prod-licenses',
      title: 'Statutory Permitting & Industrial Licensing',
      category: 'Consultancy',
      description: 'End-to-end liaison and approvals for RAJUK, Fire Service & Civil Defence, Department of Environment (DoE), and Factory Directorate licenses.',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      features: [
        'RAJUK / CDA / Local municipality building permit approvals',
        'Fire safety plan certification and hydrant layout design',
        'Environmental Clearance Certificate (ECC) documentation',
        'Department of Inspection for Factories and Establishments (DIFE)'
      ]
    }
  ],
  customers: {
    title: 'Trusted by 50+ Premier Industrial Clients',
    description: 'We have had the privilege to deliver heavy industrial factories, composite spinning mills, and logistics hubs for Bangladesh\'s most respected business conglomerates.',
    items: customerList.slice(0, 15).map(c => ({
      ...c,
      logoUrl: '',
      featured: true
    }))
  },
  contact: {
    headOfficeAddress: 'Suite # 301 (3rd Floor), 65 Elephant Road, Dhaka-1205, Bangladesh',
    factoryAddress: 'Plot # 14-18, Steel Industrial Zone, Meghnaghat, Narayanganj',
    phone: '+880 1679-242424',
    phoneSecondary: '+880 1711-889922',
    hotline: '16224',
    email: 'contact@smartengineering-bd.com',
    emailSupport: 'info@smartengineering-bd.com',
    businessHours: 'Saturday – Thursday: 9:00 AM – 6:30 PM (Friday Closed)',
    googleMapsUrl: 'https://maps.google.com/maps?q=Elephant%20Road,%20Dhaka,%20Bangladesh&t=&z=14&ie=UTF8&iwloc=&output=embed',
    whatsappNumber: '+8801679242424'
  }
};
