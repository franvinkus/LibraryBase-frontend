"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar/navbar";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import BookCard from "@/app/components/BookCard/BookCard";
import BookPopup from "@/app/components/BookCardPopUp/BookCardPopUp";
import { Menu } from "lucide-react";
import axios from "axios";

export default function Home() {
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
    const fetchBooks = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7055";
        const token = localStorage.getItem("authToken");
        const userName = localStorage.getItem("userName");

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
        const filteredBooks = response.data.filter((book: any) => !book.availabilityDate || book.availabilityDate.split("T")[0] === today);

        // Acak daftar buku dan ambil hanya 5 buku
        const shuffledBooks = [...filteredBooks]
          .sort(() => Math.random() - 0.5) // Acak urutan
          .slice(0, 5); // Ambil 5 data pertama

        setBooks(shuffledBooks);
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

  const handleBookClick = (book: typeof selectedBook) => {
    setSelectedBook(book);
    setIsPopupOpen(true);
  };

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
              <button className="px-4 py-2 bg-[#E4F0FE] text-[#133EB7] rounded-lg hover:bg-blue-600 hover:text-white transition ease-in-out duration-300 " onClick={() => Router.push("/page/category")}>
                See All &gt;
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
              {books?.length > 0 ? (
                books.map((book, index) => (
                  <div key={index} onClick={() => handleBookClick(book)} className="cursor-pointer">
                    <BookCard book={book} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No books available</p>
              )}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mt-6">
          <div className="bg-white p-6 rounded-lg w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-black">Categories</h2>
              <button className="px-4 py-2 bg-[#E4F0FE] text-[#133EB7] rounded-lg hover:bg-blue-600 hover:text-white transition ease-in-out duration-300" onClick={() => Router.push("/page/category")}>
                See All &gt;
              </button>
            </div>

            {/* Scrollable Categories */}
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
