"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar/navbar";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import BookCard from "@/app/components/BookCard/BookCard";
import { Menu } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-0 z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform lg:relative lg:translate-x-0`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 pt-6 lg:pt-20">
        {/* Navbar */}
        <div className="flex items-center justify-between lg:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-700 p-2">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold">Home</h1>
        </div>
        <Navbar />

        {/* Recommended Section */}
        <section className="mt-6">
          <div className="bg-white p-6 rounded-lg w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-black">Recommended</h2>
              <button className="px-4 py-2 bg-[#E4F0FE] text-[#133EB7] rounded-lg hover:bg-blue-600 hover:text-white" onClick={() => router.push("/page/main")}>
                See All &gt;
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <BookCard key={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mt-6">
          <div className="bg-white p-6 rounded-lg w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-black">Categories</h2>
              <button className="px-4 py-2 bg-[#E4F0FE] text-[#133EB7] rounded-lg hover:bg-blue-600 hover:text-white" onClick={() => router.push("/page/category")}>
                See All &gt;
              </button>
            </div>

            {/* Scrollable Categories */}
            <div className="flex overflow-x-auto space-x-2 mt-4 scrollbar-hide">
              {["All", "Fantasy", "Education", "Drama"].map((category) => (
                <button key={category} className="px-4 py-2 whitespace-nowrap bg-[#E4F0FE] text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white" onClick={() => router.push(`/page/category/${category.toLowerCase()}`)}>
                  {category}
                </button>
              ))}
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <BookCard key={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
