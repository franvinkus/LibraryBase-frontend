"use client";
import { Search } from "lucide-react";
import { Home } from "lucide-react";
import Link from "next/link";
import { useSearch } from "@/app/context/SearchContext";

export default function Navbar() {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-white shadow-md z-50 flex justify-between items-center px-6">
      <Link href="/page/main" className="flex hover:scale-110">
        <Home size={40} className="text-black" />
        <h1 className="text-4xl font-bold text-blue-600 ml-2">
          Library<span className="text-black">Base</span>
        </h1>
      </Link>
      <div className="flex-grow flex justify-center">
        <div className="relative w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 px-10 py-2 border-white rounded-lg bg-[#F0F5FF] focus:outline-none placeholder:font-semibold placeholder:text-center text-black"
          />
          <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" size={20} />
        </div>
      </div>
    </nav>
  );
}
