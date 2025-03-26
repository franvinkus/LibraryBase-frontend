"use client";
import { useState } from "react";
import Navbar from "@/app/components/Navbar/navbar";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import BookCard from "@/app/components/BookCard/BookCard";
import BookPopup from "@/app/components/BookCardPopUp/BookCardPopUp";
import { Menu } from "lucide-react";

export default function History() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({
    title: "",
    author: "",
    description: "",
    image: "",
  });

  // Dummy data buku
  const books = [
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
      description: "A story about a young wizard.",
      image: "/harry-potter.jpg",
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      description: "An adventure of a hobbit named Bilbo Baggins.",
      image: "/the-hobbit.jpg",
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      description: "A book about financial education.",
      image: "/rich-dad-poor-dad.jpg",
    },
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
      description: "A story about a young wizard.",
      image: "/harry-potter.jpg",
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      description: "An adventure of a hobbit named Bilbo Baggins.",
      image: "/the-hobbit.jpg",
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      description: "A book about financial education.",
      image: "/rich-dad-poor-dad.jpg",
    },
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
      description: "A story about a young wizard.",
      image: "/harry-potter.jpg",
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      description: "An adventure of a hobbit named Bilbo Baggins.",
      image: "/the-hobbit.jpg",
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      description: "A book about financial education.",
      image: "/rich-dad-poor-dad.jpg",
    },
  ];

  // Fungsi untuk menampilkan popup
  const handleBookClick = (book: typeof selectedBook) => {
    setSelectedBook(book);
    setIsPopupOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-0 z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform lg:relative lg:translate-x-0`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 pt-6 lg:pt-16">
        {/* Navbar */}
        <div className="flex items-center justify-between lg:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-700 p-2">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold">History</h1>
        </div>
        <Navbar />

        {/* Categories Section */}
        <section className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-xl font-bold text-black">History</h2>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["All", "Fantasy", "Education", "Drama"].map((category) => (
                <button key={category} className="px-4 py-2 bg-[#E4F0FE] text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white">
                  {category}
                </button>
              ))}
            </div>

            {/* Book Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
              {books.map((book, index) => (
                <div key={index} onClick={() => handleBookClick(book)} className="cursor-pointer">
                  {/* <BookCard book={book} /> */}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Popup Detail Buku */}
      <BookPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} book={selectedBook} />
    </div>
  );
}
