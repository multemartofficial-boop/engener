import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Smart Engineering Steel Building',
  fallbackSrc = '/images/smart_steel_factory_1789123518500.jpg',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [failedTwice, setFailedTwice] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    } else {
      setFailedTwice(true);
    }
  };

  if (failedTwice) {
    return (
      <div className={`bg-slate-900 flex flex-col items-center justify-center text-slate-400 p-4 select-none ${className}`}>
        <svg className="w-8 h-8 text-slate-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-center line-clamp-1">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={hasError ? fallbackSrc : (src || fallbackSrc)}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={handleError}
      {...props}
    />
  );
};
