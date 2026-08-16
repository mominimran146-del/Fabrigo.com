import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';
import { buildWhatsAppLink, generateGeneralHelpMessage } from '../utils/whatsapp';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="Announcement" className="bg-[#1E1E1E] text-[#FDFCF9] text-xs py-2.5 px-4 border-b border-[#2D2D2D] transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
        <div className="flex items-center gap-2 font-medium tracking-wider text-[11px] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#C27E6E] animate-pulse" />
          <span>
            Boutique Collection: Free shipping on orders above {storeConfig.currency}{storeConfig.freeShippingThreshold}
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-[11px] text-[#E8E2D6]">
          <a
            href={buildWhatsAppLink(generateGeneralHelpMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#C27E6E] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#C27E6E]" />
            <span>Need sizing advice? Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
