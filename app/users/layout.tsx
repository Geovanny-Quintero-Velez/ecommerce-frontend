import React from "react";
import Footer from "../components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "This is the login page of the site.",
  };

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col min-h-screen">
      <div className=" h-screen flex items-center justify-center" style={{background: 'var(--color-background)'}}>
        {/* Container of the whole section */}
        <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* Left side */}
          <div className="w-1/2  p-10 flex items-center justify-center" style={{background: 'var(--color-background)'}}>
            <div style={{ color: 'var(--color-primary)'}}>
              <h1 className="text-5xl font-bold">Hello!</h1>
              <h1 className="text-5xl font-bold mt-2">Nice to see you!</h1>
            </div>
          </div>
        {children}
        </div>
      </div>
      <Footer />
    </section>
  );
}
