export type PriorityLevel = 'Normal' | 'Urgencia Alta' | 'Crítica / Cliente VIP';

export interface IndustryPreset {
  id: string;
  name: string;
  badge: string;
  icon: string;
  defaultPriority: PriorityLevel;
  scenario: string;
}

export interface OperationalDecisionResponse {
  sla_feasibility: number;
  estimated_cost: string;
  risk_status: string;
  action_steps: string[];
  executive_rationale: string;
  system_payload: Record<string, unknown>;
}

export interface OperationalExceptionRecord {
  id?: string;
  industry: string;
  priority: PriorityLevel;
  scenario: string;
  sla_feasibility: number;
  estimated_cost: string;
  risk_status: string;
  action_steps: string[];
  executive_rationale: string;
  system_payload: Record<string, unknown>;
  status: string;
  dispatchedAt: string;
  approver: string;
  erpAuthCode?: string;
}
