import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {CartProvider} from "@/context/CartContext";
import {UserProvider} from "@/context/UserContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home Page",
  description: "This is the home page of the site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="backgroundBackground min-h-screen">
        <UserProvider>
          <CartProvider>
          {children}
          </CartProvider>
        </UserProvider>
        </div>
      </body>
    </html>
  );
}
