import React, { createContext, useState, useContext } from 'react';
import { TENANTS } from '../constants';
import { Tenant } from '../types';

interface TenantContextType {
  selectedTenant: Tenant;
  setSelectedTenant: (tenant: Tenant) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [selectedTenant, setSelectedTenant] = useState<Tenant>(TENANTS[0]);

  return (
    <TenantContext.Provider value={{ selectedTenant, setSelectedTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within TenantProvider');
  }
  return context;
}
