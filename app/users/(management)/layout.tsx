import React from 'react';
import Sidebar from '@/components/users/management/Sidebar';

export default function Layout ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  );
};

