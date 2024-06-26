"use client";
import React from 'react';
import LoginCard from '@/components/users/authentication/LoginCard';
import { useAuth } from '@/context/UserContext';
import { useAuthentication } from "@/hooks/user/useAuthentication";

export default function LoginPage() {
  const { login: saveCurrentUser } = useAuth();
  const { login } = useAuthentication();
  
  return (
   <LoginCard login={login} saveCurrentUser={saveCurrentUser}/>
  );
}
