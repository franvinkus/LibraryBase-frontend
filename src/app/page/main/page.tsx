"use client";
import Navbar from "@/app/components/Navbar/navbar";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import BookCard from "@/app/components/BookCard/BookCard";
import { useRouter } from "next/navigation"; // ✅ Gunakan next/navigation

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6 pt-20">
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
            <div className="flex space-x-7 mt-4">
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
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
            <div className="flex space-x-2 mt-4">
              <button className="px-4 py-2 bg-[#E4F0FE] text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white" onClick={() => router.push("/page/main")}>
                All
              </button>
              <button className="px-4 py-2 bg-[#E4F0FE] text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white" onClick={() => router.push("/page/category/fantasy")}>
                Fantasy
              </button>
              <button className="px-4 py-2 bg-[#E4F0FE] text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white" onClick={() => router.push("/page/category/education")}>
                Education
              </button>
              <button className="px-4 py-2 bg-[#E4F0FE] text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white" onClick={() => router.push("/page/category/drama")}>
                Drama
              </button>
            </div>

            <div className="flex space-x-7 mt-4">
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
