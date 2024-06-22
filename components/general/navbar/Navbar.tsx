'use client'

//import { UseLogout } from '@/hooks/auth/useLogout';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useContext, ReactElement } from 'react';
import SearchComponent from "../search/SearchComponent";
import MobileMenuItem from "./MobileMenuItem";
import NavbarPrimaryItem from "./NavbarPrimaryItem";
import NavbarSecondaryItem from "./NavbarSecondaryItem";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { IoHomeOutline, IoHome, IoCart, IoCartOutline, IoHeart, IoHeartOutline } from "react-icons/io5";

//import { UserContext } from '@/context/UserContext';


const navPrimaryItems =  [
  {
    path: '/',
    title: 'Home',
    defaultIcon: <IoHomeOutline className='text-3xl'/>,
    selectedIcon: <IoHome className='text-3xl'/>,
  },
  {
    path: '/cart',
    title: 'Cart Section',
    defaultIcon: <IoCartOutline className='text-3xl'/>,
    selectedIcon: <IoCart className='text-3xl'/>,
  },
  {
    path: '/wishlist',
    title: 'Wish List Section',
    defaultIcon: <IoHeartOutline className='text-3xl'/>,
    selectedIcon: <IoHeart className='text-3xl'/>,
  },
]; 

interface Props{ 
  customSection?: {
    sectionName: string,
    section: ReactElement
  };
}

function Navbar( {customSection}: Props ) {
  //const userContext = useContext(UserContext);
  //const currentUser = userContext?.currentUser;
  //const { handleLogout:logout } = UseLogout();
  const router = useRouter();

  useEffect(() => {
    const btn = document.querySelector('button.mobile-menu-button');
    const menu = document.querySelector('.mobile-menu');

    if(btn && menu){
      const toggleMenu = () => {
        menu.classList.toggle('hidden');
      };

      btn.addEventListener('click', toggleMenu);

      return () => {
        btn.removeEventListener('click', toggleMenu);
      };
    }
  }, []);

  return (
    <nav className="backgroundPrimary shadow-lg">
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div>
              <Link href="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                <div className="flex items-center relative ml-4">
                <div className="rounded-full bg-white p-1">
                  <Image
                    src={logo}
                    alt="Logo de la marca"
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                  />
                </div>
                <h1 className="ml-3 text-xl font-bold text-white">Foody's</h1>
              </div>
              </Link>
            </div>

            {/* Search component */}
            
            <SearchComponent 
            placeholder='Search...'
            redirect='/search'
            show={!(customSection?.sectionName === 'PaymentTimeline')}
            />
          </div>

          {customSection? (
            customSection.section
          ): null}
          
          <div className="flex items-center space-x-4">
            {/* Primary Navbar items */}
          <div className="hidden md:flex items-center space-x-1 ">
              {navPrimaryItems.map(item => (
                <NavbarPrimaryItem key={item.path} {...item} />
              ))}
            </div>
          

          {/* Secondary Navbar items */}
          
          < NavbarSecondaryItem />
          </div>  
          
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
              <svg className="w-6 h-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="mobile-menu hidden md:hidden bg-white">
        {navPrimaryItems.map(item => (
          <MobileMenuItem key={item.path} {...item} />
        ))}
        {/*currentUser*/ true ? (
          <>       
            <Link href="/profile" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200">
              Perfil
            </Link>
            <button
              onClick={() => {
                //logout();
                router.push("/");
              }}
              className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-200"
            >
              Salir
            </button>
          </> 
        ) : (
          <>       
            <Link href="/login" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200">
              Inicia sesión
            </Link>
            <Link href="/register" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200">
              Regístrate
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;