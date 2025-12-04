'use client';

import React, { createContext, useContext, useState } from 'react';
import { User } from '../types/user';
import { AuthContextValue } from '../types/authcontext';

const API = process.env.NEXT_PUBLIC_API_URL;

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth as AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

function useProvideAuth() {
  // Client-side user state is optional, not authoritative
  const [user, setUser] = useState<User | null>(null);

  /* ------------------------------------------
   * LOGIN — backend sets cookies
   * ------------------------------------------ */
  async function login(email: string, password: string) {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Login failed' }));
      throw new Error(err.error || err.message || 'Login failed');
    }

    // optional: load user into client state (for UI only)
    const me = await fetch(`${API}/auth/me`, { credentials: 'include' });
    if (me.ok) {
      const data = await me.json();
      setUser(data);
    }
  }

  /* ------------------------------------------
   * LOGOUT — backend clears cookies
   * ------------------------------------------ */
  async function logout() {
    await fetch(`${API}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
  }

  return {
    user, // UI-level user info (not SSR)
    login,
    logout,
  };
}
