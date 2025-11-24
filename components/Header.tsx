import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  theme?: 'light' | 'dark';
  className?: string;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  onBack, 
  rightElement, 
  theme = 'light',
  className = '',
  children
}) => {
  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-[#1F2937] text-white' : 'bg-white text-gray-900';
  const hoverClass = isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100';

  return (
    <div className={`${bgClass} sticky top-0 z-20 shadow-sm transition-colors ${className}`}>
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center w-12">
          {onBack && (
            <button 
              onClick={onBack} 
              className={`p-1 -ml-1 rounded-full ${hoverClass} active:scale-95 transition-all`}
            >
              <ChevronLeft size={24} />
            </button>
          )}
        </div>
        
        <span className="font-bold text-lg flex-1 text-center truncate">{title}</span>
        
        <div className="flex items-center justify-end w-12">
          {rightElement}
        </div>
      </div>
      {children}
    </div>
  );
};
