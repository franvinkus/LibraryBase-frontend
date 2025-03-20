"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Navbar from "@/app/components/Navbar/navbar";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import BookCard from "@/app/components/BookCard/BookCard";

export default function Category() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar (Menampilkan tombol menu di mobile) */}
      <div className="fixed top-0 w-full bg-white shadow-md p-4 flex items-center justify-between z-50">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-700 p-2 lg:hidden">
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-semibold">Categories</h1>
      </div>

      {/* Sidebar Responsive */}
      <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`} onClick={() => setSidebarOpen(false)}>
        <div className="w-64 h-full bg-white p-4 shadow-md" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-700 p-2">
            <X size={24} />
          </button>
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 pt-16">
        <Navbar />

        {/* Categories Section */}
        <section className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-xl font-bold text-black">Categories</h2>

            {/* Category Buttons (Bisa Scroll Horizontal di Mobile) */}
            <div className="flex overflow-x-auto space-x-2 mt-4 scrollbar-hide">
              {["All", "Fantasy", "Education", "Drama"].map((category) => (
                <button key={category} className="px-4 py-2 whitespace-nowrap bg-[#E4F0FE] text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white">
                  {category}
                </button>
              ))}
            </div>

            {/* Book Card Grid Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {Array.from({ length: 16 }).map((_, index) => (
                <BookCard key={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
