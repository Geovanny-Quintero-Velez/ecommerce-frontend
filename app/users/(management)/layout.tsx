import React from 'react';
import Sidebar from '@/components/users/management/Sidebar';
import Navbar from '@/components/users/management/Navbar';

export default function Layout ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 overflow-y-auto p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};
