import type { Metadata } from "next";
import "../globals.css";
import SidebarAdmin from "@/components/admin/SidebarAdmin";
import NavbarAdmin from "@/components/admin/NavbarAdmin";
import FooterAdmin from "@/components/admin/FooterAdmin";

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
    <div className="min-h-screen h-full w-full flex flex-row">
      <SidebarAdmin />
      <div className="w-4/5 flex flex-col justify-between">
        <NavbarAdmin />
        <div className="">
          {children}
        </div>
        <FooterAdmin />
      </div>
    </div>
  );
}
