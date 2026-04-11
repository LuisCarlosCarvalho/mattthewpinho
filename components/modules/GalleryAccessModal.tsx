"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/src/context/LanguageContext';
import { useCart } from '@/src/context/CartContext';
import { useRouter } from 'next/navigation';
import { PRIVATE_GALLERIES } from '@/src/data/gallery';

interface GalleryAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GalleryAccessModal({ isOpen, onClose }: GalleryAccessModalProps) {
  const { t } = useLanguage();
  const { setClientEmail } = useCart();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Simulate validation
    setTimeout(() => {
      const event = PRIVATE_GALLERIES.find(g => g.accessKey === accessKey);
      
      if (event) {
        setClientEmail(email);
        localStorage.setItem(`gallery_access_${event.slug}`, "true");
        localStorage.setItem(`client_email`, email);
        router.push(`/gallery/${event.slug}`);
        onClose();
      } else {
        setError(t.gallery.invalidKey);
      }
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-8 z-[120] shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 bg-[#FF8C00]/10 rounded-2xl flex items-center justify-center mb-6">
                <Lock className="text-[#FF8C00]" size={32} />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">{t.gallery.accessTitle}</h2>
              <p className="text-zinc-500 text-sm">{t.gallery.accessDesc}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">
                  {t.gallery.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#FF8C00]/50 transition-colors"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">
                  {t.gallery.keyLabel}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input
                    type="text"
                    required
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#FF8C00]/50 transition-colors"
                    placeholder={t.gallery.keyPlaceholder}
                  />
                </div>
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs font-bold text-center"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF8C00] text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#FF8C00]/90 transition-all disabled:opacity-50 group"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    {t.gallery.submitAccess}
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
