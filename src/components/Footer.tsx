import React from 'react';
import { Instagram, MessageCircle, Facebook, Sparkles, Heart } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';
import { useShop } from '../context/ShopContext';
import { buildWhatsAppLink, generateGeneralHelpMessage } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const { scrollToShopWithCategory, setIsSizeGuideOpen } = useShop();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#2D2D2D] text-[#FDFCF9] pt-14 pb-10 border-t border-[#444444]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#444444]">
          
          {/* Column 1: Brand & Tagline (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-white uppercase">
                {storeConfig.brandName}
              </span>
              <p className="text-[10px] uppercase tracking-widest text-[#C27E6E] mt-0.5 font-medium">
                Boutique Fashion Studio
              </p>
            </div>
            
            <p className="text-xs text-[#E8E2D6] leading-relaxed max-w-sm">
              {storeConfig.tagline} Thoughtfully designed women's fashion celebrating natural fabrics, graceful silhouettes, and accessible luxury.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={storeConfig.instagramURL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#3C3C3C] hover:bg-[#C27E6E] text-[#FDFCF9] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={buildWhatsAppLink(generateGeneralHelpMessage())}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-[#3C3C3C] hover:bg-[#25D366] text-[#FDFCF9] flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={storeConfig.facebookURL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#3C3C3C] hover:bg-[#C27E6E] text-[#FDFCF9] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#E8E2D6]">
              <li>
                <button onClick={() => scrollToShopWithCategory('New Arrivals')} className="hover:text-white transition-colors cursor-pointer">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('best-sellers-section')} className="hover:text-white transition-colors cursor-pointer">
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => scrollToShopWithCategory('Kurtis')} className="hover:text-white transition-colors cursor-pointer">
                  Kurtis & Tunics
                </button>
              </li>
              <li>
                <button onClick={() => scrollToShopWithCategory('Dresses')} className="hover:text-white transition-colors cursor-pointer">
                  Dresses & Gowns
                </button>
              </li>
              <li>
                <button onClick={() => scrollToShopWithCategory('Co-ord Sets')} className="hover:text-white transition-colors cursor-pointer">
                  Linen Co-ord Sets
                </button>
              </li>
              <li>
                <button onClick={() => scrollToShopWithCategory('Dress Materials')} className="hover:text-white transition-colors cursor-pointer">
                  Unstitched Dress Materials
                </button>
              </li>
              <li>
                <button onClick={() => scrollToShopWithCategory('Ethnic Wear')} className="hover:text-white transition-colors cursor-pointer">
                  Ethnic & Festive Wear
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Policies (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-[#E8E2D6]">
              <li>
                <button onClick={() => scrollTo('contact-section')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Boutique
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('faq-section')} className="hover:text-white transition-colors cursor-pointer">
                  Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('faq-section')} className="hover:text-white transition-colors cursor-pointer">
                  Exchange & Returns
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('faq-section')} className="hover:text-white transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-white text-[#C27E6E] font-medium transition-colors cursor-pointer">
                  Size Guide & Matrix
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: WhatsApp Ordering Info (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white">
              Boutique Assistance
            </h4>
            <p className="text-xs text-[#E8E2D6] leading-relaxed">
              We specialize in personal assistance. Contact our styling desk on WhatsApp for fabric videos and custom sizing.
            </p>

            <div className="pt-1">
              <a
                href={buildWhatsAppLink(generateGeneralHelpMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#3C3C3C] hover:bg-[#C27E6E] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-[#555555]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Text Us: {storeConfig.formattedWhatsAppNumber}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A0A0A0] gap-4 text-center sm:text-left">
          <p>© 2026 {storeConfig.brandName}. All rights reserved.</p>
          <div className="flex items-center gap-1 text-[#C27E6E]">
            <span>Everyday Elegance, Beautifully Crafted.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
