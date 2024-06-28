import React from 'react';
import Link from 'next/link';

interface Props {
    user: {
        name: string;
        lastname: string;
        email: string;
        role?:string;
    };
}

const Sidebar = ({user} : Props) => {
    return (
        <div className="backgroundPrimary text-white w-64 p-4">
            <div className="flex flex-col items-center mb-8">
                <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="Profile Picture" className="w-24 h-24 rounded-full mb-4" />
                <h2 className="text-xl font-semibold">{user.name} {user.lastname}</h2>
                <p className="text-sm">{user.role? user.role.toUpperCase() : "User"}</p>
            </div>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link href="/users/profile" className="block px-4 py-2 hover:bg-green-600 rounded">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link href="/users/orders" className="block px-4 py-2 hover:bg-green-600 rounded">
                            My orders
                        </Link>
                    </li>
                    <li>
                        <Link href="/users/wishlist" className="block px-4 py-2 hover:bg-green-600 rounded">
                            My wishlist
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
