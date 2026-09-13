import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Layers, 
  Building, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings as SettingsIcon, 
  Eye, 
  ShieldCheck,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { MenuManager } from './MenuManager';
import { ProjectsManager } from './ProjectsManager';
import { GalleryManager } from './GalleryManager';
import { InquiriesManager } from './InquiriesManager';
import { SiteSettingsManager } from './SiteSettingsManager';

export const AdminDashboard: React.FC = () => {
  const { isAdminOpen, setIsAdminOpen, inquiries, projects, gallery, menus } = useApp();
  const [activeTab, setActiveTab] = useState<'menus' | 'projects' | 'gallery' | 'inquiries' | 'settings'>('menus');

  if (!isAdminOpen) return null;

  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-0 sm:p-3 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl h-full sm:max-h-[92vh] sm:rounded-2xl rounded-none shadow-2xl border border-slate-300 flex flex-col overflow-hidden">
        
        {/* Admin Header */}
        <div className="bg-slate-900 text-white px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
              SE
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h2 className="text-sm sm:text-lg font-bold font-display text-white truncate max-w-[200px] sm:max-w-none">
                  Smart Engineering Admin
                </h2>
                <span className="bg-slate-800 text-amber-400 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded border border-slate-700 whitespace-nowrap">
                  Control Panel
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 hidden sm:block">
                Manage website menus, project catalogue, gallery photos, and view quote inquiries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="hidden sm:inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-slate-700"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Back to Live Website</span>
            </button>
            
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Close Admin Panel"
              aria-label="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 sm:px-6 sm:py-2 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0">
          
          <button
            onClick={() => setActiveTab('menus')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'menus'
                ? 'bg-white text-slate-950 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-600" />
            <span>Menu Structure</span>
            <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {menus.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-white text-slate-950 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Building className="w-4 h-4 text-amber-600" />
            <span>Steel Projects</span>
            <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'gallery'
                ? 'bg-white text-slate-950 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-amber-600" />
            <span>Photo & Media Gallery</span>
            <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {gallery.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'bg-white text-slate-950 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-amber-600" />
            <span>Quote Inquiries</span>
            {newInquiriesCount > 0 ? (
              <span className="bg-amber-500 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {newInquiriesCount} New
              </span>
            ) : (
              <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {inquiries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-white text-slate-950 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <SettingsIcon className="w-4 h-4 text-amber-600" />
            <span>Site & Contact Info</span>
          </button>

        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-100/50">
          {activeTab === 'menus' && <MenuManager />}
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'gallery' && <GalleryManager />}
          {activeTab === 'inquiries' && <InquiriesManager />}
          {activeTab === 'settings' && <SiteSettingsManager />}
        </div>

        {/* Footer info bar */}
        <div className="bg-white border-t border-slate-200 px-6 py-2.5 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Auto-saving changes to browser local storage. Changes are live immediately.</span>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="text-xs font-bold text-amber-700 hover:text-amber-800"
          >
            Exit Admin & View Site →
          </button>
        </div>

      </div>
    </div>
  );
};
