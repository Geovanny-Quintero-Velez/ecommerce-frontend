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
      <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="Profile Picture" className="w-24 h-24 rounded-full mb-4"/>
      <h2 className="text-2xl font-semibold mb-2">{user.name} {user.lastname}</h2>
      <p className="text-gray-600 mb-4">{user.email}</p>
      <button className="w-full backgroundSecondary font-bold text-white py-2 rounded mb-4">
        Edit profile
      </button>
    </div>
  );
};