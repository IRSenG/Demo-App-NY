import React, { useEffect, useState } from 'react';
import { 
  Activity, 
  Cpu, 
  Database, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Zap,
  Server
} from 'lucide-react';

interface ExecutiveHeaderProps {
  decisionsTodayCount: number;
}

export const ExecutiveHeader: React.FC<ExecutiveHeaderProps> = ({ decisionsTodayCount }) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeCDMX = now.toLocaleTimeString('es-MX', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Mexico_City'
      });
      setTimeStr(`${timeCDMX} (CST / CDMX)`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header id="executive-header" className="border-b border-slate-700 bg-[#0A1128] sticky top-0 z-40 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-3 h-8 bg-emerald-500 rounded-sm shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.4)]"></div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight uppercase text-slate-100 flex items-center gap-2">
                OpsCommand AI
                <span className="font-light text-slate-400 normal-case hidden sm:inline">
                  | Centro de Decisión y Despacho Operativo
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-bold uppercase tracking-wider">
                  v3.7 Enterprise
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 sm:hidden">
              Centro de Decisión y Despacho Operativo
            </p>
          </div>
        </div>

        {/* Live KPI & Status Badges */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs">
          {/* Gemini Agent Status */}
          <div 
            id="badge-agent-status"
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300">Gemini 3.7 Flash: <strong className="text-emerald-400 font-semibold">Activo</strong></span>
            </div>
          </div>

          {/* ERP Connection Status */}
          <div 
            id="badge-erp-status"
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 border border-slate-600 text-xs text-slate-300"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Conexión ERP/WMS:</span>
            <span className="text-emerald-400 font-bold">Estable</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 text-slate-300 border border-slate-700 font-mono">24ms</span>
          </div>

          {/* Decisions Today Counter */}
          <div 
            id="badge-decisions-count"
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 border border-slate-600 text-xs text-slate-300"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Decisiones Hoy:</span>
            <span className="text-white font-bold font-mono text-sm">{decisionsTodayCount}</span>
          </div>

          {/* Clock */}
          <div 
            id="badge-live-clock"
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800/80 border border-slate-700 text-slate-400 font-mono text-xs"
          >
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{timeStr || 'Sincronizando...'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
