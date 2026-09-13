import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  X, 
  Building, 
  CheckCircle, 
  Clock, 
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';
import { Project } from '../../types';

export const ProjectsManager: React.FC = () => {
  const { projects, addProject, editProject, deleteProject } = useApp();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    category: 'industrial',
    categoryLabel: 'Industrial Manufacturing',
    client: '',
    location: '',
    coveredArea: '',
    steelTonnage: '',
    year: '2024',
    status: 'Completed',
    description: '',
    imageUrl: '',
    scope: ['Structural Steel Design & Analysis', 'Fabrication of Heavy I-Beams', 'Mobile Crane Erection'],
    featured: false
  });

  const [scopeInput, setScopeInput] = useState('');

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'industrial',
      categoryLabel: 'Industrial Manufacturing',
      client: '',
      location: 'Gazipur, Bangladesh',
      coveredArea: '60,000 Sq. Ft.',
      steelTonnage: '350 Metric Tons',
      year: new Date().getFullYear().toString(),
      status: 'Completed',
      description: '',
      imageUrl: '/src/assets/images/smart_steel_factory_1789123518500.jpg',
      scope: ['Digital Land Survey', 'PEB Superstructure Fabrication', 'Sandwich Panel Cladding'],
      featured: false
    });
    setScopeInput('Digital Land Survey\nPEB Superstructure Fabrication\nSandwich Panel Cladding');
    setIsModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingId(proj.id);
    setFormData({
      title: proj.title,
      category: proj.category,
      categoryLabel: proj.categoryLabel,
      client: proj.client,
      location: proj.location,
      coveredArea: proj.coveredArea,
      steelTonnage: proj.steelTonnage,
      year: proj.year,
      status: proj.status,
      description: proj.description,
      imageUrl: proj.imageUrl,
      scope: proj.scope,
      featured: proj.featured
    });
    setScopeInput(proj.scope.join('\n'));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const parsedScope = scopeInput
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const projectToSave = {
      ...formData,
      scope: parsedScope.length > 0 ? parsedScope : ['Pre-Engineered Structural Steel Construction']
    };

    if (editingId) {
      editProject(editingId, projectToSave);
    } else {
      addProject(projectToSave);
    }

    setIsModalOpen(false);
  };

  const handleCategoryChange = (cat: Project['category']) => {
    let label = 'Industrial Manufacturing';
    if (cat === 'warehouse') label = 'Warehouses & Logistics';
    if (cat === 'commercial') label = 'Commercial & Multi-Story';
    if (cat === 'agro') label = 'Agro & Cold Storage';
    if (cat === 'ongoing') label = 'Active Sites';

    setFormData(prev => ({
      ...prev,
      category: cat,
      categoryLabel: label
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-5 h-5 text-amber-600" />
            <span>Steel Building Projects Manager</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Add new completed or ongoing construction projects, update covered area, tonnage, and image URLs.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-3.5 py-2 rounded-md transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter projects by title, district, client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white pl-9 pr-3 py-2 text-xs rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Project / Thumbnail</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Area & Tonnage</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded bg-slate-950 overflow-hidden shrink-0 border border-slate-200">
                        <img 
                          src={p.imageUrl} 
                          alt={p.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{p.title}</div>
                        <div className="text-[11px] text-slate-400">{p.client} ({p.year})</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                      {p.categoryLabel}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-medium">
                    {p.location}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{p.coveredArea}</div>
                    <div className="text-[11px] text-amber-700 font-bold">{p.steelTonnage}</div>
                  </td>
                  <td className="py-3 px-4">
                    {p.status === 'Completed' ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">
                        <CheckCircle className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[10px] font-bold">
                        <Clock className="w-3 h-3" />
                        <span>Ongoing</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
                        title="Edit Project"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${p.title}"?`)) {
                            deleteProject(p.id);
                          }
                        }}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="text-base font-bold text-slate-900 font-display">
                {editingId ? 'Edit Steel Project' : 'Add New Steel Project'}
              </h4>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Spinning Mill Shed - Gazipur"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Akij Group"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Location / District
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Savar, Dhaka"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleCategoryChange(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="industrial">Industrial Plant</option>
                    <option value="warehouse">Warehouse & Logistics</option>
                    <option value="commercial">Commercial Multi-Story</option>
                    <option value="agro">Agro & Cold Storage</option>
                    <option value="ongoing">Active Site</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing / Under Construction</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Completion Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Covered Floor Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 150,000 Sq. Ft."
                    value={formData.coveredArea}
                    onChange={(e) => setFormData({ ...formData, coveredArea: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Steel Tonnage
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 850 Metric Tons"
                    value={formData.steelTonnage}
                    onChange={(e) => setFormData({ ...formData, steelTonnage: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Project Image URL *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. /src/assets/images/... or https://..."
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-[11px]"
                  />
                  {formData.imageUrl && (
                    <div className="w-10 h-9 rounded bg-slate-950 overflow-hidden shrink-0 border border-slate-300">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Description & Key Engineering Specs
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail the clear span distance, overhead crane rating, wind load rating, roofing type..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Scope of Work (Enter 1 item per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Digital Land Surveying&#10;Structural Analysis in ETABS&#10;Fabrication of Welded I-Beams&#10;50mm PU Sandwich Panel Cladding"
                  value={scopeInput}
                  onChange={(e) => setScopeInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                >
                  Save Project
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
