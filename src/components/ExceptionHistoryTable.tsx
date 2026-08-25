import React from 'react';
import { 
  History, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  TrendingUp, 
  Database,
  Building,
  Layers,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { OperationalExceptionRecord } from '../types';

interface ExceptionHistoryTableProps {
  records: OperationalExceptionRecord[];
  onSelectRecord: (record: OperationalExceptionRecord) => void;
  isLoadingFirestore: boolean;
}

export const ExceptionHistoryTable: React.FC<ExceptionHistoryTableProps> = ({
  records,
  onSelectRecord,
  isLoadingFirestore
}) => {
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    } catch {
      return isoString;
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return 'Hoy';
    }
  };

  return (
    <section id="section-exceptions-history" className="mt-8 bg-[#0A1128] border border-slate-700 rounded-xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 mb-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              Historial de Excepciones Resueltas en Tiempo Real
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700 normal-case">
                Firestore Sync Live
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Registro inmutable de decisiones aprobadas, costos y estado de inyección en ERP/WMS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Colección: <code className="text-slate-200">operational_exceptions</code></span>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3">Fecha & Hora</th>
              <th className="py-3 px-3">Industria / Unidad</th>
              <th className="py-3 px-3">Contingencia Operativa</th>
              <th className="py-3 px-3 text-center">Viabilidad SLA</th>
              <th className="py-3 px-3 text-right">Impacto Financiero</th>
              <th className="py-3 px-3 text-center">Estatus ERP</th>
              <th className="py-3 px-3 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300 font-sans">
            {records.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  {isLoadingFirestore ? (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                      Sincronizando con Firestore...
                    </span>
                  ) : (
                    'No hay excepciones aprobadas aún. Orquesta y aprueba una contingencia arriba.'
                  )}
                </td>
              </tr>
            ) : (
              records.map((rec, idx) => (
                <tr 
                  key={rec.id || idx}
                  className="hover:bg-slate-800/50 transition-colors group cursor-pointer bg-slate-900/30"
                  onClick={() => onSelectRecord(rec)}
                >
                  {/* Timestamp */}
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                    <div className="text-slate-200 font-semibold">{formatTime(rec.dispatchedAt)}</div>
                    <div className="text-[10px] text-slate-400">{formatDate(rec.dispatchedAt)}</div>
                  </td>

                  {/* Industry & Priority */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="font-semibold text-slate-200">{rec.industry}</div>
                    <span className={`inline-block text-[10px] px-1.5 py-0.2 rounded font-bold uppercase mt-0.5 ${
                      rec.priority === 'Crítica / Cliente VIP'
                        ? 'bg-rose-950/80 text-rose-300 border border-rose-800/50'
                        : rec.priority === 'Urgencia Alta'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-800/50'
                        : 'bg-sky-950/80 text-sky-300 border border-sky-800/50'
                    }`}>
                      {rec.priority}
                    </span>
                  </td>

                  {/* Scenario Summary */}
                  <td className="py-3 px-3 max-w-xs">
                    <p className="line-clamp-2 text-slate-300 text-xs leading-relaxed group-hover:text-emerald-300 transition-colors">
                      {rec.scenario}
                    </p>
                  </td>

                  {/* SLA */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-mono font-bold text-xs text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                      {rec.sla_feasibility}%
                    </span>
                  </td>

                  {/* Financial Impact */}
                  <td className="py-3 px-3 text-right font-mono font-bold text-xs text-white whitespace-nowrap">
                    {rec.estimated_cost}
                  </td>

                  {/* ERP Status */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      {rec.status || 'Ejecutado'}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRecord(rec);
                      }}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-300 border border-slate-700 transition-colors inline-flex items-center gap-1 text-[11px]"
                      title="Ver detalles del despacho"
                    >
                      <span>Ver Plan</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
