import React from 'react';
import { Check, Sparkles, Heart } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';

export const BoutiqueStory: React.FC = () => {
  const promises = [
    'Curated styles handcrafted with love',
    'Thoughtful selections for every body type',
    'Accessible pricing without luxury markups',
    'Personal service & real WhatsApp styling advice',
    'Beautiful everyday fashion you will adore wearing',
  ];

  return (
    <section id="boutique-story-section" className="py-14 sm:py-24 bg-[#FDFCF9] relative overflow-hidden border-t border-[#E8E2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Visual Composition */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image */}
              <div className="aspect-4/5 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-[#F8F5F0]">
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80"
                  alt="Fabrigo Boutique Heritage Story"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              {/* Floating Quote Box */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#2D2D2D] text-[#FDFCF9] p-4 sm:p-5 rounded-2xl shadow-xl max-w-[240px] sm:max-w-[260px] border border-[#444444]">
                <p className="font-serif italic text-xs sm:text-sm leading-snug">
                  "Fashion should feel effortless, personal, and profoundly comforting."
                </p>
                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#444444] text-[10px] uppercase tracking-wider text-[#E8E2D6]">
                  <Sparkles className="w-3 h-3 text-[#C27E6E]" />
                  <span>The Fabrigo Promise</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Brand Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8F5F0] border border-[#E8E2D6] text-xs font-semibold text-[#C27E6E] uppercase tracking-[0.2em]">
                <Heart className="w-3.5 h-3.5 fill-[#C27E6E]" />
                <span>Our Philosophy</span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2D2D2D] tracking-tight leading-tight">
                More Than Fashion. <br />
                <span className="italic text-[#C27E6E] font-normal">It's Your Style Story.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#666666] leading-relaxed font-normal">
                {storeConfig.brandName} was created to make beautiful fashion easier to discover, easier to choose and easier to wear. We believe great style doesn't have to be complicated or expensive.
              </p>
            </div>

            {/* Our Promise Checklist */}
            <div className="bg-[#F8F5F0] rounded-2xl p-6 sm:p-7 border border-[#E8E2D6] space-y-4 shadow-2xs">
              <h3 className="font-serif text-lg font-semibold text-[#2D2D2D]">
                Our Promise to You
              </h3>
              
              <ul className="space-y-2.5">
                {promises.map((promise, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-[#2D2D2D]">
                    <div className="w-5 h-5 rounded-full bg-[#C27E6E] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{promise}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-xs text-[#8C8680] italic">
              Crafted for discerning women who value elegance, authentic natural fabrics, and genuine craftsmanship.
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
