import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-around">
            <div className="px-5 py-2">
                <Link href="#" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                Terms and conditions
                </Link>
            </div>
            <div className="px-5 py-2">
                <Link href="#" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                Privacy advice
                </Link>
            </div>
            <div className="px-5 py-2">
                <Link href="#" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                Support
                </Link>
            </div>
            <div className="px-5 py-2">
                <Link href="#" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                About us
                </Link>
            </div>
        </footer>
  );
}
