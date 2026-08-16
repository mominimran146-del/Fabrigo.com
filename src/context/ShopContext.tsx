import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { storeConfig } from '../config/storeConfig';
import { CartItem, Product, ProductSize, WishlistItem } from '../types';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  cartCount: number;
  wishlistCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  freeShippingRemaining: number;
  
  // Cart Actions
  addToCart: (product: Product, size?: ProductSize, color?: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, size: ProductSize, color: string, newQty: number) => void;
  removeFromCart: (productId: string, size: ProductSize, color: string) => void;
  clearCart: () => void;
  
  // Wishlist Actions
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product, size?: ProductSize) => void;
  
  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
  selectedProductForQuickView: Product | null;
  setSelectedProductForQuickView: (product: Product | null) => void;
  
  // Filter & Navigation Helpers
  activeCategoryFilter: string;
  setActiveCategoryFilter: (category: string) => void;
  filterSectionRef: React.RefObject<HTMLDivElement | null>;
  scrollToShopWithCategory: (category: string) => void;
  
  // Toast notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info') => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'fabrigo_boutique_cart_v1';
const WISHLIST_STORAGE_KEY = 'fabrigo_boutique_wishlist_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local state initialized safely with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [selectedProductForQuickView, setSelectedProductForQuickView] = useState<Product | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const filterSectionRef = React.useRef<HTMLDivElement | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Calculations
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const wishlistCount = wishlist.length;

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= storeConfig.freeShippingThreshold ? 0 : storeConfig.standardShippingFee;
  }, [subtotal]);

  const total = subtotal + shippingFee;

  const freeShippingRemaining = Math.max(0, storeConfig.freeShippingThreshold - subtotal);

  // Cart operations
  const addToCart = (
    product: Product,
    size?: ProductSize,
    color?: string,
    quantity: number = 1
  ) => {
    const chosenSize = size || product.sizes[0] || 'Free Size';
    const chosenColor = color || product.colors[0] || 'Default';

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === chosenSize &&
          item.selectedColor === chosenColor
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prevCart,
        {
          product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity,
        },
      ];
    });

    showToast(`Added "${product.name}" (${chosenSize}) to your bag!`);
  };

  const updateCartQuantity = (
    productId: string,
    size: ProductSize,
    color: string,
    newQty: number
  ) => {
    if (newQty <= 0) {
      removeFromCart(productId, size, color);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor === color
        ) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, size: ProductSize, color: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
    showToast('Item removed from shopping bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.product.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.product.id !== product.id));
      showToast(`Removed "${product.name}" from wishlist`, 'info');
    } else {
      setWishlist((prev) => [
        ...prev,
        {
          product,
          addedAt: new Date().toISOString(),
        },
      ]);
      showToast(`Added "${product.name}" to your wishlist!`);
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some((item) => item.product.id === productId);
  };

  const moveToCartFromWishlist = (product: Product, size?: ProductSize) => {
    addToCart(product, size);
    setWishlist((prev) => prev.filter((item) => item.product.id !== product.id));
  };

  const scrollToShopWithCategory = (category: string) => {
    setActiveCategoryFilter(category);
    if (filterSectionRef.current) {
      filterSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const el = document.getElementById('shop-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        wishlistCount,
        subtotal,
        shippingFee,
        total,
        freeShippingRemaining,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        selectedProductForQuickView,
        setSelectedProductForQuickView,
        activeCategoryFilter,
        setActiveCategoryFilter,
        filterSectionRef,
        scrollToShopWithCategory,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
