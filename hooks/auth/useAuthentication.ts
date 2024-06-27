"use client";
import { useState } from 'react';
import { User } from '@/interfaces/user/user';
import { LoginResponse } from '@/interfaces/user/login-response';
import { AuthService } from '@/services/auth/auth.service';
import { CreateUser } from '@/interfaces/user/create-user';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export const useAuthentication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authService = new AuthService();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await authService.login(email, password);
      if (user && user.token) {
        Cookies.set('currentUser', JSON.stringify(user));
        localStorage.setItem('token', user.token);
        router.push('/');
      }
      return user as LoginResponse;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const register = async (user: CreateUser) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await authService.register(user);
      if (newUser) {
        router.push('/users/login');
      }
      return newUser as User;
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('currentUser');
    localStorage.removeItem('token');
  };

  return { login, register, logout, loading, error };
};
