import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SmartLogo } from './SmartLogo';
import { 
  Phone, 
  MapPin, 
  ChevronDown, 
  ChevronRight, 
  Menu as MenuIcon, 
  X, 
  Settings,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    menus, 
    currentPage, 
    currentSubPage, 
    navigateTo, 
    setIsAdminOpen 
  } = useApp();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const closeTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [mobileOpen]);

  const handleMenuEnter = (id: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(id);
  };

  const handleMenuLeave = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    }, 180);
  };

  const handleSubEnter = (subId: string, hasSubSub: boolean) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (hasSubSub) {
      setActiveSubDropdown(subId);
    } else {
      setActiveSubDropdown(null);
    }
  };

  const toggleMobileItem = (id: string) => {
    setMobileExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleNavClick = (label: string, href?: string) => {
    if (href) {
      const cleanHref = href.replace(/^#\/?/, '').trim();
      const parts = cleanHref.split('/');
      if (parts.length > 0 && parts[0]) {
        const page = parts[0];
        const subPage = parts.slice(1).join('/');
        navigateTo(page, subPage || undefined);
        setMobileOpen(false);
        setActiveDropdown(null);
        setActiveSubDropdown(null);
        return;
      }
    }

    const cleanLabel = label.toUpperCase();
    
    if (cleanLabel.includes('MD') || cleanLabel.includes('MESSAGE OF MD')) {
      navigateTo('md-message');
    } else if (cleanLabel.includes('CUSTOMER')) {
      navigateTo('customers');
    } else if (cleanLabel.includes('ABOUT')) {
      navigateTo('about');
    } else if (cleanLabel.includes('PRE-CONSTRUCTION')) {
      navigateTo('services', 'pre-construction');
    } else if (cleanLabel.includes('POST-CONSTRUCTION')) {
      navigateTo('services', 'post-construction');
    } else if (cleanLabel.includes('CONSTRUCTION') && !cleanLabel.includes('PRE') && !cleanLabel.includes('POST')) {
      navigateTo('services', 'construction');
    } else if (cleanLabel.includes('SERVICE')) {
      navigateTo('services');
    } else if (cleanLabel.includes('PRODUCT')) {
      navigateTo('products');
    } else if (cleanLabel.includes('PROJECT')) {
      navigateTo('projects');
    } else if (cleanLabel.includes('CONTACT')) {
      navigateTo('contact');
    } else if (cleanLabel.includes('ADMIN')) {
      navigateTo('admin');
    } else {
      navigateTo('home');
    }

    setMobileOpen(false);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  const isMenuItemActive = (label: string): boolean => {
    const clean = label.toUpperCase();
    if (clean.includes('HOME') && currentPage === 'home') return true;
    if (clean.includes('MD') && currentPage === 'md-message') return true;
    if (clean.includes('SERVICE') && currentPage === 'services') return true;
    if (clean.includes('PRODUCT') && currentPage === 'products') return true;
    if (clean.includes('CUSTOMER') && currentPage === 'customers') return true;
    if (clean.includes('PROJECT') && currentPage === 'projects') return true;
    if (clean.includes('ABOUT') && currentPage === 'about') return true;
    if (clean.includes('CONTACT') && currentPage === 'contact') return true;
    if (clean.includes('ADMIN') && currentPage === 'admin') return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs">
      
      {/* 1. TOP CORPORATE BAR */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <button 
            onClick={() => navigateTo('home')} 
            className="shrink-0 flex items-center text-left focus:outline-hidden cursor-pointer group"
            aria-label="Smart Engineering Home"
          >
            <img
              src="/images/S.png"
              alt="Smart Engineering"
              className="h-9 sm:h-11 md:h-13 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </button>

          {/* Contact Details on Right */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            
            {/* Address */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[#e52424] shrink-0 bg-red-50/50">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left text-xs leading-tight">
                <p className="font-semibold text-slate-800">
                  Suite # 301, 65 Elephant Road
                </p>
                <p className="text-slate-500 font-normal">
                  Dhaka-1205, Bangladesh
                </p>
              </div>
            </div>

            {/* Direct Phone */}
            <a 
              href="tel:+8801679242424"
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[#e52424] shrink-0 bg-red-50/50 group-hover:bg-[#e52424] group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left text-xs leading-tight">
                <p className="text-slate-400 font-medium">
                  24/7 Hotline
                </p>
                <p className="font-black text-slate-900 group-hover:text-[#e52424] transition-colors text-sm">
                  +880 1679242424
                </p>
              </div>
            </a>

            {/* Admin Portal Button */}
            <button
              onClick={() => navigateTo('admin')}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600 hover:text-[#e52424] bg-slate-100 hover:bg-red-50 border border-slate-200 hover:border-red-200 px-3 py-1.5 rounded-md transition-all cursor-pointer"
              title="Admin CMS & Control Panel (Demo Credentials Available)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Admin Portal</span>
            </button>
          </div>

          {/* Mobile header buttons (Phones & Mini Tablets) */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:hidden">
            {/* Quick One-Tap Call */}
            <a
              href="tel:+8801679242424"
              className="w-8 h-8 rounded-full bg-red-50 text-[#e52424] border border-red-200 flex items-center justify-center transition-colors active:bg-[#e52424] active:text-white cursor-pointer shrink-0"
              title="Call 24/7 Hotline"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>

            {/* Quick Quote Button */}
            <button
              onClick={() => navigateTo('contact')}
              className="bg-[#e52424] active:bg-[#c91818] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded shadow-xs cursor-pointer shrink-0"
            >
              Quote
            </button>

            {/* Admin Portal Quick Button */}
            <button
              onClick={() => navigateTo('admin')}
              className="text-slate-700 active:text-[#e52424] bg-slate-100 hover:bg-red-50 px-2 py-1.5 rounded border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] font-bold hidden xs:inline">ADMIN</span>
            </button>

            {/* Hamburger / Close Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 text-slate-800 hover:text-[#e52424] active:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-6 h-6 text-[#e52424]" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 2. MAIN NAV BAR (Solid Deep Obsidian/Black Bar - Visible on Tablet & Desktop) */}
      <nav className="bg-slate-950 text-white relative z-40 border-b border-slate-800 hidden md:block overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-visible">
          
          {/* Desktop & Tablet Nav Items */}
          <div className="flex items-center space-x-0.5 lg:space-x-1 py-0 overflow-visible">
            {menus.map((menu) => {
              const hasChildren = menu.children && menu.children.length > 0;
              const isActive = isMenuItemActive(menu.label);

              return (
                <div 
                  key={menu.id}
                  className="relative group shrink-0"
                  onMouseEnter={() => handleMenuEnter(menu.id)}
                  onMouseLeave={handleMenuLeave}
                >
                  <a
                    href={menu.href || '#'}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(menu.label, menu.href);
                    }}
                    className={`px-2.5 lg:px-3.5 xl:px-4 py-3.5 text-[11px] lg:text-xs font-bold uppercase tracking-tight lg:tracking-wider flex items-center gap-1 lg:gap-1.5 transition-colors relative cursor-pointer whitespace-nowrap ${
                      isActive 
                        ? 'text-white bg-white/10' 
                        : 'text-slate-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{menu.label}</span>
                    {hasChildren && (
                      <ChevronDown className={`w-3 h-3 lg:w-3.5 lg:h-3.5 transition-transform duration-200 ${
                        activeDropdown === menu.id ? 'rotate-180 text-[#e52424]' : 'opacity-70'
                      }`} />
                    )}
                    {/* Active Bottom Red Pip */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e52424]" />
                    )}
                  </a>

                  {/* Level 1 Dropdown */}
                  {hasChildren && activeDropdown === menu.id && (
                    <div 
                      className="absolute left-0 top-full w-72 bg-white text-slate-800 shadow-2xl border-t-2 border-[#e52424] rounded-b-lg py-1.5 z-[100] border border-slate-200/90 animate-fadeIn"
                      onMouseEnter={() => handleMenuEnter(menu.id)}
                      onMouseLeave={handleMenuLeave}
                    >
                      {menu.children!.map((subItem) => {
                        const hasSubSub = subItem.children && subItem.children.length > 0;
                        const isSubActive = activeSubDropdown === subItem.id;

                        return (
                          <div 
                            key={subItem.id}
                            className="relative group/sub"
                            onMouseEnter={() => handleSubEnter(subItem.id, !!hasSubSub)}
                          >
                            <a
                              href={subItem.href || '#'}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(subItem.label, subItem.href);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider flex items-center justify-between transition-colors border-b border-slate-100 last:border-0 cursor-pointer ${
                                isSubActive ? 'bg-red-50 text-[#e52424]' : 'hover:bg-slate-50 hover:text-[#e52424] text-slate-800'
                              }`}
                            >
                              <span>{subItem.label}</span>
                              {hasSubSub && (
                                <ChevronRight className={`w-3.5 h-3.5 transition-colors ${
                                  isSubActive ? 'text-[#e52424]' : 'text-slate-400'
                                }`} />
                              )}
                            </a>

                            {/* Level 2 Sub-Dropdown */}
                            {hasSubSub && isSubActive && (
                              <div 
                                className="absolute left-[calc(100%-4px)] -top-1 w-80 bg-white text-slate-800 shadow-2xl border-l-2 border-[#e52424] border border-slate-200/90 rounded-r-lg py-1.5 z-[110] max-h-[75vh] overflow-y-auto animate-fadeIn"
                                onMouseEnter={() => handleSubEnter(subItem.id, true)}
                                onMouseLeave={handleMenuLeave}
                              >
                                {subItem.children!.map((ssItem) => (
                                  <a
                                    key={ssItem.id}
                                    href={ssItem.href || '#'}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleNavClick(ssItem.label, ssItem.href);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-[10.5px] font-semibold text-slate-700 hover:bg-red-50 hover:text-[#e52424] border-b border-slate-100/60 last:border-0 transition-colors uppercase leading-snug cursor-pointer"
                                  >
                                    {ssItem.label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Red CTA Button: REQUEST A QUOTE (Tablet & Desktop) */}
          <div className="py-2.5 ml-auto shrink-0">
            <button
              onClick={() => navigateTo('contact')}
              className="bg-[#e52424] hover:bg-[#c91818] text-white px-3 lg:px-4 py-2 rounded-md font-bold text-[11px] lg:text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span className="hidden lg:inline">REQUEST A QUOTE</span>
              <span className="lg:hidden">GET QUOTE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </nav>

      {/* 3. MOBILE SLIDE-DOWN DRAWER (Opens smoothly on mobile) */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-950 text-white border-t border-slate-800 max-h-[85vh] overflow-y-auto shadow-2xl animate-fadeIn">
          
          {/* Quick Action Buttons inside drawer */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 space-y-2">
            <button
              onClick={() => {
                navigateTo('contact');
                setMobileOpen(false);
              }}
              className="w-full bg-[#e52424] hover:bg-[#c91818] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>Request Project Proposal / BOQ</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:+8801679242424"
                className="bg-slate-800 hover:bg-slate-700 text-white py-2.5 px-3 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-slate-700"
              >
                <Phone className="w-3.5 h-3.5 text-[#e52424]" />
                <span>Call Hotline</span>
              </a>

              <button
                onClick={() => {
                  navigateTo('admin');
                  setMobileOpen(false);
                }}
                className="bg-slate-800 hover:bg-slate-700 text-amber-400 py-2.5 px-3 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-slate-700"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>

          {/* Navigation Links Accordion */}
          <div className="px-4 py-2 divide-y divide-slate-800/80">
            {menus.map((menu) => {
              const hasChildren = menu.children && menu.children.length > 0;
              const isExpanded = !!mobileExpanded[menu.id];
              const isActive = isMenuItemActive(menu.label);

              return (
                <div key={menu.id} className="py-1">
                  <div className="flex items-center justify-between min-h-[44px]">
                    <a
                      href={menu.href || '#'}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(menu.label, menu.href);
                      }}
                      className={`text-left py-2.5 text-xs font-bold uppercase tracking-wider flex-1 transition-colors cursor-pointer flex items-center gap-2 ${
                        isActive ? 'text-[#e52424]' : 'text-slate-100 hover:text-[#e52424]'
                      }`}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#e52424]" />}
                      <span>{menu.label}</span>
                    </a>
                    {hasChildren && (
                      <button
                        onClick={() => toggleMobileItem(menu.id)}
                        className="p-2.5 text-slate-400 hover:text-white rounded-lg active:bg-slate-800"
                        aria-label="Toggle Submenu"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180 text-[#e52424]' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Mobile Accordion Level 1 */}
                  {hasChildren && isExpanded && (
                    <div className="pl-3 pr-1 py-1.5 space-y-1 bg-slate-900 rounded-lg mb-2 border border-slate-800">
                      {menu.children!.map((sub) => {
                        const hasSubSub = sub.children && sub.children.length > 0;
                        const isSubExpanded = !!mobileExpanded[sub.id];

                        return (
                          <div key={sub.id} className="py-1 border-b border-slate-800/60 last:border-0">
                            <div className="flex items-center justify-between min-h-[38px]">
                              <a
                                href={sub.href || '#'}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavClick(sub.label, sub.href);
                                }}
                                className="text-left text-[11px] font-semibold text-slate-300 hover:text-[#e52424] cursor-pointer flex-1 py-1"
                              >
                                {sub.label}
                              </a>
                              {hasSubSub && (
                                <button 
                                  onClick={() => toggleMobileItem(sub.id)}
                                  className="p-2 text-slate-400 hover:text-white"
                                >
                                  <ChevronDown className={`w-3.5 h-3.5 ${isSubExpanded ? 'rotate-180 text-[#e52424]' : ''}`} />
                                </button>
                              )}
                            </div>

                            {/* Mobile Sub-sub items Level 2 */}
                            {hasSubSub && isSubExpanded && (
                              <div className="pl-3 py-1 space-y-1 bg-black/40 rounded my-1 border-l-2 border-[#e52424]">
                                {sub.children!.map((ss) => (
                                  <a
                                    key={ss.id}
                                    href={ss.href || '#'}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleNavClick(ss.label, ss.href);
                                    }}
                                    className="block text-left text-[10.5px] text-slate-300 hover:text-white py-1.5 px-2 rounded hover:bg-white/5 cursor-pointer"
                                  >
                                    • {ss.label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Footer Inside Drawer */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 space-y-3">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#e52424] shrink-0 mt-0.5" />
              <span className="leading-relaxed">Suite # 301 (3rd Floor), 65 Elephant Road, Dhaka-1205, Bangladesh</span>
            </div>
            <a href="tel:+8801679242424" className="flex items-center gap-2.5 text-white font-bold py-1">
              <Phone className="w-4 h-4 text-[#e52424] shrink-0" />
              <span>+880 1679242424 (24/7 Technical Hotline)</span>
            </a>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>Smart Engineering © 2007–2026</span>
              <button 
                onClick={() => {
                  navigateTo('admin');
                  setMobileOpen(false);
                }}
                className="text-amber-400 font-bold hover:underline cursor-pointer"
              >
                Admin Login
              </button>
            </div>
          </div>

        </div>
      )}

    </header>
  );
};
