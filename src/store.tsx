// App state for the demo: one sample nurse, kept in memory. Reloading the app starts the demo fresh.
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { courseById, PROVIDERS, SEED_CERTS, type Cert } from '@/data/catalog';

export type Progress = { sections: number[]; passed: boolean };

type Store = {
  certs: Cert[];
  progress: Record<string, Progress>;
  addCert: (c: Cert) => void;
  // Only the CE Broker reporting status changes after a certificate is saved.
  markReported: (id: string) => void;
  markSection: (courseId: string, index: number) => void;
  markPassed: (courseId: string) => void;
  /** Issue the Rounds certificate for a passed course (after the evaluation). */
  completeCourse: (courseId: string) => void;
};

const Ctx = createContext<Store | null>(null);

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [certs, setCerts] = useState<Cert[]>(SEED_CERTS);
  const [progress, setProgress] = useState<Record<string, Progress>>({});

  const value = useMemo<Store>(() => {
    const addCert = (c: Cert) =>
      // Same id, or the same Rounds course twice, never counts twice.
      setCerts((prev) => (prev.some((x) => x.id === c.id || (!!c.course && x.course === c.course)) ? prev : [...prev, c]));
    const patch = (courseId: string, f: (p: Progress) => Progress) =>
      setProgress((prev) => ({ ...prev, [courseId]: f(prev[courseId] ?? { sections: [], passed: false }) }));
    return {
      certs,
      progress,
      addCert,
      markReported: (id) => setCerts((prev) => prev.map((c) => (c.id === id ? { ...c, reported: true } : c))),
      markSection: (courseId, index) => patch(courseId, (p) => (p.sections.includes(index) ? p : { ...p, sections: [...p.sections, index] })),
      markPassed: (courseId) => patch(courseId, (p) => ({ ...p, passed: true })),
      completeCourse: (courseId) => {
        const c = courseById(courseId);
        if (!c || !c.prov || c.kind !== 'module') return;
        addCert({ id: 'p-' + courseId, course: courseId, title: c.title, hours: c.hours, prov: PROVIDERS[c.prov].name, date: todayIso(), fl: c.fl, ca: c.ca, src: 'platform', reported: false });
      },
    };
  }, [certs, progress]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore must be used inside StoreProvider');
  return s;
}
