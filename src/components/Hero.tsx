import React from 'react';
import { ArrowDown, Layers, Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { heroWorkshopImg } from '../lib/assets';

interface HeroProps {
  onScrollToCatalog: () => void;
  onOpenCustomQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCatalog, onOpenCustomQuote }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 border-b border-slate-900">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-950/20 via-indigo-950/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Call to Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>Taller de Fabricación Aditiva & Impresión 3D</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Jujuy, Argentina</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display text-balance leading-[1.1]">
              Transformamos ideas en materia precisa.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Diseño, prototipado rápido y figuras de colección en <strong className="text-white font-medium">Universo 3D</strong>. 
              Imprimimos con tolerancias industriales en PLA+, PETG técnico y resina fotocurable de alta definición.
            </p>

            {/* CTAs */}
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
                className="px-6 py-3.5 text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>¿Tenés tu archivo STL?</span>
              </button>
            </div>

            {/* Value props in unboxed typographic style (§1.A Zero-pill discipline) */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-900 text-xs text-slate-400">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Precisión de 0.12mm</span>
                </div>
                <p className="text-[11px] text-slate-500">Capas imperceptibles y acabado sedoso</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Filamentos Premium</span>
                </div>
                <p className="text-[11px] text-slate-500">PLA ecológico, PETG y resina 8K</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                  <Truck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Envíos Protegidos</span>
                </div>
                <p className="text-[11px] text-slate-500">Embalaje reforzado anti-roturas</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900 shadow-2xl shadow-cyan-950/20 aspect-[4/3] lg:aspect-[5/4]">
              <img
                src={heroWorkshopImg}
                alt="Taller de impresión 3D Universo 3D en Jujuy con impresoras operando y modelos geométricos"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback in case of bundle error
                  (e.target as HTMLImageElement).src = '/images/hero_workshop.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <span className="text-white font-medium block">Taller Activo Universo 3D</span>
                  <span className="text-slate-400 text-[11px]">Granja de impresión FDM & SLA</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 font-mono text-[10px]">
                  Produciendo pedidos
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
