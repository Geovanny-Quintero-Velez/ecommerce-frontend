import React from "react";
import Link from "next/link";

export default function FooterAdmin() {
  return (
    <footer className="admin-footer bg-white py-4 px-20 flex justify-end items-center justify-self-end">
      <div className="links w-60 flex justify-between">
        <Link href="#" className="hover:text-primary hover:underline focus:text-primary focus:underline">
          About
        </Link>
        <Link href="#" className="hover:text-primary hover:underline focus:text-primary focus:underline">
          Privacy policy
        </Link>
      </div>
    </footer>
  );
}
