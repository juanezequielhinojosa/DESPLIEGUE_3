export interface Producto {
  id: string | number;
  nombre: string;
  precio: number;
  imagen_url: string | null;
  material: string;
  stock: number;
  descripcion?: string;
  categoria?: string;
  dimensiones?: string;
  tiempo_impresion?: string;
  destacado?: boolean;
}

export interface CartItem {
  producto: Producto;
  cantidad: number;
}

export interface CheckoutData {
  nombreCliente: string;
  telefonoCliente?: string;
  direccionEnvio?: string;
  metodoEntrega: 'retiro' | 'envio';
  metodoPago: 'transferencia' | 'efectivo' | 'acordar';
  notas?: string;
}

export type FilterMaterial = 'todos' | 'PLA' | 'PETG' | 'Resina' | 'ABS' | 'TPU';
