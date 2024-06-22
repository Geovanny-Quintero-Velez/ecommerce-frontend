import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { ReactElement } from 'react';


interface Props {
    path: string,
    title: string,
    defaultIcon: ReactElement,
    selectedIcon: ReactElement
  }
  
  function NavbarPrimaryItem({ path, title, defaultIcon, selectedIcon }: Props) {
    const currentPath = usePathname();
  
    return (
        <Link href={path}
        className={`p-3 flex items-center space-x-2 rounded-full text-white
        ${currentPath === path ? '' : 'text-gray-700 hover:text-green-700 hover:bg-white'}`}>
        {currentPath === path ? (
            selectedIcon
        ):(
            defaultIcon
        )}
        </Link>
    );
  }
  
  export default NavbarPrimaryItem;