import type { Metadata } from "next";
import "../globals.css";
import SidebarAdmin from "../components/SidebarAdmin";
import NavbarAdmin from "../components/NavbarAdmin";
import FooterAdmin from "../components/FooterAdmin";

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "This is the admin dashboard of the site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="min-h-screen h-full w-full">
        <div className="min-h-screen h-full w-full flex flex-row bg-background">
          <SidebarAdmin />
          <div className="w-4/5 flex flex-col justify-between">
            <NavbarAdmin />
            <div className="">
              {children}
            </div>
            <FooterAdmin />
          </div>
        </div>
      </body>
    </html>
  );
}
