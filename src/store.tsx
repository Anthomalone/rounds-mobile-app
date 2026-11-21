// App state for the demo: one sample nurse, kept in memory. Reloading the app starts the demo fresh.
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { SEED_CERTS, type Cert } from '@/data/catalog';

type State = { certs: Cert[] };

type Store = State & {
  addCert: (c: Cert) => void;
  updateCert: (id: string, patch: Partial<Cert>) => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [certs, setCerts] = useState<Cert[]>(SEED_CERTS);
  const value = useMemo<Store>(
    () => ({
      certs,
      addCert: (c) => setCerts((prev) => [...prev, c]),
      updateCert: (id, patch) => setCerts((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c))),
    }),
    [certs],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore must be used inside StoreProvider');
  return s;
}
