"use client";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar/navbar";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import BookCard from "@/app/components/BookCard/BookCard";
import BookPopup from "@/app/components/BookCardPopUp/BookCardPopUp";
import BookCardPopUpMyLibrary from "@/app/components/BookCardPopUpMyLibrary/BookCardPopUpMyLibrary";
import { Book, Menu } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function BorrowedBooksPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const Router = useRouter();

  type Book = {
    bookId: string;
    title: string;
    author: string;
    description: string;
    imageUrl: string;
    status: string;
  };

  type BorrowedBook = {
    bookId: string;
    borrowDate: string;
    status: string;
  };

  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      Router.push("/page/login");
    }

    const fetchBooks = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7055";
        const token = localStorage.getItem("authToken");

        if (!token) throw new Error("User session expired! Please login again.");

        // Fetch all books
        const booksResponse = await axios.get(`${API_BASE_URL}/api/Books/Get-Books`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(booksResponse.data);

        // Fetch borrowed books
        const borrowedResponse = await axios.get(`${API_BASE_URL}/api/Borrow/See-All-Borrow`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBorrowedBooks(borrowedResponse.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const getBookDetailsFromCache = (bookId: string): Book | null => {
    return books.find((book) => book.bookId === bookId) || null;
  };

  const borrowedBooksWithDetails = borrowedBooks
    .filter((borrowedBook) => borrowedBook.status !== "returned") // Filter out returned books
    .map((borrowedBook) => {
      const bookDetails = getBookDetailsFromCache(borrowedBook.bookId);
      return {
        ...borrowedBook,
        title: bookDetails?.title || "Unknown Title",
        author: bookDetails?.author || "Unknown Author",
        description: bookDetails?.description || "No description available",
        imageUrl: bookDetails?.imageUrl || "",
      };
    });

  const openPopup = (book: Book) => {
    setSelectedBook(book);
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
          <h1 className="text-lg font-semibold">Borrowed Books</h1>
        </div>
        <Navbar />

        <section className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-xl font-bold text-black">Borrowed Books</h2>

            {loading ? (
              <p className="text-center text-gray-700 mt-4">Loading borrowed books...</p>
            ) : error ? (
              <p className="text-center text-red-500 mt-4">{error}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
                {borrowedBooksWithDetails.map((book, index) => (
                  <div key={index} onClick={() => openPopup(book)} className="cursor-pointer">
                    <BookCard book={book} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {selectedBook && <BookCardPopUpMyLibrary isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} book={selectedBook} />}
    </div>
  );
}
