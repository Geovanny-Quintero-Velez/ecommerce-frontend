import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import logo from "@/public/logo.png";


interface Props {
    user: {
        name: string;
        lastname: string;
        email: string;
        
    };
}
export default function Navbar ({user} : Props ) {
    return (
        <div className="w-full h-16 backgroundPrimary text-white flex items-center px-4">
            <div>
              <Link href="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                <div className="flex items-center relative ml-4">
                <div className="rounded-full bg-white p-1">
                  <Image
                    src={logo}
                    alt="Logo de la marca"
                    className="min-w-10 min-h-10 h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                  />
                </div>
                <h1 className="ml-3 text-xl font-bold text-white">Foody s</h1>
              </div>
              </Link>
            </div>
            <div className="flex-grow text-center font-semibold">
                <span>Manage your account</span>
            </div>
            <div className="flex-shrink-0">
                <span>{user.email}</span>
            </div>
        </div>
    );
};

