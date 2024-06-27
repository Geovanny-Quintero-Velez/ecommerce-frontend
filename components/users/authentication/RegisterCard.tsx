
"use client"
import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import { useAuthentication } from '@/hooks/auth/useAuthentication';

export default function RegisterCard() {
  const { register, loading, error } = useAuthentication();
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    username: '',
    birthdate: new Date(),
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (formData.password !== formData.repeatPassword) {
      alert('Passwords do not match');
      return;
    }
    const { repeatPassword, ...userData } = formData;
    await register(userData);
  };

  return (
    <div className="w-1/2 p-10" style={{ color: 'var(--color-primary)' }}>
      <h2 className="text-2xl font-bold mb-4">Create your account</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="w-full lg:w-1/2">
            <label htmlFor="name" className="ml-4 block font-bold text-sm">Name</label>
            <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded mt-1 text-sm" placeholder="Type your name" onChange={handleChange} />
          </div>
          <div className="w-full lg:w-1/2">
            <label htmlFor="lastname" className="ml-4 block font-bold text-sm">Last name</label>
            <input type="text" id="lastname" className="w-full p-2 border border-gray-300 rounded mt-1 text-sm" placeholder="Type your last name" onChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="w-full lg:w-1/2">
            <label htmlFor="username" className="ml-4 block font-bold text-sm">Username</label>
            <input type="text" id="username" className="w-full p-2 border border-gray-300 rounded mt-1 text-sm" placeholder="Create your username" onChange={handleChange} />
          </div>
          <div className="w-full lg:w-1/2">
            <label htmlFor="birthdate" className="ml-4 block font-bold text-sm">Birthdate</label>
            <input type="date" id="birthdate" className="w-full p-2 border border-gray-300 rounded mt-1 text-sm" placeholder="(MM/DD/YY)" onChange={handleChange} />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="ml-4 block font-bold text-sm">Email</label>
          <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded mt-1 text-sm" placeholder="Enter your email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password" className="ml-4 block font-bold text-sm">Password</label>
          <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded mt-1 text-sm" placeholder="Enter your password" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="repeatPassword" className="ml-4 block font-bold text-sm">Repeat Password</label>
          <input type="password" id="repeatPassword" className="w-full p-2 border border-gray-300 rounded mt-1 text-sm" placeholder="Repeat your password" onChange={handleChange} />
        </div>
        <button type="submit" className="w-full font-bold text-white p-2 rounded mt-4" style={{ background: 'var(--color-secondary)' }} disabled={loading}>
          {loading ? 'Registering...' : 'Register now'}
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm mb-5">You can also register with</p>
        <button className="mt-2 flex items-center justify-center border border-gray-300 p-2 pl-10 pr-10 rounded" style={{ width: 'fit-content', margin: '0 auto' }}>
          <FaGoogle className="text-2xl" />
          <span className="ml-2">Google</span>
        </button>
        <p className="mt-4 text-sm">You already have an account? <Link href="/users/login" className="font-bold">Log in</Link></p>
      </div>
    </div>
  );
}
