/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Producto } from './types';
import { fetchProductos } from './lib/supabase';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { MaterialsGuide } from './components/MaterialsGuide';
import { CustomPrintSection } from './components/CustomPrintSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { SupabaseDiagnosticModal } from './components/SupabaseDiagnosticModal';
import { Check, X } from 'lucide-react';

function AppContent() {
  const { notification, clearNotification } = useCart();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fromSupabase, setFromSupabase] = useState<boolean>(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState<boolean>(false);

  const loadCatalog = useCallback(async () => {
    setIsLoading(true);
    const result = await fetchProductos();
    setProductos(result.productos);
    setFromSupabase(result.fromSupabase);
    setSupabaseError(result.error);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCustomQuote = () => {
    const el = document.getElementById('personalizados');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Toast feedback notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/50 text-xs text-white shadow-2xl shadow-cyan-950/60 animate-in slide-in-from-bottom-2 fade-in duration-200">
          <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="font-medium">{notification}</span>
          <button 
            onClick={clearNotification}
            className="text-slate-400 hover:text-white p-0.5 ml-1 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
        supabaseConnected={fromSupabase}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScrollToCatalog={handleScrollToCatalog}
          onOpenCustomQuote={handleOpenCustomQuote}
        />

        {/* Catalog Section */}
        <CatalogSection
          productos={productos}
          isLoading={isLoading}
          fromSupabase={fromSupabase}
          supabaseError={supabaseError}
          onRefresh={loadCatalog}
          onOpenProductModal={(prod) => setSelectedProduct(prod)}
          onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
        />

        {/* Custom 3D Printing Service Section */}
        <CustomPrintSection />

        {/* Materials Technical Reference */}
        <MaterialsGuide />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer Slide-over */}
      <CartDrawer />

      {/* Product Detail Modal */}
      <ProductModal
        producto={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Supabase Diagnostic & Sync Modal */}
      <SupabaseDiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        onReloadCatalog={loadCatalog}
      />

    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
