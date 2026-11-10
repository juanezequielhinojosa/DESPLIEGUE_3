import React, { useState } from 'react';
import { ShoppingBag, Eye, Box, Check, Sparkles } from 'lucide-react';
import { Producto } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  producto: Producto;
  onOpenModal: (producto: Producto) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ producto, onOpenModal }) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const formattedPrice = producto.precio.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(producto, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const isOutOfStock = producto.stock <= 0;

  return (
    <div
      onClick={() => onOpenModal(producto)}
      className="group relative flex flex-col bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-200 cursor-pointer"
    >
      {/* Product Image slot (65-75% visual proportion per e-commerce guidelines) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950/90 flex items-center justify-center">
        {producto.imagen_url && !imageError ? (
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 to-slate-950">
            <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 mb-2">
              <Box className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-slate-300 line-clamp-1">{producto.nombre}</span>
            <span className="text-[11px] text-slate-500 font-mono mt-0.5">{producto.material}</span>
          </div>
        )}

        {/* Subtle Material tag & Stock indicator (Zero-pill discipline: unboxed clean text or quiet tag) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 text-[11px] font-mono font-medium rounded bg-slate-950/85 backdrop-blur-md text-cyan-300 border border-slate-800">
            {producto.material}
          </span>
          
          <span className={`px-2 py-0.5 text-[11px] font-mono rounded backdrop-blur-md border ${
            isOutOfStock
              ? 'bg-rose-950/80 text-rose-300 border-rose-800/50'
              : producto.stock <= 3
              ? 'bg-amber-950/80 text-amber-300 border-amber-800/50'
              : 'bg-slate-950/85 text-emerald-300 border-slate-800'
          }`}>
            {isOutOfStock ? 'Bajo Pedido' : `${producto.stock} en stock`}
          </span>
        </div>

        {/* Quick View Overlay on Desktop Hover */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none">
          <span className="px-3 py-1.5 rounded-lg bg-slate-900/90 text-xs font-medium text-white border border-slate-700 shadow-lg flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            Ver detalles
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
            <span>{producto.categoria || 'Impresión 3D'}</span>
            {producto.destacado && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400 flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3" /> Destacado
                </span>
              </>
            )}
          </div>
          <h3 className="text-base font-semibold text-white mt-1 group-hover:text-cyan-300 transition-colors line-clamp-1">
            {producto.nombre}
          </h3>
          {producto.descripcion && (
            <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
              {producto.descripcion}
            </p>
          )}
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-slate-500 block">Precio</span>
            <span className="text-lg font-bold text-white font-mono tabular-nums">
              {formattedPrice}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            aria-label={`Agregar ${producto.nombre} al carrito`}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              justAdded
                ? 'bg-emerald-500 text-slate-950 scale-95'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Agregado</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
