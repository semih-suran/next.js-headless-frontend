'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
  });
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/session', { cache: 'no-store' });
        const data = await res.json();
        setAuth({ isAuthenticated: data.isLoggedIn, isLoading: false });
      } catch {
        setAuth({ isAuthenticated: false, isLoading: false });
      }
    };
    checkSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch('/api/auth/session', {
      method: 'POST',
      body: JSON.stringify({ action: 'login', email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Login failed');
    }

    setAuth({ isAuthenticated: true, isLoading: false });
    
    router.refresh(); 
  }, [router]);

  const logout = useCallback(async () => {
    await fetch('/api/auth/session', {
      method: 'POST',
      body: JSON.stringify({ action: 'logout' }),
    });

    setAuth({ isAuthenticated: false, isLoading: false });
    router.refresh();
    router.push('/');
  }, [router]);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}