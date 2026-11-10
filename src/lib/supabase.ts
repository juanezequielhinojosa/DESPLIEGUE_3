import { createClient } from '@supabase/supabase-js';
import { Producto, CartItem, CheckoutData } from '../types';
import { lampImg, planterImg, dragonImg, resolveProductImage } from './assets';

export const SUPABASE_URL = 'https://uxfkzqblxvncdqcybbao.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_HO0mqGV6SSUtO2GcpHFRvA_wbYsp3-R';
export const WHATSAPP_PHONE = '5493888516443';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fallback catalog products in case Supabase table is empty or pending rows
export const FALLBACK_PRODUCTOS: Producto[] = [
  {
    id: 'prod-001',
    nombre: 'Lámpara Espiral Voronoi de Mesa',
    precio: 14500,
    imagen_url: lampImg,
    material: 'PLA Madera / Ivory',
    stock: 8,
    descripcion: 'Lámpara de diseño paramétrico con estructura celular Voronoi. Incluye cable textil con interruptor y portalámpara E27.',
    categoria: 'Iluminación y Deco',
    dimensiones: '22cm x 15cm x 15cm',
    tiempo_impresion: '18 horas',
    destacado: true
  },
  {
    id: 'prod-002',
    nombre: 'Maceta Geométrica Facetada Origami',
    precio: 4200,
    imagen_url: planterImg,
    material: 'PLA Mate Blanco',
    stock: 15,
    descripcion: 'Maceta de bajo poligonaje con drenaje interno optimizado para cactus y suculentas. Acabado arquitectónico limpio.',
    categoria: 'Deco & Hogar',
    dimensiones: '10cm x 11cm x 11cm',
    tiempo_impresion: '4 horas',
    destacado: true
  },
  {
    id: 'prod-003',
    nombre: 'Dragón Articulado Silk Dual-Color',
    precio: 9800,
    imagen_url: dragonImg,
    material: 'Silk PLA Púrpura / Dorado',
    stock: 6,
    descripcion: 'Dragón con más de 20 vértebras móviles impreso en una sola pieza (Print-in-Place). Acabado metalizado brillante con escamas de alta definición.',
    categoria: 'Figuras & Colección',
    dimensiones: '45cm longitud extendida',
    tiempo_impresion: '14 horas',
    destacado: true
  },
  {
    id: 'prod-004',
    nombre: 'Soporte Ergonómico para Auriculares Gamer',
    precio: 6500,
    imagen_url: null,
    material: 'PETG Negro Mate',
    stock: 10,
    descripcion: 'Soporte robusto anti-deslizante diseñado para auriculares de estudio y gaming. Soporta hasta 1.5kg sin deformarse.',
    categoria: 'Setup & Tech',
    dimensiones: '26cm x 13cm x 12cm',
    tiempo_impresion: '7 horas',
    destacado: false
  },
  {
    id: 'prod-005',
    nombre: 'Busto Escultura David Cyberpunk Low-Poly',
    precio: 8900,
    imagen_url: null,
    material: 'Resina UV Gris 8K',
    stock: 4,
    descripcion: 'Reinterpretación geométrica del David de Miguel Ángel en resina fotocurable de resolución ultra fina (50 micrones).',
    categoria: 'Arte & Escultura',
    dimensiones: '18cm x 12cm x 9cm',
    tiempo_impresion: '9 horas',
    destacado: true
  },
  {
    id: 'prod-006',
    nombre: 'Organizador Modular Hexagonal de Escritorio',
    precio: 5300,
    imagen_url: null,
    material: 'PLA Gris Basalto',
    stock: 12,
    descripcion: 'Set de 3 módulos magnéticos interconectables para lápices, clips, tarjetas SD y herramientas de precisión.',
    categoria: 'Setup & Tech',
    dimensiones: '12cm x 14cm x 8cm',
    tiempo_impresion: '6 horas',
    destacado: false
  }
];

export interface FetchProductosResult {
  productos: Producto[];
  fromSupabase: boolean;
  totalSupabaseRows: number;
  error: string | null;
}

/**
 * Fetches products from Supabase table 'productos'.
 * If the table is empty or error occurs, gracefully falls back to curated workshop products.
 */
