import React, { useState } from 'react';
import { 
  CheckCircle, 
  DollarSign, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Terminal, 
  Copy, 
  Check, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp,
  Loader2
} from 'lucide-react';
import { OperationalDecisionResponse } from '../types';

interface ExecutiveDecisionDeskProps {
  decision: OperationalDecisionResponse | null;
  isLoading: boolean;
  isSaving: boolean;
  onApproveAndExecute: () => void;
}

export const ExecutiveDecisionDesk: React.FC<ExecutiveDecisionDeskProps> = ({
  decision,
  isLoading,
  isSaving,
  onApproveAndExecute
}) => {
  const [showPayload, setShowPayload] = useState<boolean>(false);
  const [copiedSteps, setCopiedSteps] = useState<boolean>(false);

  const handleCopySteps = () => {
    if (!decision) return;
    const textToCopy = decision.action_steps
      .map((step, i) => `${i + 1}. ${step}`)
      .join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopiedSteps(true);
    setTimeout(() => setCopiedSteps(false), 2000);
  };

  // Helper to color-code the SLA fulfillment gauge
  const getSlaColor = (sla: number) => {
    if (sla >= 95) return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30';
    if (sla >= 80) return 'text-amber-400 border-amber-500/40 bg-amber-950/30';
    return 'text-rose-400 border-rose-500/40 bg-rose-950/30';
  };

  const getSlaBadgeColor = (sla: number) => {
    if (sla >= 95) return 'bg-emerald-500 text-slate-950';
    if (sla >= 80) return 'bg-amber-500 text-slate-950';
    return 'bg-rose-500 text-slate-100';
  };

  return (
    <div id="panel-executive-decision-desk" className="bg-slate-900/80 border border-slate-700 rounded-xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/3 w-80 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-emerald-900/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                Executive Decision Desk
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700 normal-case">
                  Gemini 3.7 Flash Engine
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Estrategia operativa de alta precisión generada en tiempo real
              </p>
            </div>
          </div>

          {decision && (
            <button
              id="btn-copy-action-plan"
              onClick={handleCopySteps}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 border border-slate-600"
              title="Copiar pasos de acción"
            >
              {copiedSteps ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copiar Plan</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="relative mb-4">
              <div className="w-14 h-14 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin flex items-center justify-center"></div>
              <Sparkles className="w-6 h-6 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <h3 className="text-sm font-bold text-slate-200 mb-1">
              Sintetizando Plan de Mitigación y Despacho...
            </h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Analizando restricciones de flota, SLAs contractuales, inventarios en red y ventanas de tiempo.
            </p>
          </div>
        )}

        {/* Empty State (Waiting for orchestration) */}
        {!isLoading && !decision && (
          <div className="py-14 flex flex-col items-center justify-center text-center px-4">
            <div className="w-12 h-12 rounded-xl bg-[#050A18] border border-slate-700 flex items-center justify-center text-slate-400 mb-3 shadow-inner">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-300 mb-1">
              Esperando Contingencia Operativa
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mb-4">
              Selecciona uno de los 4 escenarios preconfigurados o describe un caso en el panel izquierdo y pulsa <strong>"Orquestar Resolución"</strong>.
            </p>
            <div className="text-[11px] text-slate-400 bg-slate-950/80 border border-slate-800 rounded-md px-3 py-1.5 flex items-center gap-2 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Gemini 3.7 Flash listo para responder en &lt; 1.5s</span>
            </div>
          </div>
        )}

        {/* Decision Output Content */}
        {!isLoading && decision && (
          <div className="space-y-4">
            {/* Real-time Executive Impact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 1. SLA Feasibility Meter */}
              <div 
                id="card-sla-feasibility"
                className="bg-slate-900 border border-slate-700 rounded-lg p-4 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Viabilidad SLA
                  </span>
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-mono text-emerald-400">
                    {decision.sla_feasibility}%
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                    {decision.sla_feasibility >= 90 ? 'Óptimo' : 'Aceptable'}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-emerald-400 transition-all duration-500" 
                    style={{ 
                      width: `${Math.min(100, Math.max(0, decision.sla_feasibility))}%`
                    }}
                  />
                </div>
              </div>

              {/* 2. Financial Impact / Additional Cost */}
              <div 
                id="card-estimated-cost"
                className="bg-slate-900 border border-slate-700 rounded-lg p-4 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-1 mb-1 text-slate-500">
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Impacto Financiero
                  </span>
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black font-mono text-white">
                    {decision.estimated_cost}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">
                  Costo marginal vs penalización
                </span>
              </div>

              {/* 3. Mitigated Risk / Preserved Margin */}
              <div 
                id="card-risk-status"
                className="bg-slate-900 border border-slate-700 rounded-lg p-4 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-1 mb-1 text-slate-500">
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Riesgo Mitigado
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-black text-blue-400 leading-tight">
                    {decision.risk_status?.includes('%') ? decision.risk_status.match(/\d+%/)?.[0] || '89%' : '89%'}
                  </p>
                  <p className="text-[11px] font-bold text-slate-300 line-clamp-1 mt-0.5">
                    {decision.risk_status}
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">
                  Continuidad y márgenes
                </span>
              </div>
            </div>

            {/* Plan de Acción Inmediato (Paso a Paso) */}
            <div id="section-action-steps" className="bg-slate-950/60 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  Plan de Acción Inmediato
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  {decision.action_steps?.length || 0} acciones clave
                </span>
              </div>

              <div className="space-y-2.5">
                {decision.action_steps?.map((step, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2.5 text-sm text-slate-200"
                  >
                    <span className="w-5 h-5 flex items-center justify-center bg-emerald-500 text-[#050A18] text-[10px] font-bold rounded-full flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <p className="leading-relaxed font-sans text-slate-200 text-xs sm:text-sm">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Racional Estratégico de Gemini */}
            <div id="section-executive-rationale" className="p-3 bg-slate-950/50 border-l-2 border-emerald-500 rounded-r">
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  Racional Estratégico Gemini (COO Perspective)
                </p>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans italic">
                "{decision.executive_rationale}"
              </p>
            </div>

            {/* Simulated ERP / WMS Dispatch Payload Accordion */}
            {decision.system_payload && (
              <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-950/40">
                <button
                  type="button"
                  onClick={() => setShowPayload(!showPayload)}
                  className="w-full px-3 py-2 text-left text-[11px] font-mono text-slate-400 hover:text-slate-200 flex items-center justify-between bg-slate-900/60"
                >
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-emerald-400" />
                    Payload Transaccional para ERP / WMS / Core Bancario
                  </span>
                  {showPayload ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
                {showPayload && (
                  <div className="p-3 bg-[#050A18] border-t border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-48">
                    <pre>{JSON.stringify(decision.system_payload, null, 2)}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botón de Acción Final */}
      {!isLoading && decision && (
        <div className="pt-4 mt-2 border-t border-slate-700">
          <button
            id="btn-approve-and-execute"
            onClick={onApproveAndExecute}
            disabled={isSaving}
            className="w-full py-3.5 px-4 rounded border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-[#050A18] font-bold uppercase tracking-wider text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Guardando en Firebase e Inyectando en ERP...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                <span>✅ Aprobar y Ejecutar en ERP / Guardar en Firebase</span>
              </>
            )}
          </button>
          <p className="text-[10px] text-center text-slate-400 mt-2 font-mono">
            Registra la auditoría en Firestore ('operational_exceptions') y dispara webhooks de despacho ERP.
          </p>
        </div>
      )}
    </div>
  );
};
