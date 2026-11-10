import React, { useState } from 'react';
import { Upload, MessageCircle, FileCode, CheckCircle2, Cpu } from 'lucide-react';
import { WHATSAPP_PHONE } from '../lib/supabase';

export const CustomPrintSection: React.FC = () => {
  const [material, setMaterial] = useState('PLA+');
  const [color, setColor] = useState('Negro Mate');
  const [tamano, setTamano] = useState('Mediano (~15 cm)');
  const [descripcion, setDescripcion] = useState('');
  const [linkArchivo, setLinkArchivo] = useState('');

  const handleSendCustomQuote = (e: React.FormEvent) => {
    e.preventDefault();

    let text = `*¡Hola Universo 3D! Quisiera pedir presupuesto para una impresión 3D a medida:* 📐\n\n`;
    text += `• *Material deseado:* ${material}\n`;
    text += `• *Color preferido:* ${color}\n`;
    text += `• *Tamaño aproximado:* ${tamano}\n`;
    if (descripcion.trim()) {
      text += `• *Descripción / Uso de la pieza:* ${descripcion.trim()}\n`;
    }
    if (linkArchivo.trim()) {
      text += `• *Enlace al modelo (Thingiverse/Drive/etc):* ${linkArchivo.trim()}\n`;
    }
    text += `\n¿A qué número de email o WhatsApp puedo adjuntar el archivo STL para que lo laminen y me pasen cotización? ¡Gracias!`;

    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="personalizados" className="py-16 bg-slate-900/60 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <FileCode className="w-4 h-4" />
              <span>Fabricación a Medida</span>
            </div>

            <h2 className="text-3xl font-extrabold text-white font-display leading-tight">
              ¿Tenés un archivo 3D listo para fabricar?
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Imprimimos tus modelos descargados de <strong>Printables, Thingiverse, MakerWorld</strong> o diseñados en Fusion 360 / Blender.
              Te asesoramos en la orientación óptima, porcentaje de relleno y selección de material.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Formatos soportados: <strong>.STL, .OBJ, .3MF, .STEP</strong></span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Laminado y presupuesto en gramos y horas de máquina en menos de 2 horas</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Garantía de tolerancia dimensional y control de calidad previo al despacho</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive WhatsApp Quoting Form */}
          <div className="lg:col-span-7 bg-slate-950/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white font-display">
                  Configurador Rápido de Presupuesto
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/40">
                Respuesta directa
              </span>
            </div>

            <form onSubmit={handleSendCustomQuote} className="mt-6 space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Material</label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="PLA+">PLA+ (Figuras, Deco)</option>
                    <option value="PETG">PETG (Mecánico, Calor)</option>
                    <option value="Resina 8K">Resina 8K (Miniaturas)</option>
                    <option value="TPU Flexible">TPU Flexible (Goma)</option>
                    <option value="Asesorarme">No estoy seguro (Asesorarme)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-medium block mb-1">Color / Acabado</label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Ej: Negro mate, Blanco, Seda"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-medium block mb-1">Escala / Tamaño</label>
                  <select
                    value={tamano}
                    onChange={(e) => setTamano(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Miniatura (< 6 cm)">Miniatura (&lt; 6 cm)</option>
                    <option value="Mediano (~15 cm)">Mediano (~15 cm)</option>
                    <option value="Grande (> 25 cm)">Grande (&gt; 25 cm)</option>
                    <option value="Escala 1:1 original">Escala 1:1 original del STL</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-medium block mb-1">
                  Enlace al archivo STL / Proyecto (opcional)
                </label>
                <div className="relative">
                  <Upload className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="url"
                    value={linkArchivo}
                    onChange={(e) => setLinkArchivo(e.target.value)}
                    placeholder="https://www.thingiverse.com/thing:... o Google Drive"
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-medium block mb-1">
                  Descripción o requerimientos mecánicos (opcional)
                </label>
                <textarea
                  rows={2}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Ej: Es un repuesto para una aspiradora, debe resistir fricción. O es un busto para pintar a mano..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Pedir Cotización Inmediata por WhatsApp</span>
              </button>

              <p className="text-center text-[11px] text-slate-500">
                Se abrirá WhatsApp con el mensaje estructurado para que puedas adjuntar tu archivo directamente al taller.
              </p>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
