"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Check } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ServicesPage() {
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const services = t.services.items.map((item, index) => ({
    ...item,
    image: [
      "https://cdn.myportfolio.com/84a10115-639a-4bad-97b6-2c339c170bbc/632ed1aa-5c30-48d1-9538-7adc0075d3c5_car_202x158.jpg?h=9e6297371ff4dada20bec86a76558a3d",
      "https://cdn.myportfolio.com/84a10115-639a-4bad-97b6-2c339c170bbc/ddd14936-4b50-48df-a7cc-42589b0470e8_rwc_0x570x1151x899x1151.jpg?h=39766322493c32eb006daf16bc821559",
      "https://cdn.myportfolio.com/84a10115-639a-4bad-97b6-2c339c170bbc/ed3272df-0b1b-4061-b0dc-7c054ecec8b6_rwc_0x777x1336x1044x1336.jpg?h=2bd6a6ba863da2fdf57fb2d92e2b135b",
      "https://cdn.myportfolio.com/84a10115-639a-4bad-97b6-2c339c170bbc/4430cfba-9320-4520-a2e4-9f7bf3ee3870_car_202x158.jpg?h=a4eb2796b9a22baf24f73e838016c726"
    ][index]
  }));

  return (
    <main className="flex-1 flex flex-col bg-transparent pt-24 min-h-screen">
      
      {/* 1. Header Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-4 text-zinc-900 dark:text-white text-balance">
            {t.services.title}
          </h1>
          <p className="text-lg md:text-xl font-bold uppercase tracking-widest text-[#FF8C00] mb-6">
            {t.services.location}
          </p>
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl font-light leading-relaxed">
            {t.services.desc}
          </p>
        </motion.div>
      </section>

      {/* 2. Grid de Cartões (4 Colunas no Desktop, 2 no mobile/tablet) */}
      <section className="px-6 pb-24 relative">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#111111] border border-zinc-200 dark:border-white/5 hover:border-[#FF8C00]/50 dark:hover:border-[#FF8C00]/50 hover:shadow-[0_0_30px_rgba(255,140,0,0.15)] hover:scale-[1.02] transition-all duration-500 group relative"
              >
                {/* Imagem de Topo */}
                <div className="relative w-full aspect-[4/3] overflow-hidden border-b border-zinc-200 dark:border-white/5">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 dark:from-[#111111] dark:via-black/20 to-transparent" />
                </div>

                <div className="p-6 flex flex-col flex-grow text-zinc-900 dark:text-white">
                  <h2 className="text-2xl font-bold mb-8 leading-tight">{service.title}</h2>

                  {/* Seções de dados */}
                  <div className="space-y-6 flex-grow">
                    
                    <div>
                      <h3 className="text-[10px] font-bold tracking-widest text-[#FF8C00] uppercase mb-3">{t.services.forWhom}</h3>
                      <ul className="space-y-2">
                        {service.forWhom.map((item, i) => (
                          <li key={i} className="flex items-start text-sm text-zinc-600 dark:text-zinc-400">
                            <span className="w-1 h-1 rounded-full bg-[#FF8C00]/50 mt-2 mr-3 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-white/30 uppercase mb-3">{t.services.features}</h3>
                      <ul className="space-y-2">
                        {service.features.map((item, i) => (
                          <li key={i} className="flex items-start text-sm text-zinc-600 dark:text-zinc-400">
                            <span className="w-1 h-1 rounded-full bg-[#FF8C00]/50 mt-2 mr-3 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-white/30 uppercase mb-3">{t.services.deliveries}</h3>
                      <ul className="space-y-2">
                        {service.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start text-sm text-zinc-600 dark:text-zinc-400 flex-wrap">
                            <Check className="w-3.5 h-3.5 text-[#FF8C00] mt-0.5 mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Rodapé do Card (Preço e Link) */}
                  <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-white/5">
                    <div className="mb-4">
                      <h3 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-white/30 uppercase mb-2">{t.services.prices}</h3>
                      <span className="text-xl font-medium text-[#FF8C00]">{service.price}</span>
                    </div>
                    
                    <Link 
                      href="/contact"
                      className="inline-flex items-center text-sm font-bold text-zinc-500 dark:text-zinc-400 group-hover:text-[#FF8C00] dark:group-hover:text-[#FF8C00] transition-colors uppercase tracking-wider"
                    >
                      {t.services.cta}
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Botão de Conversão Global */}
      <section className="py-24 px-6 relative w-full flex justify-center">
        <Link 
          href="/contact"
          className="inline-block bg-[#FF8C00] hover:bg-[#CC7000] text-black text-center font-bold px-10 py-5 rounded-full shadow-[0_0_40px_rgba(255,140,0,0.4)] hover:shadow-[0_0_60px_rgba(255,140,0,0.6)] transition-all duration-300 hover:-translate-y-1 tracking-wider"
        >
          {t.services.globalCta}
        </Link>
      </section>

    </main>
  );
}
