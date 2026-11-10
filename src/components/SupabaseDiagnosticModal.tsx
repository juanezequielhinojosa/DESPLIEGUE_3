import React, { useState } from 'react';
import { X, Database, CheckCircle2, AlertTriangle, RefreshCw, PlusCircle, Check } from 'lucide-react';
import { supabase, SUPABASE_URL, FALLBACK_PRODUCTOS } from '../lib/supabase';

interface SupabaseDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReloadCatalog: () => void;
}

export const SupabaseDiagnosticModal: React.FC<SupabaseDiagnosticModalProps> = ({
  isOpen,
  onClose,
  onReloadCatalog
}) => {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    status: 'idle' | 'success' | 'error';
    rowCount: number;
    sampleRow?: any;
    message?: string;
  }>({ status: 'idle', rowCount: 0 });

  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const runTest = async () => {
    setTesting(true);
    setTestResult({ status: 'idle', rowCount: 0 });
    try {
      const { data, error } = await supabase.from('productos').select('*');
      if (error) {
        setTestResult({
          status: 'error',
          rowCount: 0,
          message: error.message
        });
      } else {
        setTestResult({
          status: 'success',
          rowCount: data?.length || 0,
          sampleRow: data && data.length > 0 ? data[0] : null,
          message: data?.length === 0 ? 'La tabla productos existe pero actualmente tiene 0 filas.' : undefined
        });
      }
    } catch (err) {
      setTestResult({
        status: 'error',
        rowCount: 0,
        message: err instanceof Error ? err.message : 'Error desconocido'
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSeedProducts = async () => {
    setSeeding(true);
    setSeedMessage(null);
    try {
      const seedData = FALLBACK_PRODUCTOS.map(p => ({
        nombre: p.nombre,
        precio: p.precio,
        imagen_url: p.imagen_url,
        material: p.material,
        stock: p.stock
      }));

      const { data, error } = await supabase.from('productos').insert(seedData).select();
      if (error) {
        setSeedMessage(`Error al insertar: ${error.message} (Verifica que la política RLS permita INSERT a la clave anónima).`);
      } else {
        setSeedMessage(`¡Éxito! Se insertaron ${data?.length || seedData.length} productos en la tabla 'productos' de Supabase.`);
        onReloadCatalog();
      }
    } catch (err) {
      setSeedMessage(`Error: ${err instanceof Error ? err.message : 'No se pudo insertar'}`);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">
              Diagnóstico de Conexión Supabase
            </h3>
            <p className="text-xs text-slate-400">
              Verificación de la tabla <code className="text-cyan-300 font-mono">productos</code>
            </p>
          </div>
        </div>

        {/* Credentials details */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
          <div className="flex justify-between items-center text-slate-400">
            <span>Supabase URL:</span>
            <span className="text-cyan-300 truncate max-w-[280px]">{SUPABASE_URL}</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Tabla de catálogo:</span>
            <span className="text-emerald-400">productos</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Campos requeridos:</span>
            <span className="text-slate-300">nombre, precio, imagen_url, material, stock</span>
          </div>
        </div>

        {/* Test Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200">Prueba de Consulta en Vivo:</span>
            <button
              onClick={runTest}
              disabled={testing}
              className="px-3 py-1.5 text-xs font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-800/60 rounded-lg hover:bg-cyan-900/40 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
              <span>Probar ahora</span>
            </button>
          </div>

          {testResult.status === 'success' && (
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs space-y-1">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Consulta exitosa: {testResult.rowCount} filas encontradas</span>
              </div>
              {testResult.message && <p className="text-slate-400 text-[11px]">{testResult.message}</p>}
              {testResult.sampleRow && (
                <div className="mt-2 pt-2 border-t border-emerald-900/60 text-[11px] font-mono text-slate-300 overflow-x-auto">
                  <span className="text-slate-400 block mb-1">Muestra de primer producto:</span>
                  <pre className="bg-slate-950 p-2 rounded">
                    {JSON.stringify(testResult.sampleRow, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {testResult.status === 'error' && (
            <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-800/80 text-rose-300 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Error devuelto por Supabase:</span>
              </div>
              <p className="font-mono text-[11px]">{testResult.message}</p>
              <p className="text-slate-400 text-[11px] pt-1">
                Tip: En Supabase SQL Editor ejecuta:<br />
                <code className="text-cyan-300 block bg-slate-950 p-1.5 rounded mt-1">
                  ALTER TABLE productos ENABLE ROW LEVEL SECURITY;<br />
                  CREATE POLICY "Public read" ON productos FOR SELECT USING (true);
                </code>
              </p>
            </div>
          )}
        </div>

        {/* Option to seed if empty */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300">¿Deseas poblar la tabla con los productos de muestra?</span>
            <button
              onClick={handleSeedProducts}
              disabled={seeding}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{seeding ? 'Insertando...' : 'Cargar en Supabase'}</span>
            </button>
          </div>
          {seedMessage && (
            <p className="text-[11px] text-cyan-300 font-mono mt-1">
              {seedMessage}
            </p>
          )}
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
