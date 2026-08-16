import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, RotateCcw, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { Product, ProductSize, SortOption } from '../types';

export const TrendingProducts: React.FC = () => {
  const { activeCategoryFilter, setActiveCategoryFilter, filterSectionRef } = useShop();

  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [colorFilter, setColorFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  const categoriesList = ['All', 'Kurtis', 'Dresses', 'Dress Materials', 'Co-ord Sets', 'Ethnic Wear'];
  const sizesList: ProductSize[] = ['S', 'M', 'L', 'XL', 'XXL'];
  const colorsList = ['Pink', 'Blue', 'Green', 'Beige', 'Black', 'White', 'Yellow'];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (activeCategoryFilter !== 'All') {
        if (activeCategoryFilter === 'New Arrivals') {
          if (!item.isNew) return false;
        } else if (item.category !== activeCategoryFilter) {
          return false;
        }
      }

      // Price filter
      if (priceFilter !== 'all') {
        if (priceFilter === 'under-800' && item.price >= 800) return false;
        if (priceFilter === '800-1000' && (item.price < 800 || item.price > 1000)) return false;
        if (priceFilter === '1000-1500' && (item.price < 1000 || item.price > 1500)) return false;
        if (priceFilter === 'above-1500' && item.price <= 1500) return false;
      }

      // Size filter
      if (sizeFilter !== 'all') {
        if (!item.sizes.includes(sizeFilter as ProductSize)) return false;
      }

      // Color filter
      if (colorFilter !== 'all') {
        const matchesColor = item.colors.some((c) =>
          c.toLowerCase().includes(colorFilter.toLowerCase())
        );
        if (!matchesColor) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-low-high') return a.price - b.price;
      if (sortOption === 'price-high-low') return b.price - a.price;
      if (sortOption === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortOption === 'popular') return b.reviewCount - a.reviewCount;
      // Default: featured
      return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
    });
  }, [activeCategoryFilter, priceFilter, sizeFilter, colorFilter, sortOption]);

  const hasActiveFilters = 
    activeCategoryFilter !== 'All' || 
    priceFilter !== 'all' || 
    sizeFilter !== 'all' || 
    colorFilter !== 'all';

  const resetAllFilters = () => {
    setActiveCategoryFilter('All');
    setPriceFilter('all');
    setSizeFilter('all');
    setColorFilter('all');
    setSortOption('featured');
  };

  return (
    <section id="shop-section" ref={filterSectionRef} className="py-14 sm:py-20 bg-[#FDFCF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C27E6E]">
            Curated For You
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#2D2D2D] tracking-tight">
            Trending at Fabrigo
          </h2>
          <p className="text-xs sm:text-sm text-[#666666]">
            Explore our most coveted silhouettes, fresh colorways and timeless wardrobe staples
          </p>
        </div>

        {/* Category Tabs Bar */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 mb-6 gap-2 no-scrollbar">
          {categoriesList.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategoryFilter(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategoryFilter === category
                  ? 'bg-[#2D2D2D] text-[#FDFCF9] shadow-xs'
                  : 'bg-white text-[#666666] hover:bg-[#F8F5F0] border border-[#E8E2D6]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Filters and Sorting Controls Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#E8E2D6] shadow-2xs mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Desktop Filters Group */}
            <div className="hidden md:flex flex-wrap items-center gap-3">
              {/* Price Filter */}
              <div className="flex items-center gap-1.5 text-xs text-[#666666]">
                <span className="font-semibold text-[#8C8680]">Price:</span>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="bg-[#F8F5F0] border border-[#E8E2D6] rounded-lg px-2.5 py-1.5 text-xs text-[#2D2D2D] focus:outline-hidden focus:border-[#C27E6E]"
                >
                  <option value="all">All Prices</option>
                  <option value="under-800">Under ₹800</option>
                  <option value="800-1000">₹800 – ₹1,000</option>
                  <option value="1000-1500">₹1,000 – ₹1,500</option>
                  <option value="above-1500">₹1,500+</option>
                </select>
              </div>

              {/* Size Filter */}
              <div className="flex items-center gap-1.5 text-xs text-[#666666]">
                <span className="font-semibold text-[#8C8680]">Size:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSizeFilter('all')}
                    className={`px-2 py-1 text-[11px] rounded-md border ${
                      sizeFilter === 'all'
                        ? 'bg-[#C27E6E] text-white border-[#C27E6E]'
                        : 'bg-[#F8F5F0] border-[#E8E2D6] text-[#666666] hover:border-[#C27E6E]'
                    }`}
                  >
                    All
                  </button>
                  {sizesList.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSizeFilter(sizeFilter === size ? 'all' : size)}
                      className={`px-2 py-1 text-[11px] rounded-md border font-medium ${
                        sizeFilter === size
                          ? 'bg-[#C27E6E] text-white border-[#C27E6E]'
                          : 'bg-[#F8F5F0] border-[#E8E2D6] text-[#666666] hover:border-[#C27E6E]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="flex items-center gap-1.5 text-xs text-[#666666]">
                <span className="font-semibold text-[#8C8680]">Color:</span>
                <select
                  value={colorFilter}
                  onChange={(e) => setColorFilter(e.target.value)}
                  className="bg-[#F8F5F0] border border-[#E8E2D6] rounded-lg px-2.5 py-1.5 text-xs text-[#2D2D2D] focus:outline-hidden focus:border-[#C27E6E]"
                >
                  <option value="all">All Colors</option>
                  {colorsList.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Filter Toggle Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8F5F0] border border-[#E8E2D6] rounded-lg text-xs font-medium text-[#2D2D2D]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C27E6E]" />
                <span>Filters {hasActiveFilters && '•'}</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs ml-auto">
              <span className="text-[#8C8680] hidden sm:inline">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="bg-[#F8F5F0] border border-[#E8E2D6] rounded-lg px-3 py-1.5 text-xs font-medium text-[#2D2D2D] focus:outline-hidden focus:border-[#C27E6E]"
              >
                <option value="featured">Featured Collection</option>
                <option value="newest">Newest First</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

          </div>

          {/* Mobile Filter Expandable Drawer */}
          {showFiltersMobile && (
            <div className="md:hidden mt-4 pt-4 border-t border-[#E8E2D6] space-y-3">
              {/* Price */}
              <div>
                <label className="block text-[11px] font-semibold text-[#8C8680] uppercase mb-1">Price Range</label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full bg-[#F8F5F0] border border-[#E8E2D6] rounded-lg p-2 text-xs"
                >
                  <option value="all">All Prices</option>
                  <option value="under-800">Under ₹800</option>
                  <option value="800-1000">₹800 – ₹1,000</option>
                  <option value="1000-1500">₹1,000 – ₹1,500</option>
                  <option value="above-1500">₹1,500+</option>
                </select>
              </div>

              {/* Size */}
              <div>
                <label className="block text-[11px] font-semibold text-[#8C8680] uppercase mb-1">Size</label>
                <div className="flex flex-wrap gap-1.5">
                  {sizesList.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSizeFilter(sizeFilter === s ? 'all' : s)}
                      className={`px-3 py-1 text-xs rounded-md border ${
                        sizeFilter === s
                          ? 'bg-[#C27E6E] text-white border-[#C27E6E]'
                          : 'bg-[#F8F5F0] border-[#E8E2D6] text-[#666666]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-[11px] font-semibold text-[#8C8680] uppercase mb-1">Color</label>
                <select
                  value={colorFilter}
                  onChange={(e) => setColorFilter(e.target.value)}
                  className="w-full bg-[#F8F5F0] border border-[#E8E2D6] rounded-lg p-2 text-xs"
                >
                  <option value="all">All Colors</option>
                  {colorsList.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="mt-3 pt-3 border-t border-[#E8E2D6] flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-[#8C8680]">Active Filters:</span>
              
              {activeCategoryFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 text-[11px] bg-[#F8F5F0] border border-[#E8E2D6] px-2.5 py-0.5 rounded-full text-[#2D2D2D]">
                  {activeCategoryFilter}
                  <button onClick={() => setActiveCategoryFilter('All')}><X className="w-3 h-3 text-[#8C8680] hover:text-black" /></button>
                </span>
              )}

              {priceFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 text-[11px] bg-[#F8F5F0] border border-[#E8E2D6] px-2.5 py-0.5 rounded-full text-[#2D2D2D]">
                  Price: {priceFilter}
                  <button onClick={() => setPriceFilter('all')}><X className="w-3 h-3 text-[#8C8680] hover:text-black" /></button>
                </span>
              )}

              {sizeFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 text-[11px] bg-[#F8F5F0] border border-[#E8E2D6] px-2.5 py-0.5 rounded-full text-[#2D2D2D]">
                  Size: {sizeFilter}
                  <button onClick={() => setSizeFilter('all')}><X className="w-3 h-3 text-[#8C8680] hover:text-black" /></button>
                </span>
              )}

              {colorFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 text-[11px] bg-[#F8F5F0] border border-[#E8E2D6] px-2.5 py-0.5 rounded-full text-[#2D2D2D]">
                  Color: {colorFilter}
                  <button onClick={() => setColorFilter('all')}><X className="w-3 h-3 text-[#8C8680] hover:text-black" /></button>
                </span>
              )}

              <button
                onClick={resetAllFilters}
                className="text-[11px] text-[#C27E6E] font-semibold hover:underline flex items-center gap-1 ml-auto cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>
          )}
        </div>

        {/* Products Grid: Desktop 4, Tablet 2-3, Mobile 2 */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Filter State */
          <div className="bg-white rounded-2xl p-10 text-center border border-[#E8E2D6] space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#F8F5F0] border border-[#E8E2D6] flex items-center justify-center text-[#C27E6E] mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-[#2D2D2D]">
                We couldn't find matching styles
              </h3>
              <p className="text-xs text-[#7A7571]">
                Try adjusting your filters or search keywords to discover more boutique pieces.
              </p>
            </div>
            <button
              onClick={resetAllFilters}
              className="px-6 py-2.5 bg-[#2D2D2D] text-[#FDFCF9] text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#C27E6E] transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
