const API_BASE = 'http://localhost:8000';

export interface Material {
  id: number;
  matnr: string;
  name: string;
  category: string;
  stock_level: number;
  safety_stock: number;
  lead_time: number;
  supplier: string;
  abc_class: string;
  unit: string;
  tenant_id: string;
}

export async function getMaterials(tenantId: string): Promise<Material[]> {
  const response = await fetch(`${API_BASE}/api/materials/${tenantId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch materials');
  }
  return response.json();
}

export async function healthCheck() {
  const response = await fetch(`${API_BASE}/api/health`);
  return response.json();
}
