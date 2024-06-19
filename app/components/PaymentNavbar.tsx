"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaUser, FaCheck } from 'react-icons/fa';

import heartIcon from "../../public/favorito.png";
import searchIcon from "../../public/lupa.png";
import cartIcon from "../../public/carrito.png";
import userIcon from "../../public/usuario.png";
import logo from "../../public/logo.png";
import menuIcon from "../../public/menu.png";

interface PaymentNavbarProps {
  currentStep: number;
}

const PaymentNavbar: React.FC<PaymentNavbarProps> = ({ currentStep }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [cartMenuOpen, setCartMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
    if (cartMenuOpen) {
      setCartMenuOpen(false);
    }
  };

  const toggleCartMenu = () => {
    setCartMenuOpen(!cartMenuOpen);
    if (profileMenuOpen) {
      setProfileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-green-800 p-4 flex items-center justify-between text-white">
      <div className="flex items-center">
        <button
          type="button"
          className="sm:hidden relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="absolute -inset-0.5">
            <Image src={menuIcon} alt="Mobile menu icon" className="h-5 w-5" />
          </span>
          <span className="sr-only">Open main menu</span>
        </button>
        <div className="flex items-center relative ml-4">
          <div className="rounded-full bg-white p-1">
            <Image src={logo} alt="Logo de la marca" className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
          </div>
          <h1 className="ml-3 text-xl font-bold text-white">Foody's</h1>
        </div>
        <div className="hidden sm:flex items-center ml-6 flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md bg-gray-200 text-gray-800 px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Image src={searchIcon} className="h-5 w-5 text-gray-400" alt="Search icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-8">
        <TimeLineStep step={1} currentStep={currentStep} label="Cart" />
        <TimeLineStep step={2} currentStep={currentStep} label="Payment" />
        <TimeLineStep step={3} currentStep={currentStep} label="Follow your product" />
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="button"
          className="relative rounded-full bg-transparent p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="sr-only">Wish list</span>
          <Image src={heartIcon} className="h-6 w-6" alt="Wish list icon" />
        </button>
        <div className="relative">
          <button
            type="button"
            className="relative flex rounded-full bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="cart-menu-button"
            aria-expanded={cartMenuOpen}
            aria-haspopup="true"
            onClick={toggleCartMenu}
          >
            <span className="sr-only">View cart</span>
            <Image src={cartIcon} className="h-6 w-6 text-gray-400 hover:text-white" alt="Cart icon" />
          </button>
          {cartMenuOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="cart-menu-button"
              tabIndex={-1}
            >
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                Item 1
              </Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                Item 2
              </Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                Item 3
              </Link>
              <Link href="/cart" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                <button type="button" className="w-full text-left">
                  Go to cart
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            type="button"
            className="relative flex rounded-full bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="user-menu-button"
            aria-expanded={profileMenuOpen}
            aria-haspopup="true"
            onClick={toggleProfileMenu}
          >
            <span className="sr-only">Open user menu</span>
            <Image src={userIcon} className="h-8 w-8 rounded-full" alt="User icon" />
          </button>
          {profileMenuOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex={-1}
            >
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                Your Profile
              </Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                Settings
              </Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                Sign out
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const TimeLineStep: React.FC<{ step: number; currentStep: number; label: string }> = ({ step, currentStep, label }) => {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <div className="flex items-center">
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full ${isActive ? 'bg-white text-green-500' : 'border border-white'} ${
          isCompleted ? 'bg-green-500 text-white' : ''
        }`}
      >
        {isCompleted ? <FaCheck /> : step}
      </div>
      <div className={`ml-2 ${isActive ? 'text-white' : 'text-gray-200'}`}>{label}</div>
      {step < 3 && <div className="mx-2 h-px w-16 bg-white" />}
    </div>
  );
};

export default PaymentNavbar;
