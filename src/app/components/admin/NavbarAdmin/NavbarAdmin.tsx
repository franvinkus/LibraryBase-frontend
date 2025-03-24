"use client";
import { Search } from "lucide-react";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NavbarAdmin() {
  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-white shadow-md z-50 flex items-center px-6">
      {/* Logo */}
      <Link href="/page/admin/admin" className="flex items-center hover:scale-110">
        <Home size={40} className="text-black" />
        <h1 className="text-4xl font-bold text-blue-600 ml-2">
          Library<span className="text-black">Base</span>
        </h1>
      </Link>

      {/* Spacer untuk mendorong "Admin Panel" ke kanan */}
      <div className="ml-auto ">
        <h2 className="text-3xl font-semibold text-blue-600">
          Admin <span className="text-black">Panel</span>
        </h2>
      </div>
    </nav>
  );
}
