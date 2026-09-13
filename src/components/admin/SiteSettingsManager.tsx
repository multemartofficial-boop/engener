import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  Save, 
  RotateCcw, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Building2,
  ShieldAlert
} from 'lucide-react';

export const SiteSettingsManager: React.FC = () => {
  const { settings, updateSettings, resetToDefaults } = useApp();
  
  const [form, setForm] = useState(settings);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all site data (menus, projects, gallery, inquiries) back to the default demo values? Any manual edits will be reverted.')) {
      resetToDefaults();
      setForm(settings);
      alert('Site data successfully reset to default Smart Engineering data.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-600" />
            <span>Company Profile & Site Settings</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Update phone hotlines, office location, corporate bio, and engineering metrics displayed across the site.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 bg-white hover:bg-red-50 text-red-600 text-xs font-semibold px-3 py-1.5 rounded border border-red-200 transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Factory Defaults</span>
        </button>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Settings successfully saved and synchronized across the website!</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5 text-xs">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Primary Hotline Phone
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Secondary / WhatsApp Number
            </label>
            <input
              type="text"
              value={form.phoneSecondary}
              onChange={(e) => setForm({ ...form, phoneSecondary: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Official Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Office Suite & Street Address
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              City & Postal Code
            </label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">
            Official Business Hours
          </label>
          <input
            type="text"
            value={form.businessHours}
            onChange={(e) => setForm({ ...form, businessHours: e.target.value })}
            className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">
            Company Tagline / Value Proposition
          </label>
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">
            Corporate Short Bio
          </label>
          <textarea
            rows={3}
            value={form.shortBio}
            onChange={(e) => setForm({ ...form, shortBio: e.target.value })}
            className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed"
          />
        </div>

        {/* Counters & Engineering Stats */}
        <div className="pt-2 border-t border-slate-200">
          <label className="block font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
            Public Statistics & Metrics Ticker
          </label>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">
                Completed Projects
              </label>
              <input
                type="number"
                value={form.completedProjectsCount}
                onChange={(e) => setForm({ ...form, completedProjectsCount: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">
                Total Covered Area
              </label>
              <input
                type="text"
                value={form.totalSqFtBuilt}
                onChange={(e) => setForm({ ...form, totalSqFtBuilt: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">
                Steel Fabricated
              </label>
              <input
                type="text"
                value={form.steelFabricatedTons}
                onChange={(e) => setForm({ ...form, steelFabricatedTons: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">
                Satisfaction Rate
              </label>
              <input
                type="text"
                value={form.clientSatisfactionRate}
                onChange={(e) => setForm({ ...form, clientSatisfactionRate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 font-bold"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            type="submit"
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-lg uppercase tracking-wider transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save All Company Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
};
