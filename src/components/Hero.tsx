import React from 'react';
import { ArrowDown, Layers, Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { heroWorkshopImg } from '../lib/assets';

interface HeroProps {
  onScrollToCatalog: () => void;
  onOpenCustomQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCatalog, onOpenCustomQuote }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 border-b border-slate-900 min-h-[580px] lg:min-h-[660px] flex items-center">
      
      {/* Right Half Image: Occupies entire right half of the section on desktop with seamless gradient shadow */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 h-full z-0 overflow-hidden pointer-events-none select-none">
        <img
          src={heroWorkshopImg}
          alt="Taller de impresión 3D Universo 3D en Jujuy con impresoras operando y modelos geométricos"
          className="w-full h-full object-cover object-center lg:object-left"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/hero_workshop.jpg';
          }}
        />

        {/* Desktop Gradient Shadow: Melts image smoothly into text from right to left */}
        <div className="hidden lg:block absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />

        {/* Mobile/Tablet Gradient: Scrim to guarantee high contrast and readability */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/85 to-slate-950 z-10" />

        {/* Top boundary shadow: Smooth transition with navbar */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950 via-slate-950/60 to-transparent z-10" />

        {/* Bottom boundary shadow: Smooth transition with catalog section */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-10" />

        {/* Studio badge in desktop corner */}
        <div className="hidden xl:flex absolute bottom-8 right-8 z-20 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 text-xs items-center gap-3 shadow-2xl">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <div>
            <span className="text-white font-medium block">Taller Activo Universo 3D</span>
            <span className="text-slate-400 text-[11px]">Granja de impresión FDM & SLA en Jujuy</span>
          </div>
        </div>
      </div>

      {/* Content Container (Layered above gradients on z-10) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="max-w-2xl lg:max-w-xl space-y-6">
          
          {/* Eyebrow kicker */}
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>Taller de Fabricación Aditiva & Impresión 3D</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Jujuy, Argentina</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display text-balance leading-[1.08]">
            Transformamos ideas en materia precisa.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Diseño, prototipado rápido y figuras de colección en <strong className="text-white font-medium">Universo 3D</strong>. 
            Imprimimos con tolerancias industriales en PLA+, PETG técnico y resina fotocurable de alta definición.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onScrollToCatalog}
              className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-lg shadow-cyan-950/50 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Explorar Catálogo</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCustomQuote}
              className="px-6 py-3.5 text-sm font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>¿Tenés tu archivo STL?</span>
            </button>
          </div>

          {/* Value Props Strip */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-900 text-xs text-slate-400">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Precisión 0.12mm</span>
              </div>
              <p className="text-[11px] text-slate-500">Capas imperceptibles</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Filamentos Top</span>
              </div>
              <p className="text-[11px] text-slate-500">PLA, PETG y Resina 8K</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                <Truck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Envíos Seguros</span>
              </div>
              <p className="text-[11px] text-slate-500">Embalaje reforzado</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
