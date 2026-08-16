import React from 'react';
import { Instagram, Heart, ArrowUpRight } from 'lucide-react';
import { instagramFeed } from '../data/products';
import { storeConfig } from '../config/storeConfig';

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#FDFCF9] border-t border-[#E8E2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F5F0] border border-[#E8E2D6] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C27E6E]">
            <Instagram className="w-3.5 h-3.5" />
            <span>Style Community</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#2D2D2D] tracking-tight">
            Follow the Fabrigo Look
          </h2>
          <p className="text-xs sm:text-sm text-[#666666]">
            Tag us in your moments of elegance @{storeConfig.instagramUsername}
          </p>
        </div>

        {/* 6 Square Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {instagramFeed.map((post) => (
            <a
              key={post.id}
              href={storeConfig.instagramURL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F8F5F0] border border-[#E8E2D6] hover:border-[#C27E6E] shadow-2xs hover:shadow-md transition-all duration-300 block"
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />

              {/* Dark Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3 flex flex-col justify-between text-white">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-white/80" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[11px] font-semibold">
                    <Heart className="w-3 h-3 fill-[#C27E6E] text-[#C27E6E]" />
                    <span>{post.likes}</span>
                  </div>
                  {post.productTag && (
                    <p className="text-[10px] text-[#E8E2D6] truncate">
                      {post.productTag}
                    </p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href={storeConfig.instagramURL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#FDFCF9] hover:bg-[#2D2D2D] text-[#2D2D2D] hover:text-[#FDFCF9] border border-[#E8E2D6] hover:border-[#2D2D2D] text-xs font-semibold tracking-wider uppercase rounded-full shadow-2xs transition-all duration-200"
          >
            <Instagram className="w-4 h-4 text-[#C27E6E]" />
            <span>Follow @{storeConfig.brandName} on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
