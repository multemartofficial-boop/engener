import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutGrid, 
  Layers, 
  FolderTree, 
  FileText, 
  Building, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings as SettingsIcon, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  Bell, 
  ExternalLink, 
  LogOut, 
  Plus, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  Clock, 
  Filter, 
  ArrowUpDown, 
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Shield,
  HelpCircle,
  BarChart3,
  PieChart,
  UserCheck,
  Home,
  Info,
  PhoneCall,
  Package,
  Users,
  Menu
} from 'lucide-react';
import { SmartLogo } from '../SmartLogo';
import { SafeImage } from '../SafeImage';
import { SiteContentManager } from './SiteContentManager';
import { MenuManager } from './MenuManager';
import { ProjectsManager } from './ProjectsManager';
import { GalleryManager } from './GalleryManager';
import { InquiriesManager } from './InquiriesManager';
import { SiteSettingsManager } from './SiteSettingsManager';

interface ProdexAdminLayoutProps {
  onLogout: () => void;
}

export const ProdexAdminLayout: React.FC<ProdexAdminLayoutProps> = ({ onLogout }) => {
  const { 
    menus, 
    projects, 
    gallery, 
    inquiries, 
    settings, 
    siteContent, 
    navigateTo 
  } = useApp();

  // Navigation state
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'content' | 'menus' | 'projects' | 'gallery' | 'inquiries' | 'settings'
  >('dashboard');
  
  // Specific sub-tab for content editing
  const [contentSubTab, setContentSubTab] = useState<
    'home' | 'md' | 'about' | 'services' | 'products' | 'customers' | 'contact'
  >('home');

  // Sidebar collapsible state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [contentTreeOpen, setContentTreeOpen] = useState(true);

  // Chart range filter
  const [chartRange, setChartRange] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly');

  // Interactive tooltip state for Bar Chart
  const [hoveredBar, setHoveredBar] = useState<number | null>(3); // Default highlighting 'Apr' like image.png!

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');

  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  const monthlyData = [
    { month: 'Jan', steel: 4200, peb: 18500, label: 'Jan' },
    { month: 'Feb', steel: 3800, peb: 16000, label: 'Feb' },
    { month: 'Mar', steel: 5100, peb: 22000, label: 'Mar' },
    { month: 'Apr', steel: 6000, peb: 25000, label: 'Apr' },
    { month: 'May', steel: 5400, peb: 21500, label: 'May' },
    { month: 'Jun', steel: 4800, peb: 19800, label: 'Jun' },
    { month: 'Jul', steel: 5900, peb: 24200, label: 'Jul' },
    { month: 'Aug', steel: 6400, peb: 26500, label: 'Aug' },
  ];

  return (
    <div className="h-screen w-full overflow-hidden flex bg-slate-100 text-slate-900">
      
      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR (Still, fixed in place, non-scrolling with page)          */}
      {/* ========================================================================= */}
      <aside 
        className={`h-screen sticky top-0 bg-white border-r border-slate-200 transition-all duration-300 flex flex-col shrink-0 z-30 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Still Sidebar Header */}
        <div className="h-16 px-4 flex items-center border-b border-slate-100 bg-white shrink-0">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img 
                src="/images/S.png" 
                alt="Smart Engineering" 
                className="h-8 w-auto object-contain shrink-0" 
              />
              <div className="leading-tight truncate">
                <span className="font-extrabold text-slate-900 text-sm tracking-tight font-display block truncate">
                  Smart Engineering
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase block">
                  Admin Panel
                </span>
              </div>
            </div>
          ) : (
            <div className="mx-auto">
              <img 
                src="/images/S.png" 
                alt="Smart Engineering" 
                className="h-7 w-auto object-contain" 
              />
            </div>
          )}
        </div>

        {/* Navigation Menus List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-none">
          
          {/* Group 1: MAIN */}
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                Main
              </div>
            )}

            {/* Dashboard Link */}
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Dashboard"
            >
              <LayoutGrid className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-amber-400' : 'text-slate-500'}`} />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </button>

            {/* Site Content & Pages (Collapsible Tree from image.png) */}
            <div>
              <button
                type="button"
                onClick={() => {
                  if (sidebarCollapsed) setSidebarCollapsed(false);
                  setContentTreeOpen(!contentTreeOpen);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'content'
                    ? 'bg-red-50 text-[#e52424]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Site Content & Pages"
              >
                <div className="flex items-center gap-3">
                  <FileText className={`w-4 h-4 ${activeTab === 'content' ? 'text-[#e52424]' : 'text-slate-500'}`} />
                  {!sidebarCollapsed && <span>Site Content CMS</span>}
                </div>
                {!sidebarCollapsed && (
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${contentTreeOpen ? 'rotate-180' : ''}`} />
                )}
              </button>

              {/* Sub-tree with visual guide line */}
              {!sidebarCollapsed && contentTreeOpen && (
                <div className="ml-4 pl-3 border-l-2 border-slate-200 mt-1 space-y-0.5 py-1">
                  {[
                    { id: 'home', label: 'Home Page CMS', icon: Home },
                    { id: 'md', label: 'Message of MD', icon: UserCheck },
                    { id: 'about', label: 'About Us Page', icon: Info },
                    { id: 'services', label: 'Services & Stages', icon: BriefcaseIcon },
                    { id: 'products', label: 'Products Catalogue', icon: Package },
                    { id: 'customers', label: 'Customers & Clients', icon: Users },
                    { id: 'contact', label: 'Contact & Offices', icon: PhoneCall },
                  ].map((sub) => {
                    const isSubActive = activeTab === 'content' && contentSubTab === sub.id;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => {
                          setActiveTab('content');
                          setContentSubTab(sub.id as any);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                          isSubActive
                            ? 'bg-slate-900 text-white font-bold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isSubActive ? 'bg-[#e52424]' : 'bg-slate-300'}`} />
                        <span className="truncate">{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Menu Hierarchy */}
            <button
              type="button"
              onClick={() => setActiveTab('menus')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'menus'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Menu Hierarchy"
            >
              <div className="flex items-center gap-3">
                <Layers className={`w-4 h-4 ${activeTab === 'menus' ? 'text-amber-400' : 'text-slate-500'}`} />
                {!sidebarCollapsed && <span>Menu Hierarchy</span>}
              </div>
              {!sidebarCollapsed && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-slate-200 text-slate-700">
                  {menus.length}
                </span>
              )}
            </button>

            {/* Steel Projects */}
            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Steel Projects"
            >
              <div className="flex items-center gap-3">
                <Building className={`w-4 h-4 ${activeTab === 'projects' ? 'text-blue-400' : 'text-slate-500'}`} />
                {!sidebarCollapsed && <span>Steel Projects</span>}
              </div>
              {!sidebarCollapsed && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-slate-200 text-slate-700">
                  {projects.length}
                </span>
              )}
            </button>

            {/* Media & Gallery */}
            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Media Gallery"
            >
              <div className="flex items-center gap-3">
                <ImageIcon className={`w-4 h-4 ${activeTab === 'gallery' ? 'text-purple-400' : 'text-slate-500'}`} />
                {!sidebarCollapsed && <span>Media Gallery</span>}
              </div>
              {!sidebarCollapsed && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-slate-200 text-slate-700">
                  {gallery.length}
                </span>
              )}
            </button>

            {/* Inquiries & Leads */}
            <button
              type="button"
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Inquiries & Leads"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className={`w-4 h-4 ${activeTab === 'inquiries' ? 'text-emerald-400' : 'text-slate-500'}`} />
                {!sidebarCollapsed && <span>Inquiries & Leads</span>}
              </div>
              {newInquiriesCount > 0 && (
                <span className="bg-[#e52424] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {newInquiriesCount}
                </span>
              )}
            </button>
          </div>

          {/* Group 2: SYSTEM & SETTINGS */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            {!sidebarCollapsed && (
              <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                Settings
              </div>
            )}

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Settings"
            >
              <SettingsIcon className={`w-4 h-4 ${activeTab === 'settings' ? 'text-amber-400' : 'text-slate-500'}`} />
              {!sidebarCollapsed && <span>Company Settings</span>}
            </button>
          </div>

        </div>

        {/* Sidebar Footer Widgets */}
        {!sidebarCollapsed && (
          <div className="p-3 border-t border-slate-100 space-y-3">
            {/* Live Public Site Upgrade Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Live Public Site</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Changes made in this admin panel synchronize instantly to your live website.
              </p>
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="w-full bg-slate-900 hover:bg-black text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <span>View Public Site</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </button>
            </div>
          </div>
        )}

      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN ADMIN CONTENT CONTAINER                                           */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0">
          
          {/* Left Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 capitalize tracking-tight font-display">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'content' && `Site Content CMS - ${contentSubTab.toUpperCase()}`}
              {activeTab === 'menus' && 'Navigation Menu Hierarchy'}
              {activeTab === 'projects' && 'Steel Projects & Industrial Works'}
              {activeTab === 'gallery' && 'Photo & Media Assets'}
              {activeTab === 'inquiries' && 'Customer Inquiries & RFQ Leads'}
              {activeTab === 'settings' && 'Company & Estimator Settings'}
            </h1>
          </div>

          {/* Right Header Controls (Search, Bell, Profile) */}
          <div className="flex items-center gap-3">
            
            {/* Search Pill */}
            <div className="hidden md:flex items-center relative w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-12 py-1.5 bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-transparent focus:border-slate-300 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden transition-all"
              />
              <span className="absolute right-2 text-[10px] font-mono font-bold bg-white text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                ⌘K
              </span>
            </div>

            {/* Notification Bell with Red Badge */}
            <button 
              type="button" 
              onClick={() => setActiveTab('inquiries')}
              className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {newInquiriesCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#e52424] ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs ring-2 ring-slate-100">
                A
              </div>
              <div className="hidden lg:block text-left">
                <span className="block text-xs font-bold text-slate-900 leading-none">Admin</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Managing Director</span>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors ml-1 cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* ========================================================================= */}
          {/* TAB 1: DASHBOARD (Matching image.png Prodex exact layout)                 */}
          {/* ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Top 4 Metrics Cards (from image.png) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Metric 1: Total Projects (Blue icon box) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Building className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <TrendingUp className="w-3 h-3" />
                      <span>+12 this yr</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-2xl font-black text-slate-900 block font-display tracking-tight">
                      145+
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      Total Completed Projects
                    </span>
                  </div>
                </div>

                {/* Metric 2: Active Inquiries (Purple icon box) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 flex items-center gap-0.5 bg-blue-50 px-2 py-0.5 rounded-full">
                      <span>{newInquiriesCount} New</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-2xl font-black text-slate-900 block font-display tracking-tight">
                      {inquiries.length}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      Total Inquiries & Leads
                    </span>
                  </div>
                </div>

                {/* Metric 3: Fabricated Steel Volume (Green icon box) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <span>+18.4%</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-2xl font-black text-slate-900 block font-display tracking-tight">
                      38,000+ MT
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      Fabricated Steel Delivered
                    </span>
                  </div>
                </div>

                {/* Metric 4: Client Rating & Retention (Red icon box) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e52424] flex items-center justify-center">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      50+ Groups
                    </span>
                  </div>
                  <div>
                    <span className="text-2xl font-black text-slate-900 block font-display tracking-tight">
                      99.4%
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      Client Satisfaction Rate
                    </span>
                  </div>
                </div>

              </div>

              {/* Middle Row (2/3 Bar Chart + 1/3 Donut Chart from image.png) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left (8 cols): Project Revenue & Tonnage Bar Chart */}
                <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
                  
                  {/* Card Header with Legend and Range Pills */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-display">
                        Sales & Project Volume
                      </h3>
                      {/* Legend matching image.png */}
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                          <span className="w-2 h-2 rounded-full bg-slate-800" />
                          <span>Structural Steel</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          <span>Turnkey PEB</span>
                        </div>
                      </div>
                    </div>

                    {/* Range Filter Pills */}
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                      {(['Monthly', 'Quarterly', 'Yearly'] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setChartRange(r)}
                          className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                            chartRange === r
                              ? 'bg-white text-slate-900 shadow-xs font-bold'
                              : 'hover:text-slate-900'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Visual Bar Chart Canvas */}
                  <div className="h-64 pt-6 pb-2 relative flex items-end justify-between gap-2 sm:gap-4 px-2">
                    
                    {/* Background Grid Lines */}
                    <div className="absolute inset-x-0 top-6 border-b border-dashed border-slate-100" />
                    <div className="absolute inset-x-0 top-24 border-b border-dashed border-slate-100" />
                    <div className="absolute inset-x-0 top-42 border-b border-dashed border-slate-100" />
                    <div className="absolute inset-x-0 bottom-8 border-b border-slate-200" />

                    {monthlyData.map((d, idx) => {
                      const isHovered = hoveredBar === idx;
                      const steelHeight = Math.round((d.steel / 7000) * 140);
                      const pebHeight = Math.round((d.peb / 30000) * 180);

                      return (
                        <div 
                          key={d.month}
                          onMouseEnter={() => setHoveredBar(idx)}
                          className="flex-1 flex flex-col items-center relative group cursor-pointer z-10"
                        >
                          {/* Floating Tooltip Card on the hovered bar (matching April in image.png) */}
                          {isHovered && (
                            <div className="absolute -top-16 z-30 bg-slate-900 text-white p-2.5 rounded-xl shadow-xl text-[11px] whitespace-nowrap animate-in fade-in zoom-in-95 pointer-events-none">
                              <div className="font-bold border-b border-slate-800 pb-1 mb-1 text-slate-300">
                                {d.month} 2026 Volume
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                <span>Structural Steel: <strong>{d.steel.toLocaleString()} MT</strong></span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                <span>Turnkey PEB: <strong>৳{d.peb.toLocaleString()},000</strong></span>
                              </div>
                              {/* Bottom triangle arrow */}
                              <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                            </div>
                          )}

                          {/* Bars container */}
                          <div className="flex items-end gap-1 sm:gap-1.5">
                            {/* Steel bar */}
                            <div 
                              style={{ height: `${steelHeight}px` }}
                              className={`w-3 sm:w-5 rounded-t-md transition-all duration-300 ${
                                isHovered ? 'bg-slate-900 ring-2 ring-slate-400' : 'bg-slate-800'
                              }`}
                            />
                            {/* PEB bar */}
                            <div 
                              style={{ height: `${pebHeight}px` }}
                              className={`w-3 sm:w-5 rounded-t-md transition-all duration-300 ${
                                isHovered ? 'bg-amber-500 ring-2 ring-amber-300' : 'bg-amber-400'
                              }`}
                            />
                          </div>

                          {/* Month Label */}
                          <span className={`text-[11px] mt-2 font-medium transition-colors ${
                            isHovered ? 'text-slate-900 font-bold' : 'text-slate-400'
                          }`}>
                            {d.month}
                          </span>
                        </div>
                      );
                    })}

                  </div>

                </div>

                {/* Right (4 cols): Top Categories Donut Chart from image.png */}
                <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between">
                  
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 font-display">
                      Top Categories
                    </h3>
                    <button 
                      type="button"
                      onClick={() => setActiveTab('projects')}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                    >
                      See All
                    </button>
                  </div>

                  {/* SVG Donut Chart with Center Label */}
                  <div className="relative flex items-center justify-center my-2">
                    <svg width="180" height="180" viewBox="0 0 180 180" className="transform -rotate-90">
                      {/* Industrial 68% (slate-900) */}
                      <circle
                        cx="90"
                        cy="90"
                        r="65"
                        fill="transparent"
                        stroke="#0f172a"
                        strokeWidth="22"
                        strokeDasharray="408"
                        strokeDashoffset="130"
                        strokeLinecap="round"
                      />
                      {/* Logistics 20% (amber-400) */}
                      <circle
                        cx="90"
                        cy="90"
                        r="65"
                        fill="transparent"
                        stroke="#fbbf24"
                        strokeWidth="22"
                        strokeDasharray="408"
                        strokeDashoffset="326"
                        strokeLinecap="round"
                      />
                      {/* Agro 8% (emerald-500) */}
                      <circle
                        cx="90"
                        cy="90"
                        r="65"
                        fill="transparent"
                        stroke="#10b981"
                        strokeWidth="22"
                        strokeDasharray="408"
                        strokeDashoffset="375"
                        strokeLinecap="round"
                      />
                      {/* Commercial 4% (red-500) */}
                      <circle
                        cx="90"
                        cy="90"
                        r="65"
                        fill="transparent"
                        stroke="#e52424"
                        strokeWidth="22"
                        strokeDasharray="408"
                        strokeDashoffset="392"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Total Volume
                      </span>
                      <span className="text-xl font-black text-slate-900 font-display">
                        ৳125.4M
                      </span>
                    </div>
                  </div>

                  {/* Legend breakdown list matching image.png */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                        <span className="text-slate-700 font-medium">Industrial Manufacturing</span>
                      </div>
                      <span className="font-bold text-slate-900">68%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="text-slate-700 font-medium">Logistics & Warehouses</span>
                      </div>
                      <span className="font-bold text-slate-900">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-slate-700 font-medium">Agro & Cold Storage</span>
                      </div>
                      <span className="font-bold text-slate-900">8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e52424]" />
                        <span className="text-slate-700 font-medium">Commercial & Highrise</span>
                      </div>
                      <span className="font-bold text-slate-900">4%</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Row: Recent Inquiries + Top Featured Projects Table */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Recent Inquiries List (5 cols) */}
                <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 font-display">
                        Recent Inquiries & Leads
                      </h3>
                      {newInquiriesCount > 0 && (
                        <span className="bg-red-100 text-[#e52424] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {newInquiriesCount} New
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                    >
                      See All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {inquiries.slice(0, 4).map((inq) => (
                      <div 
                        key={inq.id}
                        onClick={() => setActiveTab('inquiries')}
                        className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 transition-all cursor-pointer flex items-start justify-between gap-2"
                      >
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-slate-900">
                            {inq.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {inq.company ? inq.company : inq.phone}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          inq.status === 'New' 
                            ? 'bg-red-100 text-[#e52424] border border-red-200' 
                            : inq.status === 'In Review'
                            ? 'bg-amber-100 text-amber-800'
                            : inq.status === 'Quoted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {inq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Featured Projects Table (7 cols) from image.png */}
                <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 font-display">
                      Top Featured Projects & Works
                    </h3>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button"
                        onClick={() => setActiveTab('projects')}
                        className="text-xs font-semibold px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 flex items-center gap-1"
                      >
                        <Filter className="w-3 h-3" />
                        <span>Filter</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setActiveTab('projects')}
                        className="text-xs font-bold text-blue-600 hover:underline"
                      >
                        Manage All ({projects.length})
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold">
                          <th className="pb-2.5">Project / Client</th>
                          <th className="pb-2.5">Location</th>
                          <th className="pb-2.5">Area</th>
                          <th className="pb-2.5 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {projects.slice(0, 5).map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 pr-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                                  <SafeImage src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 truncate max-w-[140px] sm:max-w-[180px]">
                                    {p.title}
                                  </div>
                                  <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                                    {p.client}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 text-slate-600 text-[11px] truncate max-w-[100px]">
                              {p.location}
                            </td>
                            <td className="py-3 text-slate-900 font-semibold text-[11px]">
                              {p.coveredArea}
                            </td>
                            <td className="py-3 text-right">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                p.status === 'Completed' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                {p.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: SITE CONTENT CMS                                                   */}
          {/* ========================================================================= */}
          {activeTab === 'content' && (
            <SiteContentManager initialSubTab={contentSubTab} />
          )}

          {/* ========================================================================= */}
          {/* TAB 3: MENU HIERARCHY (Main, Sub, Sub-sub)                                */}
          {/* ========================================================================= */}
          {activeTab === 'menus' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
              <MenuManager />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: STEEL PROJECTS                                                     */}
          {/* ========================================================================= */}
          {activeTab === 'projects' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
              <ProjectsManager />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: PHOTO & MEDIA GALLERY                                              */}
          {/* ========================================================================= */}
          {activeTab === 'gallery' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
              <GalleryManager />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: INQUIRIES & LEADS                                                  */}
          {/* ========================================================================= */}
          {activeTab === 'inquiries' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
              <InquiriesManager />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: COMPANY SETTINGS                                                   */}
          {/* ========================================================================= */}
          {activeTab === 'settings' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
              <SiteSettingsManager />
            </div>
          )}

        </main>
      </div>

    </div>
  );
};

function BriefcaseIcon(props: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
