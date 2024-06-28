"use client"
import React from 'react';
import Sidebar from '@/components/users/management/Sidebar';
import Navbar from '@/components/users/management/Navbar';
import { useAuth } from '@/context/UserContext';
import { useState, useEffect } from 'react';

export default function Layout ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){

    const { currentUser } = useAuth();
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
        setIsClient(true)
    }, [])

    return isClient? (
        <div className="flex flex-col h-screen">
            {
                currentUser? (
                    <>
                        <Navbar user = {currentUser}/>
                        <div className="flex flex-1 overflow-hidden">
                            <Sidebar />
                            <div className="flex-1 overflow-y-auto p-4">
                                {children}
                            </div>
                        </div>
                    </>
                ):
                (
                    null
                )
            }
            
        </div>
    ): null;
};
