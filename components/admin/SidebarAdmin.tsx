import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import logout from "@/public/logout.png";
import user from "@/public/usuario.png";
import cart from "@/public/carrito.png";
import category from "@/public/category.png";
import order from "@/public/order.png";

export default function SidebarAdmin() {
  return (
    <div className="bg-primary w-1/5 grid grid-rows-[10rem_1fr_10rem]">
      <Link href="/" className="flex items-center relative pl-8">
        <div className="rounded-full bg-background w-16 h-16 flex justify-center items-center">
          <Image src={logo} alt="Brand logo" className="w-12 h-12" />
        </div>
        <h1 className="text-background font-bold text-2xl ml-4">Fooddy s</h1>
      </Link>
      <div className="space-y-4">
        <Link href="/admin/user" className="w-full flex flex-row items-center justify-start gap-8 text-background font-bold text-xl py-4 pl-8 hover:bg-black hover:text-white hover:invert">
          <Image src={user} alt="User icon" className="w-8 h-8" />
          Users
        </Link>
        <Link href="/admin/product" className="w-full flex flex-row items-center justify-start gap-8 text-background font-bold text-xl py-4 pl-8 hover:bg-black hover:text-white hover:invert">
          <Image src={cart} alt="Cart icon" className="w-8 h-8" />
          Product
        </Link>
        <Link href="/admin/category" className="w-full flex flex-row items-center justify-start gap-8 text-background font-bold text-xl py-4 pl-8 hover:bg-black hover:text-white hover:invert">
          <Image src={category} alt="Category icon" className="w-8 h-8" />
          Category
        </Link>
        <Link href="/admin/order" className="w-full flex flex-row items-center justify-start gap-8 text-background font-bold text-xl py-4 pl-8 hover:bg-black hover:text-white hover:invert">
          <Image src={order} alt="Order icon" className="w-8 h-8" />
          Order
        </Link>
      </div>
      <Link href="/users/login" className="w-full pl-8 flex flex-row items-center justify-start gap-4 text-background font-bold text-xl hover:bg-black hover:text-white hover:invert">
        <Image src={logout} className="w-12 h-12" alt="Logout icon" />
        Log out
      </Link>
    </div>
  );
}
