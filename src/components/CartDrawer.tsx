import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, MessageCircle, ArrowRight, CheckCircle2, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { CheckoutData } from '../types';
import { generateWhatsAppCheckoutUrl } from '../lib/supabase';
import { resolveProductImage } from '../lib/assets';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, subtotal, totalCount } = useCart();
  
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    nombreCliente: '',
    telefonoCliente: '',
    direccionEnvio: '',
    metodoEntrega: 'retiro',
    metodoPago: 'transferencia',
    notas: ''
  });

  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const formattedSubtotal = subtotal.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  });

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) {
      setValidationError('Tu carrito está vacío. Agrega productos para realizar el pedido.');
      return;
    }

    if (!checkoutData.nombreCliente.trim()) {
      setValidationError('Por favor ingresa tu nombre para personalizar el pedido.');
      return;
    }

    setValidationError(null);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // ignore
    }

    const whatsappUrl = generateWhatsAppCheckoutUrl(cart, checkoutData, subtotal);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyOrder = () => {
    if (cart.length === 0) return;
    const itemsText = cart.map(i => `${i.cantidad}x ${i.producto.nombre} (${i.producto.material}) - $${i.cantidad * i.producto.precio}`).join('\n');
    const orderSummary = `Pedido Universo 3D:\n${itemsText}\nTotal: ${formattedSubtotal}\nCliente: ${checkoutData.nombreCliente || 'Sin especificar'}`;
    navigator.clipboard.writeText(orderSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold font-display text-white">
                Tu Carrito de Impresión
              </h2>
              <span className="text-xs font-mono text-slate-400">
                ({totalCount} {totalCount === 1 ? 'pieza' : 'piezas'})
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-800/80">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-medium text-slate-200">Tu carrito está vacío</h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Explora las piezas disponibles en el catálogo de Universo 3D y agrégalas para armar tu pedido.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-4 py-2 text-xs font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 rounded-lg hover:bg-cyan-900/40 transition-colors"
                >
                  Explorar catálogo
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const lineTotal = item.cantidad * item.producto.precio;
                return (
                  <div key={item.producto.id} className="pt-4 first:pt-0 flex gap-3">
                    {/* Item Thumbnail */}
                    <div className="w-16 h-16 rounded-lg bg-slate-950 overflow-hidden border border-slate-800 flex-shrink-0">
                      {item.producto.imagen_url ? (
                        <img
                          src={resolveProductImage(item.producto.imagen_url)}
                          alt={item.producto.nombre}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-cyan-500/70 font-mono text-[10px]">
                          3D
                        </div>
                      )}
                    </div>

                    {/* Info & Quantity controls */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-semibold text-white line-clamp-1">
                            {item.producto.nombre}
                          </h4>
                          <span className="text-[11px] font-mono text-cyan-400 block mt-0.5">
                            {item.producto.material}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.producto.id)}
                          aria-label={`Eliminar ${item.producto.nombre}`}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Stepper */}
                        <div className="flex items-center border border-slate-700/80 rounded bg-slate-950 text-xs">
                          <button
                            onClick={() => updateQuantity(item.producto.id, item.cantidad - 1)}
                            className="px-2 py-0.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-mono font-medium text-white tabular-nums">
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.producto.id, item.cantidad + 1)}
                            className="px-2 py-0.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs font-mono font-bold text-white tabular-nums">
                          {lineTotal.toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                            maximumFractionDigits: 0
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Form and Checkout section */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950/60 space-y-4">
              
              {/* Optional customer details form */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">Datos para el Pedido:</span>
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    Vaciar carrito
                  </button>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Tu nombre completo *"
                    value={checkoutData.nombreCliente}
                    onChange={(e) => {
                      setCheckoutData({ ...checkoutData, nombreCliente: e.target.value });
                      if (validationError) setValidationError(null);
                    }}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={checkoutData.metodoEntrega}
                    onChange={(e) => setCheckoutData({ ...checkoutData, metodoEntrega: e.target.value as 'retiro' | 'envio' })}
                    className="px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="retiro">Retiro en Taller (Jujuy)</option>
                    <option value="envio">Envío a Domicilio</option>
                  </select>

                  <select
                    value={checkoutData.metodoPago}
                    onChange={(e) => setCheckoutData({ ...checkoutData, metodoPago: e.target.value as any })}
                    className="px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="transferencia">Transferencia / Alias</option>
                    <option value="efectivo">Efectivo al retirar</option>
                    <option value="acordar">Acordar por chat</option>
                  </select>
                </div>

                {checkoutData.metodoEntrega === 'envio' && (
                  <input
                    type="text"
                    placeholder="Dirección y Ciudad de entrega"
                    value={checkoutData.direccionEnvio || ''}
                    onChange={(e) => setCheckoutData({ ...checkoutData, direccionEnvio: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                )}

                <input
                  type="text"
                  placeholder="Nota o color preferido (ej: negro mate, silk dorado)"
                  value={checkoutData.notas || ''}
                  onChange={(e) => setCheckoutData({ ...checkoutData, notas: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {validationError && (
                <div className="p-2 rounded bg-rose-950/80 border border-rose-800 text-rose-300 text-[11px]">
                  {validationError}
                </div>
              )}

              {/* Subtotal strip */}
              <div className="pt-2 border-t border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400">Total Estimado</span>
                  <span className="text-[11px] text-slate-500 block">Sin costo de envío</span>
                </div>
                <span className="text-xl font-extrabold text-white font-mono tabular-nums">
                  {formattedSubtotal}
                </span>
              </div>

              {/* WhatsApp Checkout CTA Button */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckoutWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Enviar Pedido a WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Atención directa por WhatsApp
                  </span>

                  <button
                    onClick={handleCopyOrder}
                    className="hover:text-slate-200 flex items-center gap-1 transition-colors text-slate-500"
                    title="Copiar texto del pedido"
                  >
                    {copied ? <Check className="w-3 h-3 text-cyan-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copiado' : 'Copiar texto'}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
