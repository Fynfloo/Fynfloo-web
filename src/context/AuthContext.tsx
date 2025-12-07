'use client';

import React, { createContext, useContext, useState } from 'react';
import { User } from '../types/user';
import { AuthContextValue } from '../types/authcontext';

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
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    const res = await fetch('api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Login failed' }));
      throw new Error(err.error || err.message || 'Login failed');
    }

    const me = await fetch('api/auth/me', { credentials: 'include' });
    if (me.ok) {
      const data = await me.json();
      setUser(data);
    }
  }

  async function logout() {
    await fetch('api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
  }

  return {
    user,
    login,
    logout,
  };
}
