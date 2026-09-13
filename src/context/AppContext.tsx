import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  MenuItem, 
  SubMenuItem, 
  SubSubMenuItem, 
  Project, 
  GalleryItem, 
  ServiceItem, 
  InquiryForm, 
  CompanySettings,
  PageRoute,
  SiteContent
} from '../types';
import { 
  initialNavMenus, 
  initialProjects, 
  initialGallery, 
  initialServices, 
  initialInquiries, 
  initialCompanySettings 
} from '../data/initialData';
import { initialSiteContent } from '../data/initialContent';

interface AppContextType {
  currentPage: PageRoute;
  currentSubPage?: string;
  navigateTo: (page: PageRoute | string, subPage?: string) => void;
  menus: MenuItem[];
  projects: Project[];
  gallery: GalleryItem[];
  services: ServiceItem[];
  inquiries: InquiryForm[];
  settings: CompanySettings;
  siteContent: SiteContent;
  updateSiteContent: (newContent: Partial<SiteContent>) => void;
  resetSiteContent: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  selectedProject: Project | null;
  setSelectedProject: (proj: Project | null) => void;
  selectedGalleryItem: GalleryItem | null;
  setSelectedGalleryItem: (item: GalleryItem | null) => void;
  isMDMessageOpen: boolean;
  setIsMDMessageOpen: (open: boolean) => void;
  isCustomersOpen: boolean;
  setIsCustomersOpen: (open: boolean) => void;
  isAboutOpen: boolean;
  setIsAboutOpen: (open: boolean) => void;
  activeServiceDetail: { title: string; subtitle?: string; items?: string[]; description?: string } | null;
  setActiveServiceDetail: (detail: { title: string; subtitle?: string; items?: string[]; description?: string } | null) => void;
  
  // Menu Management
  addMainMenu: (menu: Omit<MenuItem, 'id'>) => void;
  editMainMenu: (id: string, updated: Partial<MenuItem>) => void;
  deleteMainMenu: (id: string) => void;
  
  addSubMenu: (parentId: string, subMenu: Omit<SubMenuItem, 'id'>) => void;
  editSubMenu: (parentId: string, subId: string, updated: Partial<SubMenuItem>) => void;
  deleteSubMenu: (parentId: string, subId: string) => void;
  
  addSubSubMenu: (parentId: string, subId: string, subSubMenu: Omit<SubSubMenuItem, 'id'>) => void;
  editSubSubMenu: (parentId: string, subId: string, subSubId: string, updated: Partial<SubSubMenuItem>) => void;
  deleteSubSubMenu: (parentId: string, subId: string, subSubId: string) => void;
  
