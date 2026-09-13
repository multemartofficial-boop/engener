export type PageRoute = 
  | 'home'
  | 'md-message'
  | 'services'
  | 'products'
  | 'customers'
  | 'projects'
  | 'about'
  | 'contact'
  | 'admin';

export interface SubSubMenuItem {
  id: string;
  label: string;
  href: string;
  order: number;
}

export interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  order: number;
  children?: SubSubMenuItem[];
}

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  order: number;
  badge?: string;
  children?: SubMenuItem[];
}

export type ProjectCategory = 
  | 'all'
  | 'industrial'
  | 'warehouse'
  | 'commercial'
  | 'agro'
  | 'multistory'
  | 'ongoing';

export interface Project {
  id: string;
  title: string;
  category: 'industrial' | 'warehouse' | 'commercial' | 'agro' | 'multistory' | 'ongoing';
  categoryLabel: string;
  client: string;
  location: string;
  coveredArea: string;
  steelTonnage: string;
  year: string;
  status: 'Completed' | 'Ongoing';
  description: string;
  imageUrl: string;
  additionalImages?: string[];
  scope: string[];
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'erection' | 'factory' | 'framing' | 'visualization';
  categoryLabel: string;
  imageUrl: string;
  caption: string;
  altText: string;
  date: string;
}

export interface ServiceItem {
  id: string;
  phase: 'pre-construction' | 'construction' | 'post-construction';
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  keyDeliverables: string[];
  subServices: {
    name: string;
    description: string;
    details?: string[];
  }[];
}

export interface InquiryForm {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  projectType: string;
  location: string;
  estimatedArea?: string;
  timeline?: string;
  message: string;
  createdAt: string;
  status: 'New' | 'In Review' | 'Contacted' | 'Quoted' | 'Archived';
  notes?: string;
}

export interface CompanySettings {
  companyName: string;
  tagline: string;
  shortBio: string;
  foundedYear: string;
  phone: string;
  phoneSecondary: string;
  email: string;
  address: string;
  city: string;
  businessHours: string;
  completedProjectsCount: number;
  totalSqFtBuilt: string;
  steelFabricatedTons: string;
  clientSatisfactionRate: string;
}

export interface CustomerItem {
  id: string;
  name: string;
  group?: string;
  location: string;
  category: 'Textile & Garments' | 'Packaging & Flexipack' | 'Jute & Carpet' | 'Agro & Feed Mills' | 'Food & Beverage' | 'Petroleum & Industrial' | 'Ceramics & Building Materials' | string;
  logoUrl?: string;
  featured?: boolean;
}

export interface SiteHeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  tag: string;
}

export interface SiteHomeAbout {
  tag: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  experienceYears: string;
  projectsCount: string;
  steelTons: string;
  sqFtBuilt: string;
  imageUrl: string;
  bulletPoints: string[];
}

export interface SiteWhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tag: string;
}

export interface SiteCostEstimatorSettings {
  baseRatePerSqFt: number;
  foundationRatePerSqFt: number;
  mepRatePerSqFt: number;
  notes: string;
}

export interface SiteMDMessage {
  title: string;
  name: string;
  designation: string;
  company: string;
  experience: string;
  avatarUrl: string;
  quote: string;
  paragraphs: string[];
  keyHighlights: string[];
}

export interface SiteAboutPage {
  title: string;
  establishedYear: string;
  totalClients: string;
  happyClients: string;
  shortIntro: string;
  paragraphs: string[];
  keyPillars: string[];
  images: string[];
}

export interface SiteProductItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  features: string[];
  badge?: string;
}

export interface SiteContactInfo {
  headOfficeAddress: string;
  factoryAddress: string;
  phone: string;
  phoneSecondary: string;
  hotline: string;
  email: string;
  emailSupport: string;
  businessHours: string;
  googleMapsUrl: string;
  whatsappNumber: string;
}

export interface SiteContent {
  home: {
    heroSlides: SiteHeroSlide[];
    aboutSection: SiteHomeAbout;
    whyChooseUs: SiteWhyChooseUsItem[];
    costEstimator: SiteCostEstimatorSettings;
  };
  mdMessage: SiteMDMessage;
  aboutPage: SiteAboutPage;
  products: SiteProductItem[];
  customers: {
    title: string;
    description: string;
    items: CustomerItem[];
  };
  contact: SiteContactInfo;
}
