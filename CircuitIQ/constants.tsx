
import { AgentConfig, AgentType, SAPMaterial, Tenant } from './types';

export const AGENTS: AgentConfig[] = [
  {
    id: 'procurement-agent',
    name: AgentType.PROCUREMENT,
    description: 'Expert in SAP MM (EKKO, EKPO, MARA) and vendor evaluation.',
    icon: '📦',
    systemInstruction: `You are the SemiChain Procurement Agent. You have deep expertise in SAP MM and S/4HANA Procurement models. 
    You help analyze Purchase Orders (PO), Vendor performance, and Sourcing strategies for semiconductor components. 
    Always refer to SAP tables like EKKO (Header) and EKPO (Item) when discussing procurement data.`
  },
  {
    id: 'inventory-agent',
    name: AgentType.INVENTORY,
    description: 'Specializes in ABC/XYZ classification and safety stock optimization.',
    icon: '📊',
    systemInstruction: `You are the SemiChain Inventory Agent. You focus on inventory health, stock-out prevention, and carrying cost optimization. 
    You use ABC/XYZ analysis and safety stock formulas. You are an expert in S/4HANA material master (MARA) and storage location data (MARD).`
  },
  {
    id: 'risk-agent',
    name: AgentType.SUPPLIER_RISK,
    description: 'Monitors geopolitical risks and financial health of suppliers.',
    icon: '⚠️',
    systemInstruction: `You are the SemiChain Supplier Risk Agent. You monitor geopolitical shifts, natural disaster impact on Fabs (Foundries), 
    and supplier financial stability. You provide mitigation strategies for supply chain disruptions in the semiconductor industry.`
  },
  {
    id: 'compliance-agent',
    name: AgentType.COMPLIANCE,
    description: 'Ensures ITAR/EAR export controls and conflict minerals compliance.',
    icon: '⚖️',
    systemInstruction: `You are the SemiChain Compliance Agent. You track EAR/ITAR export controls, 
    Conflict Minerals (3TG) reporting, and environmental regulations (RoHS, REACH) specifically for semiconductor manufacturing.`
  }
];

export const TENANTS: Tenant[] = [
  { id: 'global-semi-01', name: 'GlobalSemi Manufacturing', region: 'NA-East' },
  { id: 'litho-tech-solutions', name: 'LithoTech Solutions', region: 'EU-West' },
  { id: 'nano-foundry-ops', name: 'NanoFoundry Operations', region: 'APAC-South' }
];

export const MOCK_SAP_DATA: SAPMaterial[] = [
  { id: 'MAT-7701', name: 'ASML NXE:3400C Mask', category: 'Lithography', stockLevel: 4, safetyStock: 2, leadTime: 180, supplier: 'ASML', abcClass: 'A', unit: 'Units' },
  { id: 'MAT-1205', name: 'EUV Photoresist (Type-B)', category: 'Chemicals', stockLevel: 850, safetyStock: 200, leadTime: 30, supplier: 'JSR Corp', abcClass: 'A', unit: 'Liters' },
  { id: 'MAT-9920', name: 'Silicon Wafer 300mm', category: 'Substrate', stockLevel: 5400, safetyStock: 1000, leadTime: 45, supplier: 'Sumco', abcClass: 'B', unit: 'Wafers' },
  { id: 'MAT-4412', name: 'Palladium Sputtering Target', category: 'Metals', stockLevel: 12, safetyStock: 5, leadTime: 90, supplier: 'Heraeus', abcClass: 'A', unit: 'Kg' },
  { id: 'MAT-3301', name: 'HBM3 Memory Die (8GB)', category: 'Component', stockLevel: 12000, safetyStock: 3000, leadTime: 60, supplier: 'SK Hynix', abcClass: 'A', unit: 'Die' }
];

export const SYSTEM_NODES = [
  { id: 'worker-01', cpu: 45, mem: 62, status: 'Healthy', podCount: 12 },
  { id: 'worker-02', cpu: 88, mem: 75, status: 'Busy', podCount: 24 },
  { id: 'worker-03', cpu: 12, mem: 30, status: 'Healthy', podCount: 4 },
  { id: 'worker-04', cpu: 55, mem: 58, status: 'Healthy', podCount: 15 },
  { id: 'vector-01', cpu: 92, mem: 94, status: 'Optimization', podCount: 8 },
  { id: 'gpu-node-01', cpu: 22, mem: 40, status: 'Active', podCount: 2 },
];
