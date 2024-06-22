'use client'

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";


interface Props {
    path: string,
    title: string
  }
  
  function MobileMenuItem({ path, title }: Props) {
    const currentPath = usePathname();
  
    return (
        <Link href={path}
        className={`block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200
        ${currentPath === path ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>
        
        <span>{title}</span>
    </Link>
    );
  }
  
  export default MobileMenuItem;