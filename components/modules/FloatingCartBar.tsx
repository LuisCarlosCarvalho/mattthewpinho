"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/src/context/LanguageContext';
import { useCart } from '@/src/context/CartContext';

interface FloatingCartBarProps {
  eventName: string;
}

export function FloatingCartBar({ eventName }: { eventName: string }) {
  const { t } = useLanguage();
  const { totalItems, totalPrice, cart, clientEmail } = useCart();

  const handleCheckout = () => {
    if (totalItems === 0) return;

    // Build photo list string
    const photoList = cart.map(p => `Foto ID: #${p.id}`).join('\n');
    
    // Construct the final message using the template
    const message = t.gallery.whatsappCheckout
      .replace('{event}', eventName)
      .replace('{photos}', photoList)
      .replace('{total}', `€${totalPrice.toFixed(2)}`)
      .replace('{email}', clientEmail || 'N/A');

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/351912453230?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-2xl z-[150]"
        >
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF8C00] rounded-2xl flex items-center justify-center text-black">
                <ShoppingBag size={24} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black tracking-tight leading-none mb-1">
                  {t.gallery.selection.replace('{count}', totalItems.toString())}
                </span>
                <span className="text-[#FF8C00] text-sm font-black uppercase tracking-widest">
                  {t.gallery.total}: €{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="bg-white text-black font-black px-6 md:px-10 py-3 md:py-4 rounded-2xl flex items-center gap-2 hover:bg-[#FF8C00] hover:scale-105 transition-all group"
            >
              <span className="hidden md:inline uppercase tracking-wider text-sm">
                {t.gallery.checkout}
              </span>
              <span className="md:hidden text-xs uppercase font-bold tracking-widest">
                Checkout
              </span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
