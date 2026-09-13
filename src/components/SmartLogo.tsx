import React from 'react';

interface SmartLogoProps {
  lightMode?: boolean; // if true, uses white text version for dark backgrounds
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SmartLogo: React.FC<SmartLogoProps> = ({ 
  lightMode = false, 
  className = '',
  size = 'md'
}) => {
  // Height classes depending on size
  const heightClass = 
    size === 'sm' ? 'h-8 sm:h-9' :
    size === 'lg' ? 'h-14 sm:h-16' :
    size === 'xl' ? 'h-16 sm:h-20' :
    'h-10 sm:h-12 md:h-14';

  const imageSrc = lightMode ? '/images/S_white.png' : '/images/S.png';

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={imageSrc}
        alt="Smart Engineering"
        className={`${heightClass} w-auto object-contain max-w-full drop-shadow-xs transition-transform duration-200 hover:scale-[1.02]`}
        referrerPolicy="no-referrer"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

