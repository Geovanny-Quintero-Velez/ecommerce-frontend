"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import user from "@/public/usuario.png";

export default function NavbarAdmin() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setProfileMenuOpen(false);

    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="admin-nav flex justify-between items-center h-28 px-16 bg-white">
      <h1 className="admin-title text-2xl font-bold">Dashboard</h1>
      <button
        className="user-btn relative"
        aria-expanded={profileMenuOpen}
        aria-haspopup="true"
        onClick={toggleProfileMenu}
      >
        <div className="rounded-full bg-background w-16 h-16 flex justify-center items-center hover:bg-white-selected">
          <Image src={user} alt="Brand logo" className="w-10 h-10 invert" />
        </div>
      </button>
      {profileMenuOpen && (
        <div
          className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-white-selected" role="menuitem">
            Your Profile
          </Link>
          <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-white-selected" role="menuitem">
            Settings
          </Link>
          <Link href="/users/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-white-selected" role="menuitem">
            Sign out
          </Link>
        </div>
      )}
    </nav>
  );
}
