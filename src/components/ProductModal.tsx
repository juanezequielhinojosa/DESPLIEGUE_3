import React, { useState } from 'react';
import { X, ShoppingBag, MessageCircle, Box, Check, Ruler, Clock, Layers } from 'lucide-react';
import { Producto } from '../types';
import { useCart } from '../context/CartContext';
import { WHATSAPP_PHONE } from '../lib/supabase';

interface ProductModalProps {
  producto: Producto | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ producto, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [added, setAdded] = useState(false);

  if (!producto) return null;

  const formattedPrice = producto.precio.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  });

  const handleAddToCart = () => {
    addToCart(producto, cantidad);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      setIsCartOpen(true);
    }, 600);
  };

  const handleDirectWhatsApp = () => {
    const text = `¡Hola Universo 3D! Quisiera consultar sobre el producto: *${producto.nombre}* (Material: ${producto.material}, Precio: ${formattedPrice}). ¿Tienen disponibilidad o opciones de colores?`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal de producto"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/70 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media (Left column) */}
        <div className="md:w-1/2 bg-slate-950 flex items-center justify-center relative min-h-[260px] md:min-h-full">
          {producto.imagen_url && !imageError ? (
            <img
              src={producto.imagen_url}
              alt={producto.nombre}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover max-h-[380px] md:max-h-full"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Box className="w-16 h-16 text-cyan-400/80 mb-3" />
              <span className="text-sm font-semibold text-slate-300">{producto.nombre}</span>
              <span className="text-xs text-slate-500 font-mono mt-1">{producto.material}</span>
            </div>
          )}

          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/85 text-[11px] font-mono text-cyan-300 border border-slate-800">
            {producto.material}
          </div>
        </div>

        {/* Product Details & Actions (Right column) */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                {producto.categoria || 'Impresión 3D'}
              </span>
              <h2 className="text-2xl font-bold text-white font-display mt-1">
                {producto.nombre}
              </h2>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-extrabold text-white font-mono tabular-nums">
                {formattedPrice}
              </span>
              <span className="text-xs text-slate-400">
                {producto.stock > 0 ? `${producto.stock} unidades listas` : 'Fabricación a demanda'}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {producto.descripcion}
            </p>

            {/* Technical specs strip */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-500 flex items-center gap-1.5 text-[11px]">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  Material
                </span>
                <span className="text-slate-200 font-medium mt-0.5 block">{producto.material}</span>
              </div>

              {producto.dimensiones && (
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-500 flex items-center gap-1.5 text-[11px]">
                    <Ruler className="w-3.5 h-3.5 text-cyan-400" />
                    Dimensiones
                  </span>
                  <span className="text-slate-200 font-medium mt-0.5 block">{producto.dimensiones}</span>
                </div>
              )}

              {producto.tiempo_impresion && (
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-500 flex items-center gap-1.5 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    Tiempo de capa
                  </span>
                  <span className="text-slate-200 font-medium mt-0.5 block">{producto.tiempo_impresion}</span>
                </div>
              )}

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-500 text-[11px] block">Relleno (Infill)</span>
                <span className="text-slate-200 font-medium mt-0.5 block">20% Giroidal de alta resistencia</span>
              </div>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-medium text-slate-300">Cantidad:</span>
              <div className="flex items-center border border-slate-700 rounded-lg bg-slate-950">
                <button
                  type="button"
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  className="px-3 py-1 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors rounded-l-lg"
                >
                  -
                </button>
                <span className="px-4 py-1 text-xs font-mono text-white font-semibold">
                  {cantidad}
                </span>
                <button
                  type="button"
                  onClick={() => setCantidad((c) => Math.min(producto.stock > 0 ? producto.stock : 99, c + 1))}
                  className="px-3 py-1 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 transition-all cursor-pointer"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>¡Agregado al carrito!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Agregar al carrito ({formattedPrice})</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDirectWhatsApp}
                title="Consultar por WhatsApp sobre esta pieza"
                className="p-3 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-400 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
