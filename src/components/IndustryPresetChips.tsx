import React from 'react';
import { Truck, Building2, CreditCard, HeartPulse, Sparkles } from 'lucide-react';
import { IndustryPreset, PriorityLevel } from '../types';

export const PRESET_SCENARIOS: IndustryPreset[] = [
  {
    id: 'logistica-transporte',
    name: 'Logística & Transporte',
    badge: 'Senda / Estrella Blanca / CICE',
    icon: 'Truck',
    defaultPriority: 'Crítica / Cliente VIP',
    scenario: 'Derrumbe en autopista México-Querétaro. 3 unidades con 120 pasajeros varadas. 45 pasajeros tienen vuelo de conexión en CDMX en 4 horas.'
  },
  {
    id: 'retail-distribucion',
    name: 'Retail & Distribución',
    badge: 'Boxito / Comercial Control / Cremería',
    icon: 'Building2',
    defaultPriority: 'Urgencia Alta',
    scenario: 'Cliente corporativo en Mérida solicita 150 paquetes de material para entrega en 4 horas. Almacén Central solo tiene 90 paquetes; sucursal Cancún tiene 80.'
  },
  {
    id: 'banca-fintech',
    name: 'Banca & Fintech',
    badge: 'Banco Base / Macropay / Draftea / HR Ratings',
    icon: 'CreditCard',
    defaultPriority: 'Crítica / Cliente VIP',
    scenario: 'Solicitud de crédito PyME urgente por $1.8M MXN para compra de inventario. El DTI del cliente es 43% (política máxima es 40%), pero cuenta con colateral del 150% y 7 años sin retrasos.'
  },
  {
    id: 'salud-operaciones',
    name: 'Salud & Operaciones',
    badge: 'Médica Sur / GSI Proan',
    icon: 'HeartPulse',
    defaultPriority: 'Crítica / Cliente VIP',
    scenario: 'Ingreso imprevisto de cirugía cardiovascular de alta prioridad. Quirófano 2 ocupado en mantenimiento preventivo no crítico y equipo de especialistas en cambio de turno.'
  }
];

interface IndustryPresetChipsProps {
  selectedPresetId: string | null;
  onSelectPreset: (preset: IndustryPreset) => void;
}

export const IndustryPresetChips: React.FC<IndustryPresetChipsProps> = ({
  selectedPresetId,
  onSelectPreset
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'Building2':
        return <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'CreditCard':
        return <CreditCard className="w-4 h-4 text-sky-400 shrink-0" />;
      case 'HeartPulse':
        return <HeartPulse className="w-4 h-4 text-rose-400 shrink-0" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />;
    }
  };

  return (
    <section id="preset-scenarios-section" className="mb-6 bg-[#0E1B31] border border-slate-800 rounded-xl p-3.5 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5 px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
            Escenarios Preconfigurados de Contingencia Operativa
          </h2>
        </div>
        <span className="text-[10px] text-slate-400">
          Haz clic para cargar caso real e iniciar orquestación
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {PRESET_SCENARIOS.map((preset) => {
          const isSelected = selectedPresetId === preset.id;
          return (
            <button
              key={preset.id}
              id={`preset-btn-${preset.id}`}
              onClick={() => onSelectPreset(preset)}
              className={`text-left p-2.5 rounded border transition-all duration-200 flex items-center justify-between gap-2 group cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600/20 border-emerald-500/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/40'
                  : 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-600/70 text-slate-200 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className={`p-1.5 rounded ${isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-900/60 text-slate-300'}`}>
                  {getIcon(preset.icon)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold uppercase tracking-tight truncate">
                    {preset.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 truncate font-mono">
                    {preset.badge}
                  </p>
                </div>
              </div>
              {isSelected && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_#10b981]"></span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
