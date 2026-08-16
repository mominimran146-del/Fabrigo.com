import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Compass, CheckCircle2 } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductOccasion, ProductStyleTag } from '../types';

export const StyleFinder: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedOccasion, setSelectedOccasion] = useState<ProductOccasion | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<ProductStyleTag | null>(null);

  const occasions: { label: ProductOccasion; subtitle: string; icon: string }[] = [
    { label: 'Everyday Wear', subtitle: 'Breezy & breathable comfort', icon: '🌿' },
    { label: 'Office Wear', subtitle: 'Refined, polished & comfortable', icon: '💼' },
    { label: 'Festive', subtitle: 'Celebration-ready traditional flair', icon: '✨' },
    { label: 'Party', subtitle: 'Chic silhouettes & subtle shimmer', icon: '🌙' },
    { label: 'Casual', subtitle: 'Relaxed cafe runs & weekend outings', icon: '☕' },
  ];

  const styles: { label: ProductStyleTag; subtitle: string; tag: string }[] = [
    { label: 'Elegant', subtitle: 'Graceful cuts with timeless poise', tag: 'Graceful' },
    { label: 'Traditional', subtitle: 'Authentic weaves & heritage motifs', tag: 'Heritage' },
    { label: 'Modern', subtitle: 'Contemporary fusion & clean lines', tag: 'Chic' },
    { label: 'Minimal', subtitle: 'Understated neutrals & pure fabrics', tag: 'Subtle' },
  ];

  const recommendations = useMemo(() => {
    if (!selectedOccasion || !selectedStyle) return [];

    // Filter products matching both occasion and styleTag
    const exactMatches = products.filter(
      (p) =>
        p.occasion?.includes(selectedOccasion) &&
        p.styleTags?.includes(selectedStyle)
    );

    if (exactMatches.length >= 3) {
      return exactMatches.slice(0, 4);
    }

    // Fallback: match either occasion or style tag
    const partialMatches = products.filter(
      (p) =>
        p.occasion?.includes(selectedOccasion) ||
        p.styleTags?.includes(selectedStyle)
    );

    const combined = Array.from(new Set([...exactMatches, ...partialMatches]));
    return (combined.length > 0 ? combined : products).slice(0, 4);
  }, [selectedOccasion, selectedStyle]);

  const handleOccasionSelect = (occ: ProductOccasion) => {
    setSelectedOccasion(occ);
    setStep(2);
  };

  const handleStyleSelect = (sty: ProductStyleTag) => {
    setSelectedStyle(sty);
    setStep(3);
  };

  const handleReset = () => {
    setSelectedOccasion(null);
    setSelectedStyle(null);
    setStep(1);
  };

  return (
    <section id="style-finder-section" className="py-14 sm:py-20 bg-[#F8F5F0] border-y border-[#E8E2D6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDFCF9] border border-[#E8E2D6] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C27E6E]">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Boutique Stylist</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#2D2D2D] tracking-tight">
            Find Your Fabrigo Style
          </h2>
          <p className="text-xs sm:text-sm text-[#666666]">
            Answer two quick questions to receive curated recommendations from our boutique collection
          </p>
        </div>

        {/* Quiz Steps Container */}
        <div className="max-w-3xl mx-auto bg-[#FDFCF9] rounded-2xl p-6 sm:p-8 border border-[#E8E2D6] shadow-2xs">
          
          {/* Progress Indicators */}
          <div className="flex items-center justify-between border-b border-[#E8E2D6] pb-4 mb-6 text-xs text-[#8C8680]">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 1 ? 'bg-[#2D2D2D] text-[#FDFCF9]' : 'bg-[#E8E2D6] text-[#666666]'
              }`}>
                1
              </span>
              <span className={step === 1 ? 'font-semibold text-[#2D2D2D]' : ''}>Occasion</span>
            </div>

            <div className="w-12 h-0.5 bg-[#E8E2D6]" />

            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 2 ? 'bg-[#2D2D2D] text-[#FDFCF9]' : 'bg-[#E8E2D6] text-[#666666]'
              }`}>
                2
              </span>
              <span className={step === 2 ? 'font-semibold text-[#2D2D2D]' : ''}>Aesthetic</span>
            </div>

            <div className="w-12 h-0.5 bg-[#E8E2D6]" />

            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                step === 3 ? 'bg-[#C27E6E] text-white' : 'bg-[#E8E2D6] text-[#666666]'
              }`}>
                3
              </span>
              <span className={step === 3 ? 'font-semibold text-[#C27E6E]' : ''}>Your Edit</span>
            </div>
          </div>

          {/* Step 1: Occasion */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-1">
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#2D2D2D]">
                  What are you shopping for?
                </h3>
                <p className="text-xs text-[#666666]">Select the occasion you want to dress for</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {occasions.map((occ) => (
                  <button
                    key={occ.label}
                    onClick={() => handleOccasionSelect(occ.label)}
                    className="p-4 rounded-xl border border-[#E8E2D6] bg-[#F8F5F0] hover:bg-[#FDFCF9] hover:border-[#C27E6E] text-left transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">{occ.icon}</span>
                      <ArrowRight className="w-4 h-4 text-[#8C8680] group-hover:text-[#C27E6E] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div>
                      <p className="font-serif font-semibold text-sm text-[#2D2D2D] group-hover:text-[#C27E6E] transition-colors">
                        {occ.label}
                      </p>
                      <p className="text-[11px] text-[#7A7571] mt-0.5">
                        {occ.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Preferred Style */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-1">
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#2D2D2D]">
                  What's your preferred style?
                </h3>
                <p className="text-xs text-[#666666]">
                  Shopping for: <span className="font-semibold text-[#C27E6E]">{selectedOccasion}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {styles.map((sty) => (
                  <button
                    key={sty.label}
                    onClick={() => handleStyleSelect(sty.label)}
                    className="p-4 rounded-xl border border-[#E8E2D6] bg-[#F8F5F0] hover:bg-[#FDFCF9] hover:border-[#C27E6E] text-left transition-all duration-200 flex items-center justify-between group cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-semibold text-base text-[#2D2D2D] group-hover:text-[#C27E6E] transition-colors">
                          {sty.label}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8E2D6] text-[#2D2D2D] font-semibold">
                          {sty.tag}
                        </span>
                      </div>
                      <p className="text-xs text-[#7A7571]">
                        {sty.subtitle}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8C8680] group-hover:text-[#C27E6E] group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-[#7A7571] hover:text-[#2D2D2D] underline cursor-pointer"
                >
                  ← Back to Occasion selection
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Resulting Match */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#E8E2D6]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#C27E6E] uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Your Personalized Style Edit</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#2D2D2D] mt-0.5">
                    {selectedOccasion} • {selectedStyle} Collection
                  </h3>
                </div>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F8F5F0] border border-[#E8E2D6] text-xs font-medium text-[#666666] hover:text-[#2D2D2D] hover:bg-[#E8E2D6] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Over</span>
                </button>
              </div>

              {/* Recommendations Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-2">
                {recommendations.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
