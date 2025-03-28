"use client";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar/navbar";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import BookCard from "@/app/components/BookCard/BookCard";
import BookPopup from "@/app/components/BookCardPopUp/BookCardPopUp";
import { Menu } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CategoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Router = useRouter();

  const [selectedBook, setSelectedBook] = useState<{
    bookId: number;
    title: string;
    author: string;
    description: string;
    imageUrl: string;
  } | null>(null);

  const [books, setBooks] = useState<
    {
      bookId: number;
      title: string;
      author: string;
      categoryIds: number[];
      categoryNames: string[];
      description: string;
      createdAt: string;
      updatedAt: string;
      imageUrl: string;
    }[]
  >([]);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      Router.push("/page/login");
    }
    const fetchBooks = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7055";
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("User session expired! Please login again.");
          Router.push("/");
        }

        const response = await axios.get(`${API_BASE_URL}/api/Books/Get-Books`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

        // Filter hanya buku yang `availabilityDate` kosong atau sama dengan tanggal hari ini
        const filteredBooks = response.data.filter((book: any) => book.availibility === "True" || !book.availabilityDate || book.availabilityDate.split("T")[0] === today);

        setBooks(filteredBooks);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const uniqueCategories = ["ALL", ...new Set(books.flatMap((book) => book.categoryNames))];

  const filteredBooks = selectedCategory === "ALL" ? books : books.filter((book) => book.categoryNames.includes(selectedCategory));

  const openPopup = (book: any) => {
    setSelectedBook({
      bookId: book.bookId,
      title: book.title,
      author: book.author,
      description: book.description,
      imageUrl: book.imageUrl || "",
    });
    setIsPopupOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`fixed inset-0 z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform lg:relative lg:translate-x-0`}>
        <Sidebar />
      </div>

      <main className="flex-1 p-6 pt-6 lg:pt-16">
        <div className="flex items-center justify-between lg:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-700 p-2">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold">Category</h1>
        </div>
        <Navbar />

        <section className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-xl font-bold text-black">Category</h2>

            <div className="flex flex-wrap gap-2 mt-4">
              {uniqueCategories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-[#E4F0FE] text-gray-700 hover:bg-blue-600 hover:text-white"}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {loading ? (
              <p className="text-center text-gray-700 mt-4">Loading books...</p>
            ) : error ? (
              <p className="text-center text-red-500 mt-4">{error}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
                {filteredBooks.map((book, index) => (
                  <div key={index} onClick={() => openPopup(book)} className="cursor-pointer">
                    <BookCard book={book} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Popup */}
      {selectedBook && <BookPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} book={selectedBook} />}
    </div>
  );
}
