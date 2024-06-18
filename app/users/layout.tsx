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
    <section className="flex flex-col h-dvh">
      <div className="flex flex-1 justify-evenly items-center h-5/6">
        <h1 className="text-4xl font-bold text-green-700">
          Hello! Nice to see you!
        </h1>
        {children}
      </div>
      <Footer />
    </section>
  );
}
