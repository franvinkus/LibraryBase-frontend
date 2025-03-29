import { X } from "lucide-react";
import { Bookmark, Download } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

type BookPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  book: {
    bookId: string;
    title: string;
    author: string;
    description: string;
    imageUrl: string;
    status: string;
  };
};

export default function BookCardPopUpMyLibrary({ isOpen, onClose, book }: BookPopupProps) {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Gambar */}
        <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
          {book.imageUrl ? <img src={book.imageUrl} alt={book.title} className="w-full h-full object-contain rounded-lg" /> : <span className="text-gray-400">No Image</span>}
        </div>

        {/* Detail Buku */}
        <h2 className="text-xl font-bold mt-4">{book.title}</h2>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-sm text-gray-500 mt-2">{book.description}</p>

        {/* Status dan Icon */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-3">
            <Bookmark className="text-black cursor-pointer hover:text-blue-600 hover:scale-125 transition ease-in-out duration-300" size={20} onClick={() => alert("Fitur Belum Tersedia")} />
            <Download className="text-black cursor-pointer hover:text-blue-600 hover:scale-125 transition ease-in-out duration-300" size={20} onClick={() => alert("Fitur Belum Tersedia")} />
          </div>

          {/* Status Buku */}
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              book.status === "pending" ? "bg-yellow-100 text-yellow-800 font-bold" : book.status === "borrowed" ? "bg-green-100 text-green-800 font-bold  " : book.status === "returned" ? "bg-black  text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            {book.status}
          </span>
        </div>
      </div>
    </div>
  );
}
