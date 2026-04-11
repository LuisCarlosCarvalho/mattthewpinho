"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Camera, Aperture, Settings2, Timer } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

interface ProjectPageClientProps {
  project: any;
  nextProject: any;
}

export default function ProjectPageClient({ project, nextProject }: ProjectPageClientProps) {
  const { t } = useLanguage();

  return (
    <main className="flex-1 flex flex-col bg-[#0a0a0a] text-white">
      {/* 1. Header/Hero Full Bleed */}
      <section className="relative w-full h-[75vh] min-h-[500px]">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0a0a0a] z-10" />
        
        <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-12 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div className="max-w-3xl">
            <Link href="/" className="inline-flex items-center text-white/50 hover:text-white transition-colors text-sm font-medium mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.portfolio.back}
            </Link>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">{project.title}</h1>
            <p className="text-xl text-white/60 font-medium">{project.description} &bull; {project.category}</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 w-full">
        {/* 2. Behind the Lens & Tech Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-8">
            <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-white/40 mb-6">{t.portfolio.behind}</h2>
            <p className="text-lg md:text-2xl text-white/90 leading-relaxed font-light">
              {project.behindTheLens || "An exploration of movement, light, and dedication on the field."}
            </p>
          </div>
          
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-white/40 mb-6 border-b border-white/5 pb-4">{t.portfolio.tech}</h2>
            {project.techSpecs ? (
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-white/80">
                  <Camera className="w-5 h-5 text-white/40" />
                  <span>{project.techSpecs.camera}</span>
                </li>
                <li className="flex items-center gap-4 text-white/80">
                  <Aperture className="w-5 h-5 text-white/40" />
                  <span>{project.techSpecs.lens}</span>
                </li>
                <li className="flex items-center gap-4 text-white/80">
                  <Settings2 className="w-5 h-5 text-white/40" />
                  <span>{project.techSpecs.iso}</span>
                </li>
                <li className="flex items-center gap-4 text-white/80">
                  <Timer className="w-5 h-5 text-white/40" />
                  <span>{project.techSpecs.shutter}</span>
                </li>
              </ul>
            ) : (
              <p className="text-white/50">{t.portfolio.notAvailable}</p>
            )}
          </div>
        </div>

        {/* 3. Rhythm Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="space-y-6 md:space-y-12">
            {project.gallery.map((imgUrl: string, index: number) => {
              const isSideBySide = index % 3 !== 0;
              const nextImg = project.gallery![index + 1];

              if (isSideBySide && nextImg && index % 2 !== 0) {
                return (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                    <div className="relative aspect-[4/5] bg-white/5 rounded-xl overflow-hidden">
                      <Image src={imgUrl} alt="Gallery image" fill sizes="50vw" className="object-cover" />
                    </div>
                    <div className="relative aspect-[4/5] bg-white/5 rounded-xl overflow-hidden mt-12 md:mt-24">
                      <Image src={nextImg} alt="Gallery image" fill sizes="50vw" className="object-cover" />
                    </div>
                  </div>
                );
              }
              
              if (isSideBySide && index % 2 === 0) {
                 return null;
              }

              return (
                <div key={index} className="relative w-full aspect-video md:aspect-[21/9] bg-white/5 rounded-xl overflow-hidden">
                  <Image src={imgUrl} alt="Gallery image" fill sizes="100vw" className="object-cover" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Next Project CTA */}
      {nextProject && (
        <Link 
          href={`/portfolio/${nextProject.slug}`}
          className="group block w-full relative h-[40vh] min-h-[300px] overflow-hidden bg-black flex items-center justify-center mt-24"
        >
          <Image
            src={nextProject.imageUrl}
            alt={nextProject.title}
            fill
            className="object-cover opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
          
          <div className="relative z-20 text-center space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <span className="text-xs font-semibold tracking-widest uppercase text-white/50">{t.portfolio.next}</span>
            <h2 className="text-3xl md:text-5xl font-bold flex items-center justify-center gap-4 text-white">
              {nextProject.title}
              <ArrowRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100" />
            </h2>
          </div>
        </Link>
      )}
    </main>
  );
}
