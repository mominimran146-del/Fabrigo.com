import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '../data/products';
import { useShop } from '../context/ShopContext';

export const CategorySection: React.FC = () => {
  const { scrollToShopWithCategory } = useShop();

  return (
    <section id="categories-section" className="py-14 sm:py-20 bg-[#FDFCF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C27E6E]">
            Curated Collections
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#2D2D2D] tracking-tight">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-[#666666]">
            Explore handcrafted silhouettes tailored for modern Indian luxury & grace
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => scrollToShopWithCategory(cat.name)}
              className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden bg-white border border-[#E8E2D6] hover:border-[#C27E6E] shadow-2xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className="relative aspect-4/5 w-full overflow-hidden bg-[#F8F5F0]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                
                {/* Arrow Icon */}
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[#FDFCF9]/90 backdrop-blur-xs flex items-center justify-center text-[#2D2D2D] group-hover:bg-[#C27E6E] group-hover:text-white transition-colors duration-200 shadow-xs">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Text Card */}
              <div className="p-3.5 flex flex-col justify-between flex-1 space-y-1">
                <div>
                  <h3 className="font-serif font-semibold text-sm sm:text-base text-[#2D2D2D] group-hover:text-[#C27E6E] transition-colors line-clamp-1">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-[#7A7571] leading-snug line-clamp-2 mt-0.5">
                    {cat.tagline}
                  </p>
                </div>
                
                <div className="pt-2 flex items-center justify-between text-[10px] font-medium text-[#8C8680] uppercase tracking-wider">
                  <span>Explore</span>
                  <span className="text-[#C27E6E]">✦</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
