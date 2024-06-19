// Login card component
import React from "react";
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginCard() {
  return (
    <div className="w-1/2 p-10" style={{ color: 'var(--color-primary)'}}>
          <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block ml-4 font-bold text-sm">Email</label>
              <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter your email" />
            </div>
            <div>
              <label htmlFor="password" className="block ml-4 font-bold text-sm">Password</label>
              <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter your password" />
              <a href="#" className="text-sm float-right mt-1">Forgot your password?</a>
            </div>
            <button type="submit" className="w-full font-bold text-white p-2 rounded mt-4" style={{ background: 'var(--color-secondary)'}} >Login</button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm mb-5">You can also login with</p>
            <button className="mt-2 flex items-center justify-center border border-gray-300 p-2 pl-10 pr-10 rounded" style={{ width: 'fit-content', margin: '0 auto'}}>
              <FaGoogle className="text-2xl"/>
              <span className="ml-2" >Google</span>
            </button>
            <p className="mt-4 text-sm ">You don't have an account yet? <Link href="/users/register" className=" font-bold" >Register now</Link></p>
          </div>
        </div>
  );
}
