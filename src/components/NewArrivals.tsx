import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const NewArrivals: React.FC = () => {
  const { scrollToShopWithCategory } = useShop();

  // Filter new arrival products
  const newArrivalsList = products.filter((p) => p.isNew).slice(0, 8);

  return (
    <section id="new-arrivals-section" className="py-14 sm:py-20 bg-[#FDFCF9] border-t border-[#E8E2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F5F0] border border-[#E8E2D6] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C27E6E]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Just In</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#2D2D2D] tracking-tight">
              Fresh From Fabrigo
            </h2>
            <p className="text-xs sm:text-sm text-[#666666]">
              Freshly designed handcrafted silhouettes, seasonal botanical prints, and soft linen edits.
            </p>
          </div>

          <button
            onClick={() => scrollToShopWithCategory('New Arrivals')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-[#C27E6E] hover:text-[#2D2D2D] transition-colors group cursor-pointer"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* New Arrivals Grid (2 cols mobile, 3-4 cols desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {newArrivalsList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
