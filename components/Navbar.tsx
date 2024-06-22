"use client";

// Importa los módulos necesarios
import Image from "next/image";
import Link from "next/link"; // Importa Link desde Next.js
import { useState } from "react";

// Importa tus imágenes para los íconos aquí
import heartIcon from "../public/favorito.png";
import searchIcon from "../public/lupa.png";
import cartIcon from "../public/carrito.png";
import userIcon from "../public/usuario.png";
import logo from "../public/logo.png"; // Nueva imagen para el logo de la marca
import menuIcon from "../public/menu.png"; // Nueva imagen para el ícono del menú móvil

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [cartMenuOpen, setCartMenuOpen] = useState(false);

  // Función para manejar la apertura del menú de usuario
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
    // Asegúrate de que cuando se abra el menú de usuario, el de carrito se cierre
    if (cartMenuOpen) {
      setCartMenuOpen(false);
    }
  };

  // Función para manejar la apertura del menú de carrito
  const toggleCartMenu = () => {
    setCartMenuOpen(!cartMenuOpen);
    // Asegúrate de que cuando se abra el menú de carrito, el de usuario se cierre
    if (profileMenuOpen) {
      setProfileMenuOpen(false);
    }
  };

  return (
    <nav style={{ background: "var(--color-primary)" }}>
      <div className="max-w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-around">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-white  focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="absolute -inset-0.5">
                <Image
                  src={menuIcon}
                  alt="Mobile menu icon"
                  className="h-5 w-5"
                />
              </span>
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start flex-1">
            {/* Logo de la marca con círculo blanco de fondo */}
            <div className="flex items-center relative">
              <div className="rounded-full bg-white p-1">
                <Image
                  src={logo}
                  alt="Logo de la marca"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                />
              </div>
              <h1 className="ml-3 text-xl font-bold text-white">Fooddy's</h1>
            </div>
            {/* Espacio adicional para ajustar la posición de los elementos */}
            <div className="ml-6 hidden sm:flex items-center flex-grow">
              <div className="relative ml-5 w-8/12">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full rounded-full bg-gray-200 text-gray-800 px-5 py-2 pl-10 focus:outline-none"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Image
                    src={searchIcon}
                    className="h-5 w-5 text-gray-400"
                    alt="Search icon"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-transparent p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">Wish list</span>
              <Image src={heartIcon} className="h-6 w-6" alt="Wish list icon" />
            </button>

            {/* Cart dropdown */}
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-transparent text-sm focus:outline-none"
                  id="cart-menu-button"
                  aria-expanded={cartMenuOpen}
                  aria-haspopup="true"
                  onClick={toggleCartMenu}
                >
                  <span className="sr-only">View cart</span>
                  <Image
                    src={cartIcon}
                    className="h-6 w-6"
                    alt="Cart icon"
                  />
                </button>
              </div>
              {cartMenuOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="cart-menu-button"
                  tabIndex={-1}
                >
                  <Link
                    href="#"
                    style={{ color: "var(--color-text-standard)"}}
                    className="block px-4 py-2 text-sm "
                    role="menuitem"
                  >
                    Item 1
                  </Link>
                  <Link
                    href="#"
                    style={{ color: "var(--color-text-standard)"}}
                    className="block px-4 py-2 text-sm "
                    role="menuitem"
                  >
                    Item 2
                  </Link>
                  <Link
                    href="#"
                    style={{ color: "var(--color-text-standard)"}}
                    className="block px-4 py-2 text-sm"
                    role="menuitem"
                  >
                    Item 3
                  </Link>
                  <Link
                    href="/cart"
                    style={{ color: "var(--color-text-standard)"}}
                    className="block px-4 py-2 text-sm"
                    role="menuitem"
                  >
                    <button type="button" className="w-full text-left">
                      Go to cart
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-transparent text-sm focus:outline-none"
                  id="user-menu-button"
                  aria-expanded={profileMenuOpen}
                  aria-haspopup="true"
                  onClick={toggleProfileMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    src={userIcon}
                    className="h-8 w-8 rounded-full"
                    alt="User icon"
                  />
                </button>
              </div>
              {profileMenuOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 bg-withe origin-top-right bg-white rounded-md py-1 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <Link
                    href="#"
                    style={{ color: "var(--color-text-standard)"}}
                    className="block px-4 py-2 text-sm "
                    role="menuitem"
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="#"
                    style={{ color: "var(--color-text-standard)"}}
                    className="block px-4 py-2 text-sm "
                    role="menuitem"
                  >
                    Settings
                  </Link>
                  <Link
                    href="#"
                    style={{ color: "var(--color-text-standard)"}}
                    className="block px-4 py-2 text-sm "
                    role="menuitem"
                  >
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {menuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <div className="mt-3 relative">
              <input
                type="text"
                placeholder="Search"
                style={{
                  color: "var(--color-text-standard)",
                  background: "var(--color-background)",
                }}
                className="w-full rounded-full py-2 pl-10 focus:outline-none "
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={searchIcon} className="h-5 w-5" alt="Search icon" />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
