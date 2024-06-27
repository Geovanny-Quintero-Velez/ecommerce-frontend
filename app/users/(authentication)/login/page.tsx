"use client";
import React from 'react';
import LoginCard from '@/components/users/authentication/LoginCard';
import { useAuth } from '@/context/UserContext';
import { useAuthentication } from "@/hooks/auth/useAuthentication";
import { useFetchUsers } from "@/hooks/user/useFetchUsers";

export default function LoginPage() {
  const { login: saveCurrentUser } = useAuth();
  const { login, loading, error } = useAuthentication();
  const { fetchUserById } = useFetchUsers();
  
  return (
   <LoginCard login={login} fetchUserById={fetchUserById} saveCurrentUser={saveCurrentUser} loading={loading} error={error}/>
  );
}
