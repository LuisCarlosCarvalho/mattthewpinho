"use client";

import React, { createContext, useContext, useState, useMemo } from 'react';
import { GalleryPhoto } from '@/src/data/gallery';

interface CartContextType {
  cart: GalleryPhoto[];
  addToCart: (photo: GalleryPhoto) => void;
  removeFromCart: (photoId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isInCart: (photoId: string) => boolean;
  clientEmail: string;
  setClientEmail: (email: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<GalleryPhoto[]>([]);
  const [clientEmail, setClientEmail] = useState("");

  const addToCart = (photo: GalleryPhoto) => {
    setCart(prev => {
      if (prev.find(p => p.id === photo.id)) return prev;
      return [...prev, photo];
    });
  };

  const removeFromCart = (photoId: string) => {
    setCart(prev => prev.filter(p => p.id !== photoId));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.length;
  const totalPrice = useMemo(() => cart.reduce((sum, p) => sum + p.price, 0), [cart]);

  const isInCart = (photoId: string) => cart.some(p => p.id === photoId);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      totalItems, 
      totalPrice,
      isInCart,
      clientEmail,
      setClientEmail
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
