export type ProductCategory = 
  | 'Kurtis'
  | 'Dresses'
  | 'Dress Materials'
  | 'Co-ord Sets'
  | 'Ethnic Wear'
  | 'New Arrivals';

export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Free Size';

export type ProductOccasion = 'Everyday Wear' | 'Office Wear' | 'Festive' | 'Party' | 'Casual';

export type ProductStyleTag = 'Elegant' | 'Traditional' | 'Modern' | 'Minimal';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  discount?: number; // e.g., 20 for 20% off
  images: string[];
  sizes: ProductSize[];
  colors: string[];
  fabric: string;
  fit?: string;
  careInstructions?: string;
  deliveryInfo?: string;
  description: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  rating: number;
  reviewCount: number;
  occasion?: ProductOccasion[];
  styleTags?: ProductStyleTag[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: ProductSize;
  selectedColor: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface CategoryInfo {
  id: string;
  name: ProductCategory;
  title: string;
  tagline: string;
  image: string;
  itemCount: number;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
  productName: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'sizing' | 'shipping' | 'returns' | 'ordering' | 'styling';
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  productTag?: string;
  likes: number;
}

export interface OrderCustomerDetails {
  fullName: string;
  mobileNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  orderNotes?: string;
}

export type SortOption = 'featured' | 'newest' | 'price-low-high' | 'price-high-low' | 'popular';

export interface FilterState {
  category: string;
  priceRange: string;
  size: string;
  color: string;
  sort: SortOption;
  searchQuery: string;
}
