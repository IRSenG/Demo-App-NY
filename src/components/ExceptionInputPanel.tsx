import React from 'react';
import { 
  AlertTriangle, 
  Flame, 
  ShieldAlert, 
  Zap, 
  RotateCcw, 
  Layers, 
  Loader2,
  FileText,
  Radio
} from 'lucide-react';
import { PriorityLevel } from '../types';

interface ExceptionInputPanelProps {
  scenarioText: string;
  onChangeScenarioText: (val: string) => void;
  priority: PriorityLevel;
  onChangePriority: (p: PriorityLevel) => void;
  industry: string;
  onChangeIndustry: (ind: string) => void;
  isLoading: boolean;
  onOrchestrate: () => void;
  onReset: () => void;
  loadingStepText: string;
}

export const ExceptionInputPanel: React.FC<ExceptionInputPanelProps> = ({
  scenarioText,
  onChangeScenarioText,
  priority,
  onChangePriority,
  industry,
  onChangeIndustry,
  isLoading,
  onOrchestrate,
  onReset,
  loadingStepText
}) => {
  const priorities: { label: PriorityLevel; color: string; desc: string; icon: React.ReactNode }[] = [
    {
      label: 'Normal',
      color: 'border-slate-700 text-slate-400 bg-slate-800/80 peer-checked:border-sky-400 peer-checked:bg-sky-950/70 peer-checked:text-sky-200 peer-checked:shadow-[0_0_12px_rgba(56,189,248,0.25)]',
      desc: 'Ventana operativa estándar (> 12h)',
      icon: <Layers className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      label: 'Urgencia Alta',
      color: 'border-slate-700 text-slate-400 bg-slate-800/80 peer-checked:border-emerald-400 peer-checked:bg-emerald-600 peer-checked:text-white peer-checked:shadow-[0_0_15px_rgba(16,185,129,0.35)]',
      desc: 'Impacto en SLA inminente (< 4h)',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
    },
    {
      label: 'Crítica / Cliente VIP',
      color: 'border-slate-700 text-slate-400 bg-slate-800/80 peer-checked:border-rose-400 peer-checked:bg-rose-950/80 peer-checked:text-rose-200 peer-checked:shadow-[0_0_12px_rgba(244,63,94,0.25)]',
      desc: 'Riesgo contractual o vital inmediato',
      icon: <Flame className="w-3.5 h-3.5 text-rose-400" />
    }
  ];

  return (
    <div id="panel-input-exception" className="bg-slate-900/50 border border-slate-700 rounded-xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Subtle background radar/grid ornament */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div>
        {/* Panel Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Ingreso de la Excepción Operativa
              </h2>
              <p className="text-[11px] text-slate-400">
                Registro de contingencia en tiempo real para análisis del agente
              </p>
            </div>
          </div>

          {scenarioText && (
            <button
              id="btn-reset-scenario"
              onClick={onReset}
              disabled={isLoading}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 px-2 py-1 rounded bg-slate-800 border border-slate-600"
              title="Limpiar formulario"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Limpiar</span>
            </button>
          )}
        </div>

        {/* Industry Custom Field (Optional context) */}
        <div className="mb-4">
          <label htmlFor="industry-input" className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 flex items-center justify-between">
            <span>Sector / Unidad de Negocio</span>
            <span className="text-[10px] text-slate-400 lowercase font-normal">contexto sectorial</span>
          </label>
          <input
            id="industry-input"
            type="text"
            value={industry}
            onChange={(e) => onChangeIndustry(e.target.value)}
            placeholder="Ej. Logística Nacional, Retail Cadena de Frío, Banca Mayorista..."
            className="w-full bg-[#050A18] border border-slate-600 focus:border-emerald-500 focus:outline-none rounded-lg px-3.5 py-2 text-xs text-slate-200 placeholder-slate-400 transition-colors"
          />
        </div>

        {/* Priority Selector */}
        <div className="mb-4">
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 flex items-center justify-between">
            <span>Nivel de Prioridad</span>
            <span className="text-[10px] text-slate-400 lowercase font-normal">clasificación de sla</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {priorities.map((item) => (
              <label
                key={item.label}
                id={`priority-option-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                className="cursor-pointer relative"
              >
                <input
                  type="radio"
                  name="priority-level"
                  value={item.label}
                  checked={priority === item.label}
                  onChange={() => onChangePriority(item.label)}
                  className="peer sr-only"
                />
                <div className={`p-2.5 rounded border transition-all text-left flex flex-col justify-between h-full ${item.color}`}>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-bold uppercase">{item.label}</span>
                    {item.icon}
                  </div>
                  <span className="text-[10px] text-slate-400 line-clamp-1">
                    {item.desc}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Editable Contingency Textarea */}
        <div className="mb-4">
          <label htmlFor="scenario-textarea" className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-400">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              Descripción Detallada de la Contingencia
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {scenarioText.length} caracteres
            </span>
          </label>
          <textarea
            id="scenario-textarea"
            rows={5}
            value={scenarioText}
            onChange={(e) => onChangeScenarioText(e.target.value)}
            placeholder="Describe la contingencia operativa, recursos involucrados, restricciones de tiempo, clientes afectados o ubicación..."
            className="w-full bg-[#050A18] border border-slate-600 focus:border-emerald-500 focus:outline-none rounded-lg p-3 text-sm text-slate-200 placeholder-slate-400 transition-colors leading-relaxed font-sans resize-none"
          />
        </div>
      </div>

      {/* Main Action Orchestrate Button */}
      <div className="pt-2">
        <button
          id="btn-orchestrate-resolution"
          onClick={onOrchestrate}
          disabled={isLoading || !scenarioText.trim()}
          className={`w-full py-4 px-4 rounded font-black text-sm flex items-center justify-center gap-2.5 uppercase tracking-widest shadow-lg transition-all duration-200 ${
            isLoading || !scenarioText.trim()
              ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
              : 'bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-[#050A18] shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              <span className="text-xs sm:text-sm font-semibold text-slate-300 normal-case">
                {loadingStepText || 'Orquestando resolución con Gemini 3.7 Flash...'}
              </span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 fill-[#050A18]" />
              <span>⚡ Orquestar Resolución con Agente</span>
            </>
          )}
        </button>

        {/* Agent Telemetry Live Bar */}
        {isLoading && (
          <div className="mt-3 p-2.5 rounded bg-[#050A18] border border-emerald-900/60 flex items-center gap-2 text-[11px] text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono">{loadingStepText}</span>
          </div>
        )}
      </div>
    </div>
  );
};
