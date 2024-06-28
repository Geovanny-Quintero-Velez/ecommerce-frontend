"use client"
import React from 'react';
import UserProfile from '@/components/users/management/profile/UserProfile';
import { useAuth } from '@/context/UserContext';

const ProfilePage = () => {
  const { currentUser } = useAuth();

  return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            {currentUser ? (
                <UserProfile user={currentUser} />
            ) : (
                <p>No user logged in</p>
            )}
        </div>  
  );
};

export default ProfilePage;