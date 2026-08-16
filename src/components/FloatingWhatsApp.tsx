import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';
import { buildWhatsAppLink, generateGeneralHelpMessage } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showBubble, setShowBubble] = useState(true);

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Floating Prompt Bubble */}
      {showBubble && (
        <div className="hidden sm:flex items-center gap-2 bg-[#FDFCF9] text-[#2D2D2D] px-3.5 py-2 rounded-2xl shadow-xl border border-[#E8E2D6] text-xs font-medium animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Need help choosing a size? <strong>Chat with us!</strong></span>
          <button
            onClick={() => setShowBubble(false)}
            className="text-[#8C8680] hover:text-[#2D2D2D] ml-1 cursor-pointer"
            aria-label="Dismiss chat bubble"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={buildWhatsAppLink(generateGeneralHelpMessage())}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Fabrigo Boutique on WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:scale-108 transition-all duration-300 flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
      </a>
    </div>
  );
};
