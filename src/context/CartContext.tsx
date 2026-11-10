import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Producto } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (producto: Producto, cantidad?: number) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, cantidad: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  notification: string | null;
  clearNotification: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'universo3d_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage:', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const clearNotification = () => setNotification(null);

  const addToCart = (producto: Producto, cantidad: number = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.producto.id === producto.id);
      
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        const newQty = newCart[existingIndex].cantidad + cantidad;
        
        // If stock is known and exceeded, cap it if stock > 0
        const maxStock = producto.stock > 0 ? producto.stock : 999;
        const cappedQty = Math.min(newQty, maxStock);
        
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          cantidad: cappedQty
        };
        showNotification(`Actualizado: ${producto.nombre} (${cappedQty} en el carrito)`);
        return newCart;
      } else {
        const initialQty = Math.min(cantidad, producto.stock > 0 ? producto.stock : 999);
        showNotification(`Agregado al carrito: ${producto.nombre}`);
        return [...prevCart, { producto, cantidad: initialQty }];
      }
    });
  };

  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => item.producto.id !== id));
  };

  const updateQuantity = (id: string | number, cantidad: number) => {
    if (cantidad <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.producto.id === id) {
          const maxStock = item.producto.stock > 0 ? item.producto.stock : 999;
          return {
            ...item,
            cantidad: Math.min(cantidad, maxStock)
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCount = cart.reduce((sum, item) => sum + item.cantidad, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.cantidad * item.producto.precio, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        notification,
        clearNotification
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
