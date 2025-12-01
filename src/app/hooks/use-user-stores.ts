'use client';
import { useEffect, useState } from 'react';

export type StoreType = {
  id: string;
  name: string;
  subdomain?: string | null;
  category?: string | null;
  template?: string | null;
};

export function useUserStores() {
  const [stores, setStores] = useState<StoreType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch('/api/stores', { credentials: 'include' });
        if (!active) return;

        if (!res.ok) {
          setStores([]);
        } else {
          const data = await res.json();
          setStores(data.stores || []);
        }
      } catch {
        if (active) setStores([]);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);
  return { stores, loading };
}
