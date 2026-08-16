import React from 'react';
import { Sparkles, Tag, ShoppingBag, MessageSquareHeart } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Curated Styles',
      description: 'Handpicked fashion pieces',
    },
    {
      icon: Tag,
      title: 'Affordable Elegance',
      description: 'Beautiful styles at accessible prices',
    },
    {
      icon: ShoppingBag,
      title: 'Easy Ordering',
      description: 'Simple and convenient shopping',
    },
    {
      icon: MessageSquareHeart,
      title: 'Personal Assistance',
      description: "We're here to help you choose",
    },
  ];

  return (
    <section className="bg-[#F8F5F0] border-b border-[#E8E2D6] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-3.5 rounded-2xl bg-[#FDFCF9] border border-[#E8E2D6] hover:border-[#C27E6E] hover:shadow-xs transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F8F5F0] border border-[#E8E2D6] flex items-center justify-center text-[#C27E6E] shrink-0 shadow-2xs">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h2 className="text-xs sm:text-sm font-semibold text-[#2D2D2D] tracking-tight font-serif-heading">
                    {item.title}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[#7A7571] leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
