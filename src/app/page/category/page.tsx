"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "@/app/components/Navbar/navbar";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import BookCard from "@/app/components/BookCard/BookCard";
import BookPopup from "@/app/components/BookCardPopUp/BookCardPopUp";
import { Menu } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearch } from "@/app/context/SearchContext";

export default function CategoryPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  const { searchTerm } = useSearch(); // 🧠 Ambil nilai search dari context

  const fetchBooks = useCallback(async () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.18.36:7055";
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/page/login");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/Books/Get-Books`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const today = new Date().toISOString().split("T")[0];

      const filtered = response.data.filter(
        (book: any) =>
          book.availibility === "True" ||
          !book.availabilityDate ||
          book.availabilityDate.split("T")[0] === today
      );

      setBooks(filtered);
      setError(null);
    } catch (err: any) {
      setError("Failed to fetch books.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      router.push("/page/login");
      return;
    }

    fetchBooks();

    pollingInterval.current = setInterval(() => {
      fetchBooks();
    }, 30_000);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchBooks();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (pollingInterval.current) clearInterval(pollingInterval.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [fetchBooks, router]);

  const uniqueCategories = ["ALL", ...new Set(books.flatMap((b: any) => b.categoryNames))];

  // ✨ Gabungkan filter kategori dan search
  const filteredBooksByCategory =
    selectedCategory === "ALL"
      ? books
      : books.filter((b: any) => b.categoryNames.includes(selectedCategory));

  const filteredBooks = filteredBooksByCategory.filter((book: any) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openPopup = (book: any) => {
    setSelectedBook(book);
    setIsPopupOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`fixed inset-0 z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:relative lg:translate-x-0`}
      >
        <Sidebar />
      </div>

      <main className="flex-1 p-6 pt-6 lg:pt-16">
        <div className="flex items-center justify-between lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700 p-2"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold">Category</h1>
        </div>

        <Navbar />

        <section className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-xl font-bold text-black">Category</h2>

            <div className="flex flex-wrap gap-2 mt-4">
              {uniqueCategories.map((cat, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 rounded-lg ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-[#E4F0FE] text-gray-700 hover:bg-blue-600 hover:text-white"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {loading ? (
              <p className="text-center text-gray-700 mt-4">Loading books...</p>
            ) : error ? (
              <p className="text-center text-red-500 mt-4">{error}</p>
            ) : filteredBooks.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">
                No books found.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
                {filteredBooks.map((book: any, i: number) => (
                  <div
                    key={i}
                    onClick={() => openPopup(book)}
                    className="cursor-pointer"
                  >
                    <BookCard book={book} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {selectedBook && (
        <BookPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          book={selectedBook}
        />
      )}
    </div>
  );
}
