import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top of page"
      className="hidden sm:flex fixed bottom-6 left-6 z-30 w-10 h-10 rounded-full bg-[#FDFCF9]/90 backdrop-blur-md border border-[#E8E2D6] text-[#2D2D2D] shadow-md hover:bg-[#2D2D2D] hover:text-[#FDFCF9] items-center justify-center transition-all duration-200 cursor-pointer"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};
