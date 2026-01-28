'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  name?: string;
  isVip?: boolean;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      if (!isSupabaseConfigured() || !supabase) {
        // Demo mode - check localStorage
        const demoUser = localStorage.getItem('demo_user');
        if (demoUser) {
          setUser(JSON.parse(demoUser));
        }
        setLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || session.user.user_metadata?.full_name,
            isVip: session.user.user_metadata?.is_vip || false,
            avatar: session.user.user_metadata?.avatar_url,
          });
        }
      } catch (err) {
        console.error('Session check error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    if (isSupabaseConfigured() && supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.name || session.user.user_metadata?.full_name,
              isVip: session.user.user_metadata?.is_vip || false,
              avatar: session.user.user_metadata?.avatar_url,
            });
          } else {
            setUser(null);
          }
          setLoading(false);
        }
      );

      return () => subscription.unsubscribe();
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    setLoading(true);

    try {
      if (!isSupabaseConfigured() || !supabase) {
        // Demo mode
        if (email && password.length >= 6) {
          const demoUser = {
            id: 'demo-' + Date.now(),
            email,
            name: email.split('@')[0],
            isVip: false,
          };
          localStorage.setItem('demo_user', JSON.stringify(demoUser));
          setUser(demoUser);
          setLoading(false);
          return true;
        } else {
          setError('Email và mật khẩu không hợp lệ');
          setLoading(false);
          return false;
        }
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message === 'Invalid login credentials' 
          ? 'Email hoặc mật khẩu không đúng' 
          : authError.message);
        setLoading(false);
        return false;
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name || data.user.user_metadata?.full_name,
          isVip: data.user.user_metadata?.is_vip || false,
          avatar: data.user.user_metadata?.avatar_url,
        });
      }

      setLoading(false);
      return true;
    } catch (err) {
      setError('Đã xảy ra lỗi khi đăng nhập');
      setLoading(false);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setError(null);
    setLoading(true);

    try {
      if (!isSupabaseConfigured() || !supabase) {
        // Demo mode
        if (email && password.length >= 6 && name) {
          const demoUser = {
            id: 'demo-' + Date.now(),
            email,
            name,
            isVip: false,
          };
          localStorage.setItem('demo_user', JSON.stringify(demoUser));
          setUser(demoUser);
          setLoading(false);
          return true;
        } else {
          setError('Vui lòng điền đầy đủ thông tin');
          setLoading(false);
          return false;
        }
      }

      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            is_vip: false,
          },
        },
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          setError('Email đã được đăng ký');
        } else {
          setError(authError.message);
        }
        setLoading(false);
        return false;
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          name,
          isVip: false,
        });
      }

      setLoading(false);
      return true;
    } catch (err) {
      setError('Đã xảy ra lỗi khi đăng ký');
      setLoading(false);
      return false;
    }
  };

  const loginWithGoogle = async () => {
    setError(null);
    
    if (!isSupabaseConfigured() || !supabase) {
      setError('Cấu hình Supabase chưa được thiết lập');
      return;
    }

    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (authError) {
        setError(authError.message);
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi đăng nhập với Google');
    }
  };

  const logout = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      localStorage.removeItem('demo_user');
      setUser(null);
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      register,
      loginWithGoogle,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
