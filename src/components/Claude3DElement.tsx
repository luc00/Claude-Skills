import React, { useState } from 'react';

interface Claude3DElementProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  showBadge?: boolean;
  interactive?: boolean;
  caption?: string;
}

export const Claude3DElement: React.FC<Claude3DElementProps> = ({
  size = 'md',
  className = '',
  showBadge = true,
  interactive = true,
  caption
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const sizeClasses = {
    sm: 'w-20 h-20 sm:w-24 sm:h-24',
    md: 'w-32 h-32 sm:w-40 sm:h-40',
    lg: 'w-48 h-48 sm:w-56 sm:h-56',
    hero: 'w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80'
  };

  const handleInteraction = () => {
    if (!interactive) return;
    setClickCount(prev => prev + 1);
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      
      {/* Ambient Terracotta Glow underneath (subtle and warm) */}
      <div 
        className="absolute -inset-4 rounded-full bg-[#D97757]/15 blur-2xl pointer-events-none transition-all duration-700"
        style={{
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
          opacity: isHovered ? 0.8 : 0.5
        }}
      />

      {/* Floating 3D Claude Sphere without background */}
      <div
        onClick={handleInteraction}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative ${sizeClasses[size]} cursor-pointer transition-transform duration-500 ease-out group`}
        style={{
          transform: isHovered 
            ? 'translateY(-8px) scale(1.06) rotate(3deg)' 
            : 'translateY(0px) scale(1) rotate(0deg)'
        }}
        title="Elemento 3D Claude AI Ufficiale"
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/aistudio/claude-3d-logo-free-png_8dd66c32.webp`}
          alt="Claude AI 3D Spherical Emblem"
          className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(217,119,87,0.3)] transition-all duration-500 group-hover:drop-shadow-[0_25px_45px_rgba(217,119,87,0.45)]"
          draggable={false}
        />

        {/* Dynamic levitation shadow on "ground" */}
        <div 
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-black/40 blur-md rounded-full pointer-events-none transition-all duration-500"
          style={{
            transform: isHovered ? 'translateX(-50%) scale(0.85)' : 'translateX(-50%) scale(1)',
            opacity: isHovered ? 0.3 : 0.6
          }}
        />
      </div>

    </div>
  );
};
