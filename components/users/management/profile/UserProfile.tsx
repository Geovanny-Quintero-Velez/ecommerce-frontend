import React from 'react';
import { User } from '@/interfaces/user/user';

interface Props {
    user: {
        name: string;
        lastname: string;
        email: string;
        
    };
}

export default function UserProfile ({ user }: Props) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
      <img src="/profile-placeholder.png" alt="Profile Picture" className="w-24 h-24 rounded-full mb-4"/>
      <h2 className="text-2xl font-semibold mb-2">{user.name} {user.lastname}</h2>
      <p className="text-gray-600 mb-4">{user.email}</p>
      <button className="px-4 py-2 bg-green-500 text-white rounded">Hacer público el perfil</button>
    </div>
  );
};