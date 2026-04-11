import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://matthews-portfolio.vercel.app'),
  title: {
    default: "Matthew Pinho | Sports & Commercial Photographer",
    template: "%s | Matthew Pinho",
  },
  description: "High-end sports and commercial photography capturing the raw intensity and emotion of the game.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Matthew Pinho Photography",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Matthew Pinho Photography Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matthew Pinho | Photographer",
    description: "High-end sports and commercial photography.",
  },
  icons: {
    icon: 'https://i.imgur.com/sQfKcEC.png',
    apple: 'https://i.imgur.com/sQfKcEC.png',
  },
};

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/src/context/LanguageContext";
import { CartProvider } from "@/src/context/CartContext";
import { LanguageModal } from "@/components/modules/LanguageModal";
import MobileSidebar from "@/components/layout/MobileSidebar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col transition-colors duration-500 bg-slate-50 dark:bg-[#050505] text-zinc-900 dark:text-white selection:bg-black/10 dark:selection:bg-white/30">
        <ThemeProvider>
          <LanguageProvider>
            <CartProvider>
              <LanguageModal />
              <Navbar />
              <MobileSidebar />
              {children}
              <Footer />
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