export async function fetchProductos(): Promise<FetchProductosResult> {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*');

    if (error) {
      console.warn('Supabase query returned error:', error.message);
      return {
        productos: FALLBACK_PRODUCTOS,
        fromSupabase: false,
        totalSupabaseRows: 0,
        error: error.message
      };
    }

    if (!data || data.length === 0) {
      return {
        productos: FALLBACK_PRODUCTOS,
        fromSupabase: false,
        totalSupabaseRows: 0,
        error: null
      };
    }

    // Map and sanitize supabase data
    const mappedProductos: Producto[] = data.map((item, index) => {
      // Pick fallback image if imagen_url is empty or invalid
      const fallbackImgs = [planterImg, lampImg, dragonImg];
      const rawImg = item.imagen_url || fallbackImgs[index % fallbackImgs.length];
      const img = resolveProductImage(rawImg);

      return {
        id: item.id ?? `sb-${index + 1}`,
        nombre: item.nombre || 'Pieza 3D Personalizada',
        precio: typeof item.precio === 'number' ? item.precio : parseFloat(item.precio || '0') || 0,
        imagen_url: img,
        material: item.material || 'PLA Premium',
        stock: typeof item.stock === 'number' ? item.stock : parseInt(item.stock || '0', 10) || 0,
        descripcion: item.descripcion || 'Pieza fabricada en impresión 3D con filamento de alta calidad y precisión de capas.',
        categoria: item.categoria || 'Impresión 3D',
        dimensiones: item.dimensiones || undefined,
        tiempo_impresion: item.tiempo_impresion || undefined,
        destacado: item.destacado ?? (index < 3)
      };
    });

    return {
      productos: mappedProductos,
      fromSupabase: true,
      totalSupabaseRows: data.length,
      error: null
    };
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : 'Error al conectar con Supabase';
    console.error('Fetch error:', err);
    return {
      productos: FALLBACK_PRODUCTOS,
      fromSupabase: false,
      totalSupabaseRows: 0,
      error: errMsg
    };
  }
}

/**
 * Generates the WhatsApp checkout URL with a neatly formatted order message
 */
export function generateWhatsAppCheckoutUrl(
  items: CartItem[],
  checkoutData: CheckoutData,
  totalAmount: number
): string {
  const lineItemsText = items
    .map((item) => {
      const sub = item.cantidad * item.producto.precio;
      const formattedUnitPrice = item.producto.precio.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
      });
      const formattedSubtotal = sub.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
      });
      return `• ${item.cantidad}x *${item.producto.nombre}*\n  (Material: ${item.producto.material}) | ${formattedUnitPrice} c/u ➔ ${formattedSubtotal}`;
    })
    .join('\n\n');

  const formattedTotal = totalAmount.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  });

  const entregaText = checkoutData.metodoEntrega === 'retiro'
    ? 'Retiro por taller Universo 3D'
    : `Envío a domicilio (${checkoutData.direccionEnvio || 'A coordinar'})`;

  const pagoText = checkoutData.metodoPago === 'transferencia'
    ? 'Transferencia bancaria / Alias'
    : checkoutData.metodoPago === 'efectivo'
    ? 'Efectivo contra entrega'
    : 'A acordar con el taller';

  let message = `*¡Hola Universo 3D! Quiero confirmar mi pedido desde la web:* 🚀\n\n`;
  message += `📦 *DETALLE DE LOS PRODUCTOS:*\n${lineItemsText}\n\n`;
  message += `💰 *TOTAL A PAGAR:* *${formattedTotal}*\n\n`;
  message += `👤 *DATOS DEL CLIENTE:*\n`;
  message += `• *Nombre:* ${checkoutData.nombreCliente.trim() || 'Cliente web'}\n`;
  if (checkoutData.telefonoCliente?.trim()) {
    message += `• *Teléfono:* ${checkoutData.telefonoCliente.trim()}\n`;
  }
  message += `• *Entrega:* ${entregaText}\n`;
  message += `• *Forma de Pago:* ${pagoText}\n`;

  if (checkoutData.notas && checkoutData.notas.trim()) {
    message += `• *Notas / Color preferido:* ${checkoutData.notas.trim()}\n`;
  }

  message += `\n¿Me confirman disponibilidad y tiempo estimado de entrega? ¡Gracias! 🙌`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
