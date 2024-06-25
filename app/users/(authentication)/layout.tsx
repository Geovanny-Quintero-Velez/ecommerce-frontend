import React from "react";
import Footer from "@/components/general/footer/Footer";
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
      <div
        className="flex-grow h-screen flex items-center justify-center overflow-auto"
        style={{ background: "var(--color-background)" }}
      >
        <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 p-10 flex items-center justify-center"
            style={{ background: "var(--color-background)" }}
          >
            <div style={{ color: "var(--color-primary)" }}>
              <h1 className="text-3xl lg:text-5xl font-bold">Hello!</h1>
              <h1 className="text-3xl lg:text-5xl font-bold mt-2">Nice to see you!</h1>
            </div>
          </div>
          {children}
        </div>
      </div>
      <Footer />
    </section>
  );
}
