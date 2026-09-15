import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Image as ImageIcon, 
  X, 
  Calendar, 
  Tag, 
  Eye
} from 'lucide-react';
import { GalleryItem } from '../../types';
import { ImageUploadField } from './ImageUploadField';

export const GalleryManager: React.FC = () => {
  const { gallery, addGalleryItem, editGalleryItem, deleteGalleryItem } = useApp();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    category: 'erection',
    categoryLabel: 'Steel Erection',
    imageUrl: '',
    caption: '',
    altText: '',
    date: 'March 2024'
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'erection',
      categoryLabel: 'Steel Erection',
      imageUrl: '/src/assets/images/smart_steel_hero_1789123504292.jpg',
      caption: '',
      altText: '',
      date: 'March 2024'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      categoryLabel: item.categoryLabel,
      imageUrl: item.imageUrl,
      caption: item.caption,
      altText: item.altText,
      date: item.date
    });
    setIsModalOpen(true);
  };

  const handleCategoryChange = (cat: GalleryItem['category']) => {
    let label = 'Steel Erection';
    if (cat === 'factory') label = 'Completed Facilities';
    if (cat === 'framing') label = 'Steel Frameworks';
    if (cat === 'visualization') label = '3D BIM Visualization';

    setFormData(prev => ({
      ...prev,
      category: cat,
      categoryLabel: label
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.imageUrl.trim()) return;

    if (editingId) {
      editGalleryItem(editingId, formData);
    } else {
      addGalleryItem(formData);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-600" />
            <span>Gallery Media & SEO Images Manager</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Add on-site photos, 3D BIM renders, update captions, and optimize Alt tags for Google SEO ranking in Bangladesh.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-3.5 py-2 rounded-md transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Image to Gallery</span>
        </button>
      </div>

      {/* Grid of Gallery Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
          >
            <div className="relative aspect-16/10 bg-slate-950 overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.altText} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
              <span className="absolute top-2 left-2 bg-slate-900/80 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">
                {item.categoryLabel}
              </span>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1 mb-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-2">
                  {item.caption}
                </p>
                <div className="text-[10px] text-slate-400 bg-slate-50 p-1.5 rounded border border-slate-100 mb-3">
                  <span className="font-semibold text-slate-600 block">SEO Alt Tag:</span>
                  <span className="italic truncate block">{item.altText}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-[10px] text-slate-400">{item.date}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1 text-slate-600 hover:text-slate-900 rounded"
                    title="Edit Item"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete image "${item.title}"?`)) {
                        deleteGalleryItem(item.id);
                      }
                    }}
                    className="p-1 text-red-500 hover:text-red-700 rounded"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="text-sm font-bold text-slate-900">
                {editingId ? 'Edit Gallery Item' : 'Add New Gallery Item'}
              </h4>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Image Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Narayanganj Heavy Truss Erection Lift"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <ImageUploadField
                label="Gallery Image *"
                value={formData.imageUrl}
                onChange={(newUrl) => setFormData({ ...formData, imageUrl: newUrl })}
                helperText="Upload steel construction or factory photo from your device (JPG, PNG, WEBP)."
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleCategoryChange(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="erection">Steel Erection</option>
                    <option value="factory">Completed Facilities</option>
                    <option value="framing">Steel Frameworks</option>
                    <option value="visualization">3D BIM Visualization</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Date / Month
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Caption / Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Detail what is shown in the image (e.g. crane lift, high-tensile connection...)"
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  SEO Alt Tag Text (Important for Google Search)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Steel building construction in Bangladesh by Smart Engineering"
                  value={formData.altText}
                  onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                >
                  Save Image
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
