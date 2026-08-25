import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Sparkles, 
  Terminal, 
  DollarSign, 
  ShieldCheck,
  Building,
  Copy,
  Check
} from 'lucide-react';
import { OperationalExceptionRecord } from '../types';

interface DecisionDetailModalProps {
  record: OperationalExceptionRecord | null;
  onClose: () => void;
}

export const DecisionDetailModal: React.FC<DecisionDetailModalProps> = ({
  record,
  onClose
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!record) return null;

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(record.system_payload || {}, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050A18]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#0A1128] border border-slate-700 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-[#0A1128]/95 backdrop-blur z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-tight flex items-center gap-2">
                Registro de Despacho Operativo
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                  {record.status}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {record.industry} • {record.priority} • ID: {record.id?.slice(0, 8) || 'LOCAL'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Contingency overview */}
          <div className="bg-[#050A18] border border-slate-700 p-3 rounded-lg">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Contingencia Registrada
            </span>
            <p className="text-slate-200 leading-relaxed text-xs sm:text-sm">
              "{record.scenario}"
            </p>
          </div>

          {/* Metrics Trio */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded bg-slate-900 border border-slate-700 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Viabilidad SLA</span>
              <span className="text-lg font-black font-mono text-emerald-400">{record.sla_feasibility}%</span>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-700 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Costo Marginal</span>
              <span className="text-sm font-black font-mono text-white">{record.estimated_cost}</span>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-700 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Riesgo</span>
              <span className="text-[11px] font-bold text-blue-400 line-clamp-1">{record.risk_status}</span>
            </div>
          </div>

          {/* Action steps */}
          <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-2">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Plan de Acción Ejecutado
            </span>
            <div className="space-y-1.5">
              {record.action_steps?.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-300">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-[#050A18] font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-200 leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rationale */}
          <div className="p-3 bg-slate-950/50 border-l-2 border-emerald-500 rounded-r">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Racional Estratégico Ejecutivo
            </span>
            <p className="text-slate-300 leading-relaxed font-sans italic">
              "{record.executive_rationale}"
            </p>
          </div>

          {/* Payload */}
          {record.system_payload && (
            <div className="border border-slate-700 rounded-lg overflow-hidden bg-[#050A18]">
              <div className="px-3 py-2 bg-slate-900/80 border-b border-slate-700 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-emerald-400" />
                  Payload Disparado a ERP / WMS
                </span>
                <button
                  onClick={handleCopyPayload}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-200"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
              <pre className="p-3 font-mono text-[11px] text-emerald-400/90 overflow-x-auto max-h-36">
                {JSON.stringify(record.system_payload, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 flex items-center justify-end bg-[#0A1128]/95 sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold uppercase text-xs transition-colors border border-slate-600"
          >
            Cerrar Detalles
          </button>
        </div>
      </div>
    </div>
  );
};
