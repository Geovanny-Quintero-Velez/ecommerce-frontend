import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="backgroundPrimary text-white min-h-screen p-4">
      <div className="flex flex-col items-center mb-8">
        <img src="/profile-pic.png" alt="Profile Picture" className="w-24 h-24 rounded-full mb-4" />
        <h2 className="text-xl font-semibold">John Doe</h2>
        <p className="text-sm">Admin</p>
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
