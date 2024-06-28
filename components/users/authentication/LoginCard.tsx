"use client";
import React, { useState } from "react";
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { LoginResponse } from '@/interfaces/user/login-response';
import { User } from '@/interfaces/user/user';

interface Props {
  login: (email: string, password: string) => Promise<LoginResponse | null>;
  saveCurrentUser: (user: User) => void;
  fetchUserById: (userId: string) => Promise<User | null>;
  loading: boolean;
  error: string | null;
}

export default function LoginCard({ login, saveCurrentUser, fetchUserById, loading, error }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("¡Todos los campos deben tener un valor!");
      return;
    }

    try {
      const loginResponse = await login(email, password);
      if (loginResponse !== null) {
        const user = await fetchUserById(loginResponse.payload.userid);
        if (user !== null) {
          saveCurrentUser(user);
        }
        router.push("/");
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="w-1/2 p-10" style={{ color: 'var(--color-primary)' }}>
      <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email" className="block ml-4 font-bold text-sm">Email</label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            className="backgroundBackground w-full p-2 rounded mt-1 text-sm" 
            placeholder="Enter your email" 
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block ml-4 font-bold text-sm">Password</label>
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            className="backgroundBackground w-full p-2 rounded mt-1 text-sm" 
            placeholder="Enter your password" 
            required
          />
          <a href="#" className="text-sm float-right mt-1">Forgot your password?</a>
        </div>
        <button 
          type="submit"
          className="w-full font-bold text-white p-2 rounded mt-4" 
          style={{ background: 'var(--color-secondary)' }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="mt-4 text-sm">You don t have an account yet? <Link href="/users/register" className="font-bold">Register now</Link></p>
      </div>
    </div>
  );
}
