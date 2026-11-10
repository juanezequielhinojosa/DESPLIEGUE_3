import React from 'react';
import { Layers, Shield, Droplets, Zap } from 'lucide-react';

export const MaterialsGuide: React.FC = () => {
  const materials = [
    {
      name: 'PLA & PLA+ Premium',
      type: 'Ácido Poliláctico (Biodegradable)',
      icon: Layers,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-950/40 border-cyan-800/40',
      temp: 'Hasta 55°C',
      idealFor: 'Figuras coleccionables, macetas, lámparas de diseño y piezas decorativas.',
      pros: 'Excelente definición estética, libre de deformación térmica, amplia gama de colores silk y mate.'
    },
    {
      name: 'PETG Técnico',
      type: 'Copoliéster Reforzado',
      icon: Shield,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-950/40 border-indigo-800/40',
      temp: 'Hasta 75°C',
      idealFor: 'Soportes para taller, carcasas de electrónica, repuestos mecánicos y uso exterior.',
      pros: 'Alta resistencia a impactos, flexibilidad moderada que evita roturas frágiles, impermeable.'
    },
    {
      name: 'Resina UV Fotocurable 8K',
      type: 'Polímero Líquido SLA',
      icon: Droplets,
      color: 'text-purple-400',
      bgColor: 'bg-purple-950/40 border-purple-800/40',
      temp: 'Hasta 60°C',
      idealFor: 'Miniaturas para juegos de rol, joyería, bustos hiper-detallados y prototipos dentales.',
      pros: 'Resolución de 35 a 50 micrones. Capas totalmente invisibles al ojo humano y tacto cerámico.'
    },
    {
      name: 'TPU / Flex',
      type: 'Poliuretano Termoplástico',
      icon: Zap,
      color: 'text-amber-400',
      bgColor: 'bg-amber-950/40 border-amber-800/40',
      temp: 'Hasta 70°C',
      idealFor: 'Fundas protectoras, juntas de estanqueidad, suelas de calzado y topes anti-vibración.',
      pros: 'Altamente elástico, amortigua caídas y choques mecánicos sin quebrarse.'
    }
  ];

  return (
    <section id="materiales" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
          Guía de Fabricación
        </span>
        <h2 className="text-3xl font-bold text-white font-display mt-1">
          Materiales y Tecnologías de Impresión
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          En Universo 3D seleccionamos la materia prima óptima para garantizar resistencia mecánica, durabilidad y el mejor acabado superficial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {materials.map((mat) => {
          const Icon = mat.icon;
          return (
            <div
              key={mat.name}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg border ${mat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${mat.color}`} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {mat.temp}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-display">
                  {mat.name}
                </h3>
                <span className="text-[11px] text-slate-500 block mb-3 font-mono">
                  {mat.type}
                </span>

                <div className="space-y-2 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 text-[11px] block font-medium">Aplicaciones ideales:</span>
                    <p className="text-slate-300 leading-relaxed mt-0.5">{mat.idealFor}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/60">
                    <span className="text-slate-500 text-[11px] block font-medium">Ventajas:</span>
                    <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">{mat.pros}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
                Disponible en el catálogo
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
