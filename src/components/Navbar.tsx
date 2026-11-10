import React from 'react';
import { ShoppingBag, Box, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { WHATSAPP_PHONE } from '../lib/supabase';

interface NavbarProps {
  onOpenDiagnostic: () => void;
  supabaseConnected: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDiagnostic, supabaseConnected }) => {
  const { totalCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single element brand wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 group font-display"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
              <Box className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <span>Universo 3D</span>
        </a>

        {/* Zone 2: 4 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#catalogo" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Catálogo
          </a>
          <a href="#materiales" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Materiales
          </a>
          <a href="#personalizados" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Impresión a Pedido
          </a>
          <a href="#nosotros" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            El Taller
          </a>
        </nav>

        {/* Zone 3: 1 primary action (Cart Drawer trigger + direct WhatsApp link) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenDiagnostic}
            title={supabaseConnected ? "Supabase conectado correctamente" : "Ver estado de conexión Supabase"}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${supabaseConnected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span>Supabase</span>
          </button>

          <a
            href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('¡Hola Universo 3D! Quisiera consultar sobre sus servicios de impresión 3D.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 rounded-lg hover:bg-emerald-900/40 transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Ver carrito de compras con ${totalCount} artículos`}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-slate-950" />
            <span className="hidden sm:inline">Carrito</span>
            {totalCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-slate-950 text-cyan-300 rounded-full text-[11px] font-mono tabular-nums font-bold">
                {totalCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
