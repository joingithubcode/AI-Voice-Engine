// 'use client';

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { apiClient } from '../lib/api-client';
// import { useRouter } from 'next/navigation';

// interface User {
//   id: number;
//   email: string;
//   full_name: string;
//   role: 'user' | 'admin';
//   is_active: boolean;
//   is_email_verified: boolean;
//   characters_used: number;
//   characters_limit: number;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (email: string, password: string, full_name: string) => Promise<void>;
//   logout: () => void;
//   verifyEmail: (token: string) => Promise<void>;
//   resendVerification: (email: string) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const storedUser = Cookies.get('user');
//     const token = Cookies.get('access_token');
//     if (storedUser && token) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (e) {
//         Cookies.remove('user');
//         Cookies.remove('access_token');
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     const formData = new FormData();
//     formData.append('username', email);
//     formData.append('password', password);

//     try {
//       console.log('🔐 Attempting login...');

//       // ✅ Correct path: /api/v1/auth/login (proxy se forward hoga)
//       const response = await apiClient.post('/auth/login', formData, {
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       });

//       console.log('✅ Response Data:', response.data);

//       const { access_token, user } = response.data;

//       if (!access_token) {
//         throw new Error('No access token received');
//       }

//       Cookies.set('access_token', access_token, { expires: 7, path: '/' });
//       Cookies.set('user', JSON.stringify(user), { expires: 7, path: '/' });
//       setUser(user);

//       // ✅ Redirect using window.location (guaranteed)
//       if (user.role === 'admin') {
//         window.location.href = '/admin';
//       } else {
//         window.location.href = '/user';
//       }
//     } catch (error: any) {
//       console.error('❌ Login Error:', error);
//       throw error;
//     }
//   };

//   const register = async (email: string, password: string, full_name: string) => {
//     try {
//       const response = await apiClient.post('/auth/register', { email, password, full_name });
//       console.log('✅ Register Response:', response.data);
//       router.push('/login?registered=true');
//     } catch (error: any) {
//       console.error('❌ Register Error:', error);
//       throw error;
//     }
//   };

//   const verifyEmail = async (token: string) => {
//     await apiClient.post('/auth/verify-email', { token });
//   };

//   const resendVerification = async (email: string) => {
//     await apiClient.post('/auth/resend-verification', { email });
//   };

//   const logout = () => {
//     Cookies.remove('access_token');
//     Cookies.remove('user');
//     setUser(null);
//     router.push('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, register, logout, verifyEmail, resendVerification }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { apiClient } from '../lib/api-client';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'user' | 'admin';
  is_active: boolean;
  is_email_verified: boolean;
  characters_used: number;
  characters_limit: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, full_name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = Cookies.get('user');
    const token = Cookies.get('access_token');
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        Cookies.remove('user');
        Cookies.remove('access_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    try {
      const response = await apiClient.post('/v1/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const { access_token, user } = response.data;
      Cookies.set('access_token', access_token, { expires: 7, path: '/' });
      Cookies.set('user', JSON.stringify(user), { expires: 7, path: '/' });
      setUser(user);

      if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/user');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, full_name: string) => {
    try {
      await apiClient.post('/v1/auth/register', { email, password, full_name });
      router.push('/login?registered=true');
    } catch (error: any) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('access_token', { path: '/' });
    Cookies.remove('user', { path: '/' });
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};