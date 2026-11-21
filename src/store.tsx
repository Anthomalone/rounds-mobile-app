// App state for the demo: one sample nurse, kept in memory. Reloading the app starts the demo fresh.
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { SEED_CERTS, type Cert } from '@/data/catalog';

type State = { certs: Cert[] };

type Store = State & {
  addCert: (c: Cert) => void;
  // Only the CE Broker reporting status changes after a certificate is saved.
  markReported: (id: string) => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [certs, setCerts] = useState<Cert[]>(SEED_CERTS);
  const value = useMemo<Store>(
    () => ({
      certs,
      // Same id, or the same Rounds course twice, never counts twice.
      addCert: (c) => setCerts((prev) => (prev.some((x) => x.id === c.id || (!!c.course && x.course === c.course)) ? prev : [...prev, c])),
      markReported: (id) => setCerts((prev) => prev.map((c) => (c.id === id ? { ...c, reported: true } : c))),
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
