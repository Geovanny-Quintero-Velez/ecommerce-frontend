import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineExitToApp } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { useAuth } from '@/context/UserContext';
import { User } from '@/interfaces/user/user';

function NavbarSkeleton() {
    return (
        <div className="hidden md:flex items-center space-x-1">
            <div className="flex space-x-2">
                <div className="w-20 h-8 bg-gray-300 animate-pulse rounded"></div>
                <div className="w-24 h-8 bg-gray-300 animate-pulse rounded"></div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
        </div>
    );
}

interface Props {
    currentUser: User | null;
    logout: () => void;
}

function NavbarSecondaryItem({currentUser, logout} : Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const currentPath = usePathname();
    const [isClient, setIsClient] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setIsClient(true);
        if (currentUser) {
            setUser(currentUser);
        }
    }, [currentUser]);

    const handleLogout = async () => {
        logout();
        setMenuOpen(false);
        if (currentPath === "/") {
            window.location.reload();
        } else {
            router.push("/");
        }
    };

    if (!isClient) {
        return <NavbarSkeleton />;
    }

    return (
        <div className="hidden md:flex items-center space-x-1" suppressHydrationWarning>
            {user ? (
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center"
                    >
                        { user.username ? user.username.charAt(0).toUpperCase() : "P" }
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg py-2 z-50">
                            <Link
                                href="/users/profile"
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                            >
                                <FaRegUser className="mr-5"/>
                                Profile
                            </Link>
                            <Link
                                href="/users/settings"
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
