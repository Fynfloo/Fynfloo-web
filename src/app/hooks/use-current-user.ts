'use client';

import { useEffect, useState } from 'react';
import { set } from 'zod';

export type CurrentUser = {
  id: string;
  email: string;
  tenants: { tenantId: string; role: string }[];
  platformRoles: string[];
};

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!active) return;

        if (!res.ok) {
          setUser(null);
        } else {
          const data = await res.json();
          setUser(data);
        }
      } catch {
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);
  return { user, loading };
}
