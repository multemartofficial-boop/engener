import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Check, Sparkles } from 'lucide-react';
import { SafeImage } from '../SafeImage';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
  helperText?: string;
  placeholder?: string;
  className?: string;
}

const INDUSTRIAL_IMAGE_PRESETS = [
  { name: 'Factory Superstructure', url: '/images/smart_steel_factory_1789123518500.jpg' },
  { name: 'PEB Steel Frame', url: '/images/smart_steel_frame_1789123531862.jpg' },
  { name: 'Crane Erection Site', url: '/images/smart_steel_erect_1789123548062.jpg' },
  { name: 'Heavy Industrial Plant', url: '/images/smart_steel_hero_1789123504292.jpg' },
  { name: 'Multi-Story Steel Building', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Automated Logistics Hub', url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Executive MD Portrait', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80' },
  { name: 'Commercial Highrise', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80' }
];

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  placeholder = 'Enter image URL or choose file/preset...',
  className = ''
}) => {
  const [mode, setMode] = useState<'upload' | 'url' | 'presets'>('upload');
  const [showPresets, setShowPresets] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: max 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file is too large. Please select an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
        
        {/* Input Method Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px] font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded-md transition-all ${
              mode === 'upload' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded-md transition-all ${
              mode === 'url' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            URL
          </button>
          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1 ${
              showPresets ? 'bg-amber-100 text-amber-900 font-bold' : 'hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Presets</span>
          </button>
        </div>
      </div>

      {/* Main Preview and Input Area */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        
        {/* Thumbnail Preview Box */}
        <div className="sm:col-span-4 relative group h-28 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center">
          {value ? (
            <>
              <SafeImage
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-red-600 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100 shadow-xs"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="text-center p-3 text-slate-400">
              <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-50" />
              <span className="text-[11px] block">No image selected</span>
            </div>
          )}
        </div>

        {/* Input / Upload Controller */}
        <div className="sm:col-span-8 space-y-2">
          {mode === 'upload' ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-[#e52424] bg-red-50/50'
                  : 'border-slate-300 hover:border-slate-400 bg-slate-50/70 hover:bg-slate-50'
              }`}
            >
              <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
              <p className="text-xs font-semibold text-slate-700">
                Click to browse or drag & drop image
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Supports JPG, PNG, WEBP, SVG (up to 5MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <LinkIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#e52424]"
              />
            </div>
          )}

          {helperText && (
            <p className="text-[11px] text-slate-500">{helperText}</p>
          )}
        </div>

      </div>

      {/* Preset Library Dropdown Drawer */}
      {showPresets && (
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mt-2 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Select from Pre-Approved Steel & Construction Photos:</span>
            <button
              type="button"
              onClick={() => setShowPresets(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {INDUSTRIAL_IMAGE_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChange(preset.url);
                  setShowPresets(false);
                }}
                className={`text-left p-1.5 rounded-lg border transition-all flex flex-col items-center gap-1 group ${
                  value === preset.url
                    ? 'border-[#e52424] bg-red-50/50 ring-1 ring-[#e52424]'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-full h-14 rounded-md overflow-hidden bg-slate-100 relative">
                  <SafeImage
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {value === preset.url && (
                    <div className="absolute inset-0 bg-[#e52424]/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white bg-[#e52424] rounded-full p-0.5" />
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-medium text-slate-700 truncate w-full text-center">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
