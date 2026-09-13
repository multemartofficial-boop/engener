import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ImageUploadField } from './ImageUploadField';
import { 
  Home, 
  UserCheck, 
  Info, 
  Briefcase, 
  Package, 
  Users, 
  PhoneCall, 
  Save, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Layers
} from 'lucide-react';
import { SiteContent, SiteProductItem, CustomerItem } from '../../types';

export const SiteContentManager: React.FC<{ initialSubTab?: string }> = ({ initialSubTab = 'home' }) => {
  const { siteContent, updateSiteContent, resetSiteContent, navigateTo } = useApp();
  
  const [activeSubTab, setActiveSubTab] = useState<
    'home' | 'md' | 'about' | 'services' | 'products' | 'customers' | 'contact'
  >(initialSubTab as any || 'home');

  const [formState, setFormState] = useState<SiteContent>(siteContent);
  const [savedNotice, setSavedNotice] = useState(false);

  // Sync if external context changes
  React.useEffect(() => {
    setFormState(siteContent);
  }, [siteContent]);

  const handleSave = () => {
    updateSiteContent(formState);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to revert all site content to factory defaults?')) {
      resetSiteContent();
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 font-display">
            <span>Website Full Content & Media CMS</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              Live Dynamic Sync
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Edit text, headings, statistics, and replace images across all pages and navigation sections.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedNotice && (
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Changes Saved Live!</span>
            </span>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-slate-200"
          >
            Reset Defaults
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="bg-[#e52424] hover:bg-[#c91818] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save All Content</span>
          </button>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100">
        {[
          { id: 'home', label: 'Home Page', icon: Home },
          { id: 'md', label: 'Message of MD', icon: UserCheck },
          { id: 'about', label: 'About Us', icon: Info },
          { id: 'services', label: 'Services & Stages', icon: Briefcase },
          { id: 'products', label: 'Products Catalogue', icon: Package },
          { id: 'customers', label: 'Customers & Clients', icon: Users },
          { id: 'contact', label: 'Contact & Offices', icon: PhoneCall },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 1. HOME PAGE CONTENT                                     */}
      {/* ======================================================== */}
      {activeSubTab === 'home' && (
        <div className="space-y-8 animate-in fade-in">
          
          {/* Hero Slider Management */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#e52424]" />
                  <span>Hero Banner Slides ({formState.home.heroSlides.length})</span>
                </h3>
                <p className="text-xs text-slate-500">Edit titles, descriptions, badges, and background banner imagery.</p>
              </div>
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline"
              >
                <span>Preview Home</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-4">
              {formState.home.heroSlides.map((slide, idx) => (
                <div key={slide.id} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-800">Slide #{idx + 1}</span>
                    <input
                      type="text"
                      value={slide.tag}
                      onChange={(e) => {
                        const updated = [...formState.home.heroSlides];
                        updated[idx].tag = e.target.value;
                        setFormState({ ...formState, home: { ...formState.home, heroSlides: updated } });
                      }}
                      placeholder="Slide Tag (e.g. Industrial Engineering)"
                      className="text-xs px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Slide Title</label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => {
                          const updated = [...formState.home.heroSlides];
                          updated[idx].title = e.target.value;
                          setFormState({ ...formState, home: { ...formState.home, heroSlides: updated } });
                        }}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:bg-white focus:ring-1 focus:ring-[#e52424]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Slide Subtitle</label>
                      <textarea
                        rows={2}
                        value={slide.subtitle}
                        onChange={(e) => {
                          const updated = [...formState.home.heroSlides];
                          updated[idx].subtitle = e.target.value;
                          setFormState({ ...formState, home: { ...formState.home, heroSlides: updated } });
                        }}
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-[#e52424]"
                      />
                    </div>
                  </div>

                  <ImageUploadField
                    label={`Slide #${idx + 1} Background Image`}
                    value={slide.imageUrl}
                    onChange={(newUrl) => {
                      const updated = [...formState.home.heroSlides];
                      updated[idx].imageUrl = newUrl;
                      setFormState({ ...formState, home: { ...formState.home, heroSlides: updated } });
                    }}
                    helperText="High resolution landscape photo (1920x1080 recommended)"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* About Section on Home */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Home About Section Summary & Stats
            </h3>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Tagline</label>
                  <input
                    type="text"
                    value={formState.home.aboutSection.tag}
                    onChange={(e) => setFormState({
                      ...formState,
                      home: { ...formState.home, aboutSection: { ...formState.home.aboutSection, tag: e.target.value } }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Main Heading</label>
                  <input
                    type="text"
                    value={formState.home.aboutSection.heading}
                    onChange={(e) => setFormState({
                      ...formState,
                      home: { ...formState.home, aboutSection: { ...formState.home.aboutSection, heading: e.target.value } }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Paragraph 1</label>
                <textarea
                  rows={2}
                  value={formState.home.aboutSection.paragraph1}
                  onChange={(e) => setFormState({
                    ...formState,
                    home: { ...formState.home, aboutSection: { ...formState.home.aboutSection, paragraph1: e.target.value } }
                  })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Paragraph 2</label>
                <textarea
                  rows={2}
                  value={formState.home.aboutSection.paragraph2}
                  onChange={(e) => setFormState({
                    ...formState,
                    home: { ...formState.home, aboutSection: { ...formState.home.aboutSection, paragraph2: e.target.value } }
                  })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Years Exp</label>
                  <input
                    type="text"
                    value={formState.home.aboutSection.experienceYears}
                    onChange={(e) => setFormState({
                      ...formState,
                      home: { ...formState.home, aboutSection: { ...formState.home.aboutSection, experienceYears: e.target.value } }
                    })}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Completed Projects</label>
                  <input
                    type="text"
                    value={formState.home.aboutSection.projectsCount}
                    onChange={(e) => setFormState({
                      ...formState,
                      home: { ...formState.home, aboutSection: { ...formState.home.aboutSection, projectsCount: e.target.value } }
                    })}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Steel Fabricated</label>
                  <input
                    type="text"
                    value={formState.home.aboutSection.steelTons}
                    onChange={(e) => setFormState({
                      ...formState,
                      home: { ...formState.home, aboutSection: { ...formState.home.aboutSection, steelTons: e.target.value } }
                    })}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Total Built Area</label>
                  <input
                    type="text"
                    value={formState.home.aboutSection.sqFtBuilt}
                    onChange={(e) => setFormState({
                      ...formState,
                      home: { ...formState.home, aboutSection: { ...formState.home.aboutSection, sqFtBuilt: e.target.value } }
                    })}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Home About Section Feature Photo"
                value={formState.home.aboutSection.imageUrl}
                onChange={(newUrl) => setFormState({
                  ...formState,
                  home: { ...formState.home, aboutSection: { ...formState.home.aboutSection, imageUrl: newUrl } }
                })}
              />
            </div>
          </div>

          {/* Why Choose Us Items */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Why Choose Us Pillar Cards (4 Items)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formState.home.whyChooseUs.map((item, idx) => (
                <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Card #{idx + 1}</span>
                    <input
                      type="text"
                      value={item.tag}
                      onChange={(e) => {
                        const updated = [...formState.home.whyChooseUs];
                        updated[idx].tag = e.target.value;
                        setFormState({ ...formState, home: { ...formState.home, whyChooseUs: updated } });
                      }}
                      className="text-[11px] p-1 bg-slate-50 border border-slate-200 rounded font-semibold text-slate-600"
                    />
                  </div>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...formState.home.whyChooseUs];
                      updated[idx].title = e.target.value;
                      setFormState({ ...formState, home: { ...formState.home, whyChooseUs: updated } });
                    }}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                  />
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...formState.home.whyChooseUs];
                      updated[idx].description = e.target.value;
                      setFormState({ ...formState, home: { ...formState.home, whyChooseUs: updated } });
                    }}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Cost Estimator Section Settings */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Online Cost Estimator Parameters (BDT / Sq. Ft.)
            </h3>
            <div className="bg-white p-4 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Superstructure Rate (৳/sqft)</label>
                <input
                  type="number"
                  value={formState.home.costEstimator.baseRatePerSqFt}
                  onChange={(e) => setFormState({
                    ...formState,
                    home: { ...formState.home, costEstimator: { ...formState.home.costEstimator, baseRatePerSqFt: Number(e.target.value) } }
                  })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Foundation Rate (৳/sqft)</label>
                <input
                  type="number"
                  value={formState.home.costEstimator.foundationRatePerSqFt}
                  onChange={(e) => setFormState({
                    ...formState,
                    home: { ...formState.home, costEstimator: { ...formState.home.costEstimator, foundationRatePerSqFt: Number(e.target.value) } }
                  })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">MEP & Utilities Rate (৳/sqft)</label>
                <input
                  type="number"
                  value={formState.home.costEstimator.mepRatePerSqFt}
                  onChange={(e) => setFormState({
                    ...formState,
                    home: { ...formState.home, costEstimator: { ...formState.home.costEstimator, mepRatePerSqFt: Number(e.target.value) } }
                  })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* 2. MD MESSAGE PAGE                                       */}
      {/* ======================================================== */}
      {activeSubTab === 'md' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Managing Director Profile & Strategic Message
                </h3>
                <p className="text-xs text-slate-500">Edit MD name, profile portrait, quote, and all official statement paragraphs.</p>
              </div>
              <button
                type="button"
                onClick={() => navigateTo('md-message')}
                className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline"
              >
                <span>Preview MD Page</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Executive Name</label>
                  <input
                    type="text"
                    value={formState.mdMessage.name}
                    onChange={(e) => setFormState({
                      ...formState,
                      mdMessage: { ...formState.mdMessage, name: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Designation & Role</label>
                  <input
                    type="text"
                    value={formState.mdMessage.designation}
                    onChange={(e) => setFormState({
                      ...formState,
                      mdMessage: { ...formState.mdMessage, designation: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Company</label>
                  <input
                    type="text"
                    value={formState.mdMessage.company}
                    onChange={(e) => setFormState({
                      ...formState,
                      mdMessage: { ...formState.mdMessage, company: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Experience Summary</label>
                  <input
                    type="text"
                    value={formState.mdMessage.experience}
                    onChange={(e) => setFormState({
                      ...formState,
                      mdMessage: { ...formState.mdMessage, experience: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Managing Director Official Portrait Photo"
                value={formState.mdMessage.avatarUrl}
                onChange={(newUrl) => setFormState({
                  ...formState,
                  mdMessage: { ...formState.mdMessage, avatarUrl: newUrl }
                })}
                helperText="Square or portrait aspect ratio recommended (e.g. 600x600 or 800x1000)"
              />

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Key Executive Quote</label>
                <textarea
                  rows={2}
                  value={formState.mdMessage.quote}
                  onChange={(e) => setFormState({
                    ...formState,
                    mdMessage: { ...formState.mdMessage, quote: e.target.value }
                  })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 italic font-medium"
                />
              </div>

              {/* MD Statement Paragraphs */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Message Body Paragraphs ({formState.mdMessage.paragraphs.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setFormState({
                        ...formState,
                        mdMessage: {
                          ...formState.mdMessage,
                          paragraphs: [...formState.mdMessage.paragraphs, 'New message paragraph...']
                        }
                      });
                    }}
                    className="text-xs text-[#e52424] font-bold flex items-center gap-1 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Paragraph</span>
                  </button>
                </div>

                {formState.mdMessage.paragraphs.map((para, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2">
                    <span className="text-[11px] font-mono text-slate-400 mt-2">#{pIdx + 1}</span>
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => {
                        const updated = [...formState.mdMessage.paragraphs];
                        updated[pIdx] = e.target.value;
                        setFormState({
                          ...formState,
                          mdMessage: { ...formState.mdMessage, paragraphs: updated }
                        });
                      }}
                      className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                    {formState.mdMessage.paragraphs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formState.mdMessage.paragraphs.filter((_, idx) => idx !== pIdx);
                          setFormState({
                            ...formState,
                            mdMessage: { ...formState.mdMessage, paragraphs: updated }
                          });
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors mt-2"
                        title="Delete paragraph"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. ABOUT US PAGE                                         */}
      {/* ======================================================== */}
      {activeSubTab === 'about' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  About Us Corporate Story & Gallery
                </h3>
                <p className="text-xs text-slate-500">Edit company story, key pillars, and multi-photo showcase.</p>
              </div>
              <button
                type="button"
                onClick={() => navigateTo('about')}
                className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline"
              >
                <span>Preview About Page</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Established Year</label>
                  <input
                    type="text"
                    value={formState.aboutPage.establishedYear}
                    onChange={(e) => setFormState({
                      ...formState,
                      aboutPage: { ...formState.aboutPage, establishedYear: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Total Corporate Clients</label>
                  <input
                    type="text"
                    value={formState.aboutPage.totalClients}
                    onChange={(e) => setFormState({
                      ...formState,
                      aboutPage: { ...formState.aboutPage, totalClients: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Happy Clients</label>
                  <input
                    type="text"
                    value={formState.aboutPage.happyClients}
                    onChange={(e) => setFormState({
                      ...formState,
                      aboutPage: { ...formState.aboutPage, happyClients: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Short Introduction</label>
                <textarea
                  rows={2}
                  value={formState.aboutPage.shortIntro}
                  onChange={(e) => setFormState({
                    ...formState,
                    aboutPage: { ...formState.aboutPage, shortIntro: e.target.value }
                  })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              {/* Full Paragraphs */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Full Story Paragraphs ({formState.aboutPage.paragraphs.length})
                </label>
                {formState.aboutPage.paragraphs.map((para, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400">Section {idx + 1}</span>
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => {
                        const updated = [...formState.aboutPage.paragraphs];
                        updated[idx] = e.target.value;
                        setFormState({
                          ...formState,
                          aboutPage: { ...formState.aboutPage, paragraphs: updated }
                        });
                      }}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                ))}
              </div>

              {/* About Gallery Images */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  About Page Gallery Photos (3 Images)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {formState.aboutPage.images.map((img, idx) => (
                    <ImageUploadField
                      key={idx}
                      label={`Showcase Image #${idx + 1}`}
                      value={img}
                      onChange={(newUrl) => {
                        const updated = [...formState.aboutPage.images];
                        updated[idx] = newUrl;
                        setFormState({
                          ...formState,
                          aboutPage: { ...formState.aboutPage, images: updated }
                        });
                      }}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. SERVICES & STAGES                                     */}
      {/* ======================================================== */}
      {activeSubTab === 'services' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Turnkey Services & Engineering Phases
                </h3>
                <p className="text-xs text-slate-500">
                  Pre-construction (10 stages), Construction (6 stages), Post-construction (4 stages).
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigateTo('services')}
                className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline"
              >
                <span>Preview Services Page</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { phase: 'pre-construction', title: 'Pre-Construction Work', count: '10 Stages', color: 'border-blue-200' },
                { phase: 'construction', title: 'Construction Execution', count: '6 Stages', color: 'border-amber-200' },
                { phase: 'post-construction', title: 'Post-Construction Handover', count: '4 Stages', color: 'border-emerald-200' },
              ].map((srv, idx) => (
                <div key={idx} className={`bg-white p-5 rounded-xl border ${srv.color} shadow-2xs space-y-3`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{srv.title}</span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                      {srv.count}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Stage details and deliverables are dynamically connected to navigation submenus.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigateTo('services', srv.phase)}
                    className="w-full text-xs font-bold py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Inspect Phase Breakdown</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. PRODUCTS CATALOGUE                                    */}
      {/* ======================================================== */}
      {activeSubTab === 'products' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  PEB Products, Structural Steel & Engineering Catalogue ({formState.products.length})
                </h3>
                <p className="text-xs text-slate-500">Add, edit, or remove products and replace product photography.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newProduct: SiteProductItem = {
                    id: `prod-${Date.now()}`,
                    title: 'New Steel Engineering Product',
                    category: 'Structural Steel',
                    description: 'Description of the steel or PEB product line...',
                    imageUrl: '/images/smart_steel_frame_1789123531862.jpg',
                    features: ['High tensile steel', 'Fast erection', 'BNBC compliant']
                  };
                  setFormState({
                    ...formState,
                    products: [newProduct, ...formState.products]
                  });
                }}
                className="bg-[#e52424] hover:bg-[#c91818] text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="space-y-4">
              {formState.products.map((prod, pIdx) => (
                <div key={prod.id} className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-2xs">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Product Title</label>
                        <input
                          type="text"
                          value={prod.title}
                          onChange={(e) => {
                            const updated = [...formState.products];
                            updated[pIdx].title = e.target.value;
                            setFormState({ ...formState, products: updated });
                          }}
                          className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Category & Badge</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={prod.category}
                            onChange={(e) => {
                              const updated = [...formState.products];
                              updated[pIdx].category = e.target.value;
                              setFormState({ ...formState, products: updated });
                            }}
                            className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                            placeholder="Category"
                          />
                          <input
                            type="text"
                            value={prod.badge || ''}
                            onChange={(e) => {
                              const updated = [...formState.products];
                              updated[pIdx].badge = e.target.value;
                              setFormState({ ...formState, products: updated });
                            }}
                            className="w-28 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-[#e52424]"
                            placeholder="Badge"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formState.products.filter((_, idx) => idx !== pIdx);
                        setFormState({ ...formState, products: updated });
                      }}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={prod.description}
                      onChange={(e) => {
                        const updated = [...formState.products];
                        updated[pIdx].description = e.target.value;
                        setFormState({ ...formState, products: updated });
                      }}
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>

                  <ImageUploadField
                    label="Product Photograph"
                    value={prod.imageUrl}
                    onChange={(newUrl) => {
                      const updated = [...formState.products];
                      updated[pIdx].imageUrl = newUrl;
                      setFormState({ ...formState, products: updated });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. CUSTOMERS & CLIENTS                                   */}
      {/* ======================================================== */}
      {activeSubTab === 'customers' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Corporate Clients & Industrial Partners ({formState.customers.items.length})
                </h3>
                <p className="text-xs text-slate-500">Manage client companies, sister concerns, locations, and industries.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newClient: CustomerItem = {
                    id: `c-${Date.now()}`,
                    name: 'New Industrial Client Ltd.',
                    group: 'Group of Industries',
                    location: 'Dhaka, Bangladesh',
                    category: 'Textile & Garments'
                  };
                  setFormState({
                    ...formState,
                    customers: {
                      ...formState.customers,
                      items: [newClient, ...formState.customers.items]
                    }
                  });
                }}
                className="bg-[#e52424] hover:bg-[#c91818] text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Client</span>
              </button>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Page Header Title</label>
                  <input
                    type="text"
                    value={formState.customers.title}
                    onChange={(e) => setFormState({
                      ...formState,
                      customers: { ...formState.customers, title: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Page Subtitle</label>
                  <input
                    type="text"
                    value={formState.customers.description}
                    onChange={(e) => setFormState({
                      ...formState,
                      customers: { ...formState.customers, description: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formState.customers.items.map((client, cIdx) => (
                <div key={client.id} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 relative group shadow-2xs">
                  <div className="flex items-start justify-between">
                    <input
                      type="text"
                      value={client.name}
                      onChange={(e) => {
                        const updated = [...formState.customers.items];
                        updated[cIdx].name = e.target.value;
                        setFormState({
                          ...formState,
                          customers: { ...formState.customers, items: updated }
                        });
                      }}
                      className="text-xs font-bold text-slate-900 bg-slate-50 p-1.5 rounded-lg w-3/4 border border-slate-200"
                      placeholder="Client Name"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formState.customers.items.filter((_, idx) => idx !== cIdx);
                        setFormState({
                          ...formState,
                          customers: { ...formState.customers, items: updated }
                        });
                      }}
                      className="text-slate-400 hover:text-red-600 p-1"
                      title="Delete Client"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={client.group || ''}
                      onChange={(e) => {
                        const updated = [...formState.customers.items];
                        updated[cIdx].group = e.target.value;
                        setFormState({
                          ...formState,
                          customers: { ...formState.customers, items: updated }
                        });
                      }}
                      placeholder="Sister Concern of..."
                      className="text-[11px] p-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={client.category}
                      onChange={(e) => {
                        const updated = [...formState.customers.items];
                        updated[cIdx].category = e.target.value;
                        setFormState({
                          ...formState,
                          customers: { ...formState.customers, items: updated }
                        });
                      }}
                      placeholder="Category"
                      className="text-[11px] p-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700"
                    />
                  </div>

                  <input
                    type="text"
                    value={client.location}
                    onChange={(e) => {
                      const updated = [...formState.customers.items];
                      updated[cIdx].location = e.target.value;
                      setFormState({
                        ...formState,
                        customers: { ...formState.customers, items: updated }
                      });
                    }}
                    placeholder="Location"
                    className="w-full text-[11px] p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. CONTACT & OFFICES                                     */}
      {/* ======================================================== */}
      {activeSubTab === 'contact' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Head Office, Factory, Hotlines & Google Maps
                </h3>
                <p className="text-xs text-slate-500">Edit public contact numbers, email addresses, and map embed URL.</p>
              </div>
              <button
                type="button"
                onClick={() => navigateTo('contact')}
                className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline"
              >
                <span>Preview Contact Page</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Head Office Address</label>
                  <textarea
                    rows={2}
                    value={formState.contact.headOfficeAddress}
                    onChange={(e) => setFormState({
                      ...formState,
                      contact: { ...formState.contact, headOfficeAddress: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Factory Location</label>
                  <textarea
                    rows={2}
                    value={formState.contact.factoryAddress}
                    onChange={(e) => setFormState({
                      ...formState,
                      contact: { ...formState.contact, factoryAddress: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Primary Phone</label>
                  <input
                    type="text"
                    value={formState.contact.phone}
                    onChange={(e) => setFormState({
                      ...formState,
                      contact: { ...formState.contact, phone: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Secondary Phone</label>
                  <input
                    type="text"
                    value={formState.contact.phoneSecondary}
                    onChange={(e) => setFormState({
                      ...formState,
                      contact: { ...formState.contact, phoneSecondary: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Hotline</label>
                  <input
                    type="text"
                    value={formState.contact.hotline}
                    onChange={(e) => setFormState({
                      ...formState,
                      contact: { ...formState.contact, hotline: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-[#e52424]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Official Email</label>
                  <input
                    type="email"
                    value={formState.contact.email}
                    onChange={(e) => setFormState({
                      ...formState,
                      contact: { ...formState.contact, email: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Support Email</label>
                  <input
                    type="email"
                    value={formState.contact.emailSupport}
                    onChange={(e) => setFormState({
                      ...formState,
                      contact: { ...formState.contact, emailSupport: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={formState.contact.whatsappNumber}
                    onChange={(e) => setFormState({
                      ...formState,
                      contact: { ...formState.contact, whatsappNumber: e.target.value }
                    })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Business Hours</label>
                <input
                  type="text"
                  value={formState.contact.businessHours}
                  onChange={(e) => setFormState({
                    ...formState,
                    contact: { ...formState.contact, businessHours: e.target.value }
                  })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Google Maps Embed URL</label>
                <input
                  type="text"
                  value={formState.contact.googleMapsUrl}
                  onChange={(e) => setFormState({
                    ...formState,
                    contact: { ...formState.contact, googleMapsUrl: e.target.value }
                  })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-600 text-[11px]"
                />
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
