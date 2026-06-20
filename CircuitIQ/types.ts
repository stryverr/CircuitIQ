
export enum AgentType {
  PROCUREMENT = 'Procurement (SAP MM)',
  INVENTORY = 'Inventory (S/4HANA)',
  SUPPLIER_RISK = 'Supplier Risk',
  COMPLIANCE = 'Compliance',
  FORECASTING = 'Forecasting',
  REPORTING = 'Reporting'
}

export interface AgentConfig {
  id: string;
  name: AgentType;
  description: string;
  icon: string;
  systemInstruction: string;
}

export interface SAPMaterial {
  id: string;
  name: string;
  category: string;
  stockLevel: number;
  safetyStock: number;
  leadTime: number; // in days
  supplier: string;
  abcClass: 'A' | 'B' | 'C';
  unit: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  agentId: string;
}

export interface Tenant {
  id: string;
  name: string;
  region: string;
}

export interface VectorDB {
  name: string;
  type: 'local' | 'cloud' | 'sql' | 'file';
  status: 'active' | 'syncing' | 'error';
  latency: number;
}

export interface ParallelTask {
  id: string;
  name: string;
  progress: number;
  status: 'pending' | 'running' | 'completed';
}

export interface SystemMetric {
  name: string;
  value: string | number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}
