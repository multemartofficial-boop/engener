import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Check, Sparkles, RefreshCw, Link as LinkIcon, FileCheck } from 'lucide-react';
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
  placeholder = 'Or paste image URL...',
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processAndUploadFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WEBP, SVG).');
      return;
    }

    setIsProcessing(true);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) {
        setIsProcessing(false);
        return;
      }

      // If SVG, no canvas compression needed
      if (file.type === 'image/svg+xml') {
        onChange(result);
        setIsProcessing(false);
        return;
      }

      // Client-side canvas optimization: Keep max dimension 1600px to ensure fast load and storage
      const img = new Image();
      img.onload = () => {
        try {
          const maxDim = 1600;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimized = canvas.toDataURL('image/jpeg', 0.88);
            onChange(optimized);
          } else {
            onChange(result);
          }
        } catch {
          onChange(result);
        } finally {
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        onChange(result);
        setIsProcessing(false);
      };

      img.src = result;
    };

    reader.onerror = () => {
      alert('Failed to read image file. Please try another image.');
      setIsProcessing(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndUploadFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processAndUploadFile(file);
    }
  };

  const handleRemove = () => {
    onChange('');
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
          {label}
        </label>
        
        {/* Toggle secondary actions */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => {
              setShowUrlInput(!showUrlInput);
              if (showPresets) setShowPresets(false);
            }}
            className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium transition-colors cursor-pointer"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? 'Hide URL' : 'Use URL'}</span>
          </button>

          <span className="text-slate-300">•</span>

          <button
            type="button"
            onClick={() => {
              setShowPresets(!showPresets);
              if (showUrlInput) setShowUrlInput(false);
            }}
            className="text-amber-600 hover:text-amber-700 flex items-center gap-1 font-medium transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>Presets</span>
          </button>
        </div>
      </div>

      {/* Main Upload / Preview Area */}
      {value ? (
        /* Image Uploaded State */
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-4 transition-all">
          {/* Thumbnail preview */}
          <div className="w-full sm:w-32 h-28 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-200 shadow-2xs relative group">
            <SafeImage
              src={value}
              alt="Uploaded Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 bg-white text-slate-900 rounded-full hover:bg-amber-400 transition-colors shadow-sm"
                title="Change Image"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="w-full flex-1 flex flex-col justify-between py-1 space-y-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Image Loaded & Ready</span>
              </div>
              <p className="text-[11px] text-slate-500 truncate max-w-sm mt-0.5">
                {fileName || (value.startsWith('data:') ? 'Custom Uploaded Image' : value)}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Change Image</span>
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-lg border border-red-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Upload Zone State */
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
            isDragging
              ? 'border-[#e52424] bg-red-50/50 scale-[1.005]'
              : 'border-slate-300 hover:border-[#e52424]/60 bg-slate-50/70 hover:bg-slate-50'
          }`}
        >
          {isProcessing ? (
            <div className="py-3 flex flex-col items-center gap-2">
              <RefreshCw className="w-6 h-6 text-[#e52424] animate-spin" />
              <span className="text-xs font-bold text-slate-700">Processing & Optimizing Image...</span>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-red-50 text-[#e52424] flex items-center justify-center border border-red-100 shadow-2xs">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Click to select image <span className="text-slate-500 font-normal">or drag & drop here</span>
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Supports PNG, JPG, WEBP, SVG • Auto-optimized for web
                </p>
              </div>
              <button
                type="button"
                className="mt-1 px-3.5 py-1.5 bg-[#e52424] hover:bg-[#c91d1d] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 pointer-events-none"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Upload from Device</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Optional URL Input drawer */}
      {showUrlInput && (
        <div className="pt-1 animate-in fade-in">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <LinkIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setFileName(null);
                onChange(e.target.value);
              }}
              placeholder={placeholder}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#e52424]"
            />
          </div>
        </div>
      )}

      {/* Presets Library Drawer */}
      {showPresets && (
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Pre-approved Steel Construction Photos:</span>
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
                  setFileName(preset.name);
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

      {helperText && (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      )}
    </div>
  );
};

