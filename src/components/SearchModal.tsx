import React, { useState, useMemo } from 'react';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { storeConfig } from '../config/storeConfig';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    setSelectedProductForDetail,
    scrollToShopWithCategory 
  } = useShop();

  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase().trim();
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.colors.some((c) => c.toLowerCase().includes(q)) ||
        p.occasion?.some((o) => o.toLowerCase().includes(q)) ||
        p.styleTags?.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [query]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    setSelectedProductForDetail(product);
  };

  const handleCategoryShortcut = (cat: string) => {
    setIsSearchOpen(false);
    scrollToShopWithCategory(cat);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="min-h-full flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-20">
        <div className="relative bg-[#FDFCF9] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E8E2D6] z-10 animate-fade-in">
          
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-[#E8E2D6] bg-[#F8F5F0] flex items-center gap-3">
            <Search className="w-5 h-5 text-[#8C8680]" />
            <input
              type="text"
              autoFocus
              placeholder="Search by kurti, linen dress, mulmul, festive, color..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-sm sm:text-base text-[#2D2D2D] bg-transparent focus:outline-hidden placeholder:text-[#8C8680]"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-[#8C8680] hover:text-[#2D2D2D] p-1 text-xs font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="w-8 h-8 rounded-full bg-[#FDFCF9] border border-[#E8E2D6] flex items-center justify-center text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-[#FDFCF9] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Suggestions when empty */}
          {!query.trim() && (
            <div className="p-6 space-y-4">
              <p className="text-xs font-semibold text-[#8C8680] uppercase tracking-wider">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {['Kurtis', 'Dresses', 'Co-ord Sets', 'Mulmul Cotton', 'Chanderi', 'Linen', 'Festive'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-full bg-[#FDFCF9] border border-[#E8E2D6] text-xs text-[#2D2D2D] hover:bg-[#F8F5F0] hover:border-[#C27E6E] transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query.trim() && (
            <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
              <div className="flex items-center justify-between text-xs text-[#8C8680] pb-2 border-b border-[#E8E2D6]">
                <span>Search results for "{query}"</span>
                <span>{searchResults.length} found</span>
              </div>

              {searchResults.length > 0 ? (
                <div className="space-y-2.5">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="p-3 rounded-xl bg-white border border-[#E8E2D6] hover:border-[#C27E6E] hover:shadow-xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-14 object-cover rounded-lg bg-[#F8F5F0]"
                        />
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-[#C27E6E] font-semibold">
                            {product.category}
                          </p>
                          <h4 className="font-serif font-semibold text-xs sm:text-sm text-[#2D2D2D] group-hover:text-[#C27E6E] transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-[#7A7571]">{product.fabric.split(' ')[0]}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-xs sm:text-sm text-[#2D2D2D]">
                          {storeConfig.currency}{product.price.toLocaleString('en-IN')}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#8C8680] group-hover:text-[#C27E6E] group-hover:translate-x-1 transition-transform mt-1 ml-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center space-y-2">
                  <p className="font-serif text-base font-semibold text-[#2D2D2D]">
                    We couldn't find that style. Try another search.
                  </p>
                  <p className="text-xs text-[#7A7571]">
                    Check spelling or try browsing categories like Kurtis, Dresses, or Co-ord Sets.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
