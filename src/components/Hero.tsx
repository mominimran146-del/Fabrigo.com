import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8F5F0] via-[#FDFCF9] to-[#FDFCF9] pt-8 pb-14 sm:pt-14 sm:pb-22 border-b border-[#E8E2D6]">
      {/* Subtle organic background aura */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8E2D6]/40 rounded-full blur-3xl -z-10 pointer-events-none transform translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E8E2D6]/30 rounded-full blur-3xl -z-10 pointer-events-none transform -translate-x-1/3 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Editorial Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Boutique Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDFCF9] border border-[#E8E2D6] shadow-2xs text-xs font-medium text-[#2D2D2D]">
              <Sparkles className="w-3.5 h-3.5 text-[#C27E6E]" />
              <span className="tracking-[0.2em] uppercase text-[10px] font-semibold text-[#2D2D2D]">New Season 2026 Boutique Edit</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#2D2D2D] leading-[1.15] tracking-tight">
                Everyday Elegance, <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#C27E6E]">Beautifully Crafted.</span>
              </h1>
              <p className="text-[#666666] text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Discover thoughtfully selected fashion pieces designed to bring effortless grace, breathable luxury, and timeless poise to your everyday wardrobe.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                id="hero-shop-new-arrivals-btn"
                onClick={() => scrollTo('new-arrivals-section')}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#2D2D2D] text-[#FDFCF9] hover:bg-[#C27E6E] text-xs font-semibold tracking-[0.2em] uppercase rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#E8E2D6]" />
              </button>

              <button
                id="hero-explore-collection-btn"
                onClick={() => scrollTo('shop-section')}
                className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-[#F8F5F0] text-[#2D2D2D] hover:border-[#C27E6E] border border-[#E8E2D6] text-xs font-semibold tracking-[0.2em] uppercase rounded-full transition-all duration-200 cursor-pointer"
              >
                <span>Explore Collection</span>
              </button>
            </div>

            {/* Sub Highlights */}
            <div className="pt-4 sm:pt-6 border-t border-[#E8E2D6] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#7A7571]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C27E6E]" />
                <span>Pure Cotton & Silk Blends</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#C27E6E]" />
                <span>Personal WhatsApp Sizing Concierge</span>
              </div>
            </div>

          </div>

          {/* Right Fashion Editorial Mosaic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-3/4 bg-[#E8E2D6]">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85"
                  alt="Fabrigo Boutique Everyday Elegance"
                  className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                
                {/* Floating Taglet on Image */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#FDFCF9]/95 backdrop-blur-md rounded-xl p-3.5 border border-[#E8E2D6] shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#8C8680] font-semibold">Featured Edit</p>
                      <p className="text-xs font-serif font-bold text-[#2D2D2D]">Chanderi & Mulmul Kurtis</p>
                    </div>
                    <span className="text-xs font-bold text-[#C27E6E]">From {storeConfig.currency}699</span>
                  </div>
                </div>
              </div>

              {/* Secondary Floating Mini Card */}
              <div className="hidden sm:block absolute -top-4 -left-6 bg-white rounded-xl p-3.5 shadow-xl border border-[#E8E2D6] max-w-[190px] animate-fade-in">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#F8F5F0] border border-[#E8E2D6] flex items-center justify-center text-[#C27E6E] font-serif font-bold text-xs">
                    ✦
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#2D2D2D]">Handpicked Fit</p>
                    <p className="text-[9px] text-[#7A7571]">Tailored all-day comfort</p>
                  </div>
                </div>
              </div>

              {/* Tagline Pill */}
              <div className="hidden sm:block absolute -bottom-4 -right-4 bg-[#2D2D2D] text-[#FDFCF9] py-2 px-4 rounded-full shadow-xl text-[11px] font-medium tracking-wider uppercase border border-[#3A3A3A]">
                ✨ {storeConfig.tagline}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
