import React from 'react';
import { Box, MessageCircle, MapPin, Mail, ShieldCheck } from 'lucide-react';
import { WHATSAPP_PHONE } from '../lib/supabase';

export const Footer: React.FC = () => {
  return (
    <footer id="nosotros" className="border-t border-slate-900 bg-slate-950 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 font-display text-white font-bold text-base">
              <div className="w-6 h-6 rounded bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Box className="w-3.5 h-3.5" />
              </div>
              <span>Universo 3D</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Taller de fabricación digital e impresión 3D en Jujuy. Piezas de diseño, prototipado industrial y figuras de colección con terminación profesional.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <span className="text-white font-semibold block text-xs font-display">Navegación</span>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#catalogo" className="hover:text-cyan-400 transition-colors">Catálogo de Productos</a></li>
              <li><a href="#materiales" className="hover:text-cyan-400 transition-colors">Guía de Materiales (PLA, PETG, Resina)</a></li>
              <li><a href="#personalizados" className="hover:text-cyan-400 transition-colors">Presupuestos para archivos STL</a></li>
            </ul>
          </div>

          {/* Col 3: Workshop policies */}
          <div className="space-y-2">
            <span className="text-white font-semibold block text-xs font-display">Taller & Envíos</span>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Control de calidad previo al empaque</span>
              </li>
              <li>Envíos a todo el territorio argentino vía correo y expreso</li>
              <li>Retiro en taller disponible con coordinación previa</li>
            </ul>
          </div>

          {/* Col 4: Contact & WhatsApp */}
          <div className="space-y-2">
            <span className="text-white font-semibold block text-xs font-display">Contacto Directo</span>
            <div className="space-y-1.5">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola Universo 3D, me contacto desde la web.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>+54 9 3888 51-6443 (WhatsApp)</span>
              </a>

              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>San Salvador de Jujuy, Argentina</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Universo 3D. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3">
            <span>Impresión FDM & SLA</span>
            <span aria-hidden="true">·</span>
            <span>Atención Personalizada</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
