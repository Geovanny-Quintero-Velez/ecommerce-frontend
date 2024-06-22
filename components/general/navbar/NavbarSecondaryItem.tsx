import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import { usePathname } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineExitToApp } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";


function NavbarSkeleton() {
    return (
        <div className="hidden md:flex items-center space-x-1">
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
            <div className="flex space-x-2">
                <div className="w-20 h-8 bg-gray-300 animate-pulse rounded"></div>
                <div className="w-24 h-8 bg-gray-300 animate-pulse rounded"></div>
            </div>
        </div>
    );
}

function NavbarSecondaryItem() {
    
    const loading = false;
    const userContext = null;
    /*
    if (!userContext) {
        return <div>Error loading user</div>
    }*/
    
    const currentPath = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    //const { handleLogout: logout } = UseLogout();
    /*const { currentUser }  = userContext;

    useEffect(() => {
        if (!loading && !currentUser) {
            setMenuOpen(false);
        }
    }, [loading, currentUser]);

    if (loading) {
        return <NavbarSkeleton />;
    }
*/
    const handleLogout = async () => {
        //logout();
        setMenuOpen(false);
        if (currentPath === "/"){
            window.location.reload();
        }else{
            router.push("/");
        }
    };

    return (
        <div className="hidden md:flex items-center space-x-1">
            {/*currentUser*/ false ? (
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center"
                    >
                        {/* currentUser.username? currentUser.username.charAt(0).toUpperCase(): "P" */}
                        P
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg py-2 z-50">
                            <Link
                                href="/profile"
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                            >
                                <FaRegUser className="mr-5"/>
                                Profile
                            </Link>
                            <Link
                                href="/settings"
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                            >
                                <IoSettingsOutline className="mr-5"/>
                                Settings
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 textDelete hover:bg-gray-100 flex items-center"
                            >
                                <MdOutlineExitToApp className="mr-5"/>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <Link href="/users/login" className="py-2 px-2 bg-white textSecondary rounded border border-white hover:bg-gray-100 text-sm font-bold shadow-xl">Login</Link>
                    <Link href="/users/register" className="py-2 px-2 text-white rounded border border-white hover:bg-green-600 text-sm font-bold shadow-xl">Register</Link>
                </>
            )}
        </div>
    );
}

export default NavbarSecondaryItem;