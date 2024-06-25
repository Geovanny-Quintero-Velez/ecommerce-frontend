import React from 'react';

const Navbar = () => {
    return (
        <div className="w-full h-16 backgroundPrimary text-white flex items-center px-4">
            <div className="flex-shrink-0">
                <img src="/logo.png" alt="Logo" className="h-10" />
            </div>
            <div className="flex-grow text-center font-semibold">
                <span>Manage your account</span>
            </div>
            <div className="flex-shrink-0">
                <span>correo@gmail.com</span>
            </div>
        </div>
    );
};

export default Navbar;