  // Project Management
  addProject: (project: Omit<Project, 'id'>) => void;
  editProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Gallery Management
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  editGalleryItem: (id: string, updated: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  
  // Inquiry Management
  submitInquiry: (formData: Omit<InquiryForm, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: InquiryForm['status'], notes?: string) => void;
  deleteInquiry: (id: string) => void;
  
  // Settings Management
  updateSettings: (updated: Partial<CompanySettings>) => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MENUS: 'smart_steel_menus_v2',
  PROJECTS: 'smart_steel_projects_v2',
  GALLERY: 'smart_steel_gallery_v2',
  INQUIRIES: 'smart_steel_inquiries_v2',
  SETTINGS: 'smart_steel_settings_v2',
  CONTENT: 'smart_steel_site_content_v2'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTENT);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.home && parsed.home.heroSlides) {
          return parsed;
        }
      }
      return initialSiteContent;
    } catch {
      return initialSiteContent;
    }
  });

  const updateSiteContent = useCallback((newContent: Partial<SiteContent>) => {
    setSiteContent(prev => {
      const updated = { ...prev, ...newContent };
      try {
        localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(updated));
      } catch (err) {
        console.warn('Failed to save site content to localStorage:', err);
      }
      return updated;
    });
  }, []);

  const resetSiteContent = useCallback(() => {
    setSiteContent(initialSiteContent);
    try {
      localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(initialSiteContent));
    } catch (err) {
      console.warn('Failed to reset site content:', err);
    }
  }, []);

  const [menus, setMenus] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENUS);
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasContact = parsed.some((m: MenuItem) => m.label && m.label.toUpperCase().includes('CONTACT'));
        if (hasContact && parsed.length >= 8) {
          return parsed;
        }
      }
      return initialNavMenus;
    } catch {
      return initialNavMenus;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return saved ? JSON.parse(saved) : initialGallery;
    } catch {
      return initialGallery;
    }
  });

  const [services] = useState<ServiceItem[]>(initialServices);

  const [inquiries, setInquiries] = useState<InquiryForm[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : initialInquiries;
    } catch {
      return initialInquiries;
    }
  });

  const [settings, setSettings] = useState<CompanySettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : initialCompanySettings;
    } catch {
      return initialCompanySettings;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [isMDMessageOpen, setIsMDMessageOpen] = useState<boolean>(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [activeServiceDetail, setActiveServiceDetail] = useState<{ title: string; subtitle?: string; items?: string[]; description?: string } | null>(null);

  // Parse initial page route from URL hash
  const parseRouteFromHash = (): { page: PageRoute; subPage?: string } => {
    if (typeof window === 'undefined') return { page: 'home' };
    const hash = window.location.hash.replace(/^#\/?/, '').trim();
    if (!hash) return { page: 'home' };
    const parts = hash.split('/');
    const rawPage = parts[0].toLowerCase();
    const validPages: PageRoute[] = ['home', 'md-message', 'services', 'products', 'customers', 'projects', 'about', 'contact', 'admin'];
    
    // Check aliases
    if (rawPage === 'md' || rawPage === 'message') return { page: 'md-message' };
    if (rawPage === 'customer' || rawPage === 'clients') return { page: 'customers' };
    if (rawPage === 'project' || rawPage === 'portfolio') return { page: 'projects' };
    if (rawPage === 'service') return { page: 'services', subPage: parts[1] };
    if (rawPage === 'product') return { page: 'products', subPage: parts[1] };
    if (rawPage === 'admin' || rawPage === 'login' || rawPage === 'dashboard') return { page: 'admin', subPage: parts[1] };

    const page = validPages.includes(rawPage as PageRoute) ? (rawPage as PageRoute) : 'home';
    const sub = parts.slice(1).join('/');
    return { page, subPage: sub || undefined };
  };

  const [routeState, setRouteState] = useState<{ page: PageRoute; subPage?: string }>(parseRouteFromHash);

  const currentPage = routeState.page;
  const currentSubPage = routeState.subPage;

  const navigateTo = useCallback((page: PageRoute | string, subPage?: string) => {
    let targetPage: PageRoute = 'home';
    const clean = page.toLowerCase().replace(/^#\/?/, '');
    if (clean.includes('md') || clean.includes('message')) targetPage = 'md-message';
    else if (clean.includes('serv')) targetPage = 'services';
    else if (clean.includes('prod')) targetPage = 'products';
    else if (clean.includes('cust') || clean.includes('client')) targetPage = 'customers';
    else if (clean.includes('proj')) targetPage = 'projects';
    else if (clean.includes('about')) targetPage = 'about';
    else if (clean.includes('contact')) targetPage = 'contact';
    else if (clean.includes('admin') || clean.includes('login') || clean.includes('dashboard')) targetPage = 'admin';
    else targetPage = 'home';

    setRouteState({ page: targetPage, subPage });

    const newHash = subPage ? `#${targetPage}/${subPage}` : `#${targetPage}`;
    if (window.location.hash !== newHash) {
      window.history.pushState(null, '', newHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen to hash changes (back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const { page, subPage } = parseRouteFromHash();
      setRouteState({ page, subPage });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MENUS, JSON.stringify(menus));
    } catch (e) {
      console.error(e);
    }
  }, [menus]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    } catch (e) {
      console.error(e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error(e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  // Menu Methods
  const addMainMenu = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `menu-${Date.now()}`
    };
    setMenus(prev => [...prev, newItem].sort((a, b) => a.order - b.order));
  };

  const editMainMenu = (id: string, updated: Partial<MenuItem>) => {
    setMenus(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
  };

  const deleteMainMenu = (id: string) => {
    setMenus(prev => prev.filter(m => m.id !== id));
  };

  const addSubMenu = (parentId: string, subMenu: Omit<SubMenuItem, 'id'>) => {
    const newSub: SubMenuItem = {
      ...subMenu,
      id: `sub-${Date.now()}`
    };
    setMenus(prev => prev.map(m => {
      if (m.id === parentId) {
        const children = m.children || [];
        return {
          ...m,
          children: [...children, newSub].sort((a, b) => a.order - b.order)
        };
      }
      return m;
    }));
  };

  const editSubMenu = (parentId: string, subId: string, updated: Partial<SubMenuItem>) => {
    setMenus(prev => prev.map(m => {
      if (m.id === parentId && m.children) {
        return {
          ...m,
          children: m.children.map(sub => sub.id === subId ? { ...sub, ...updated } : sub)
        };
      }
      return m;
    }));
  };

  const deleteSubMenu = (parentId: string, subId: string) => {
    setMenus(prev => prev.map(m => {
      if (m.id === parentId && m.children) {
        return {
          ...m,
          children: m.children.filter(sub => sub.id !== subId)
        };
      }
      return m;
    }));
  };

  const addSubSubMenu = (parentId: string, subId: string, subSubMenu: Omit<SubSubMenuItem, 'id'>) => {
    const newSubSub: SubSubMenuItem = {
      ...subSubMenu,
      id: `subsub-${Date.now()}`
    };
    setMenus(prev => prev.map(m => {
      if (m.id === parentId && m.children) {
        return {
          ...m,
          children: m.children.map(sub => {
            if (sub.id === subId) {
              const children = sub.children || [];
              return {
                ...sub,
                children: [...children, newSubSub].sort((a, b) => a.order - b.order)
              };
            }
            return sub;
          })
        };
      }
      return m;
    }));
  };

  const editSubSubMenu = (parentId: string, subId: string, subSubId: string, updated: Partial<SubSubMenuItem>) => {
    setMenus(prev => prev.map(m => {
      if (m.id === parentId && m.children) {
        return {
          ...m,
          children: m.children.map(sub => {
            if (sub.id === subId && sub.children) {
              return {
                ...sub,
                children: sub.children.map(subsub => subsub.id === subSubId ? { ...subsub, ...updated } : subsub)
              };
            }
            return sub;
          })
        };
      }
      return m;
    }));
  };

  const deleteSubSubMenu = (parentId: string, subId: string, subSubId: string) => {
    setMenus(prev => prev.map(m => {
      if (m.id === parentId && m.children) {
        return {
          ...m,
          children: m.children.map(sub => {
            if (sub.id === subId && sub.children) {
              return {
                ...sub,
                children: sub.children.filter(subsub => subsub.id !== subSubId)
              };
            }
            return sub;
          })
        };
      }
      return m;
    }));
  };

  // Projects
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProj: Project = {
      ...project,
      id: `proj-${Date.now()}`
    };
    setProjects(prev => [newProj, ...prev]);
  };

  const editProject = (id: string, updated: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Gallery
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setGallery(prev => [newItem, ...prev]);
  };

  const editGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, ...updated } : g));
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  // Inquiry
  const submitInquiry = (formData: Omit<InquiryForm, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: InquiryForm = {
      ...formData,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: InquiryForm['status'], notes?: string) => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === id) {
        return {
          ...inq,
          status,
          ...(notes !== undefined ? { notes } : {})
        };
      }
      return inq;
    }));
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  const updateSettings = (updated: Partial<CompanySettings>) => {
    setSettings(prev => ({ ...prev, ...updated }));
  };

  const resetToDefaults = () => {
    setMenus(initialNavMenus);
    setProjects(initialProjects);
    setGallery(initialGallery);
    setInquiries(initialInquiries);
    setSettings(initialCompanySettings);
    localStorage.removeItem(STORAGE_KEYS.MENUS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        currentSubPage,
        navigateTo,
        menus,
        projects,
        gallery,
        services,
        inquiries,
        settings,
        siteContent,
        updateSiteContent,
        resetSiteContent,
        isAdminOpen,
        setIsAdminOpen,
        selectedProject,
        setSelectedProject,
        selectedGalleryItem,
        setSelectedGalleryItem,
        isMDMessageOpen,
        setIsMDMessageOpen,
        isCustomersOpen,
        setIsCustomersOpen,
        isAboutOpen,
        setIsAboutOpen,
        activeServiceDetail,
        setActiveServiceDetail,
        addMainMenu,
        editMainMenu,
        deleteMainMenu,
        addSubMenu,
        editSubMenu,
        deleteSubMenu,
        addSubSubMenu,
        editSubSubMenu,
        deleteSubSubMenu,
        addProject,
        editProject,
        deleteProject,
        addGalleryItem,
        editGalleryItem,
        deleteGalleryItem,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateSettings,
        resetToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
