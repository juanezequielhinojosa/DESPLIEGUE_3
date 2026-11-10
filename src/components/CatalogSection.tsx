import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Producto, FilterMaterial } from '../types';
import { ProductCard } from './ProductCard';

interface CatalogSectionProps {
  productos: Producto[];
  isLoading: boolean;
  fromSupabase: boolean;
  supabaseError: string | null;
  onRefresh: () => void;
  onOpenProductModal: (producto: Producto) => void;
  onOpenDiagnostic: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  productos,
  isLoading,
  fromSupabase,
  supabaseError,
  onRefresh,
  onOpenProductModal,
  onOpenDiagnostic
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<FilterMaterial>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<'destacados' | 'precio-asc' | 'precio-desc' | 'nombre'>('destacados');

  // Filtered products calculation
  const filteredProductos = useMemo(() => {
    return productos.filter((prod) => {
      // Material filter
      if (selectedMaterial !== 'todos') {
        const matLower = (prod.material || '').toLowerCase();
        if (!matLower.includes(selectedMaterial.toLowerCase())) {
          return false;
        }
      }

      // Stock filter
      if (onlyInStock && prod.stock <= 0) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = prod.nombre.toLowerCase().includes(query);
        const matchDesc = (prod.descripcion || '').toLowerCase().includes(query);
        const matchCat = (prod.categoria || '').toLowerCase().includes(query);
        const matchMat = (prod.material || '').toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCat && !matchMat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'precio-asc') return a.precio - b.precio;
      if (sortBy === 'precio-desc') return b.precio - a.precio;
      if (sortBy === 'nombre') return a.nombre.localeCompare(b.nombre);
      // default: destacados first, then by id
      if (a.destacado && !b.destacado) return -1;
      if (!a.destacado && b.destacado) return 1;
      return 0;
    });
  }, [productos, selectedMaterial, searchQuery, onlyInStock, sortBy]);

  const materialsList: { label: string; value: FilterMaterial }[] = [
    { label: 'Todos los Materiales', value: 'todos' },
    { label: 'PLA / PLA+', value: 'PLA' },
    { label: 'PETG Técnico', value: 'PETG' },
    { label: 'Resina 8K', value: 'Resina' }
  ];

  return (
    <section id="catalogo" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>Catálogo Activo</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>Piezas Listas & Producción</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display mt-1">
            Piezas de Taller & Colección
          </h2>
        </div>

        {/* Supabase Connection Status Pill */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={onOpenDiagnostic}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 transition-colors ${
              fromSupabase
                ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/40'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {fromSupabase ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Supabase conectado ({productos.length} items)</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Modo catálogo local ({productos.length} items)</span>
              </>
            )}
          </button>

          <button
            onClick={onRefresh}
            disabled={isLoading}
            aria-label="Actualizar catálogo desde Supabase"
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-colors disabled:opacity-50"
            title="Recargar desde Supabase"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar (§1.A Segmented controls are functional buttons) */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-8 space-y-4">
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Material segmented control buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950/80 rounded-lg border border-slate-800 w-full md:w-auto">
            {materialsList.map((mat) => {
              const active = selectedMaterial === mat.value;
              return (
                <button
                  key={mat.value}
                  onClick={() => setSelectedMaterial(mat.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {mat.label}
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por nombre o pieza..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Secondary filters row */}
        <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <span>Solo piezas con stock inmediato</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-400">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1 text-xs bg-slate-950 border border-slate-800 rounded-md text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="destacados">Destacados del taller</option>
              <option value="precio-asc">Menor precio</option>
              <option value="precio-desc">Mayor precio</option>
              <option value="nombre">Nombre alfabético</option>
            </select>
          </div>

        </div>

      </div>

      {/* Grid of Products (§2.A 3-column desktop grid with generous gap-6) */}
      {filteredProductos.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-8 space-y-3">
          <p className="text-slate-400 text-sm">
            No se encontraron productos con los filtros aplicados.
          </p>
          <button
            onClick={() => {
              setSelectedMaterial('todos');
              setSearchQuery('');
              setOnlyInStock(false);
            }}
            className="px-4 py-2 text-xs font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-800/60 rounded-lg hover:bg-cyan-900/40 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProductos.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onOpenModal={onOpenProductModal}
            />
          ))}
        </div>
      )}

      {/* Section Footer helper */}
      <div className="mt-12 text-center text-xs text-slate-500">
        Mostrando <span className="text-slate-300 font-mono font-medium">{filteredProductos.length}</span> de <span className="text-slate-300 font-mono font-medium">{productos.length}</span> productos en catálogo.
      </div>
    </section>
  );
};
