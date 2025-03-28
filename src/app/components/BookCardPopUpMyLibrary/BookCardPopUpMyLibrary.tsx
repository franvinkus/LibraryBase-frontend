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
  if (!isOpen) return null;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
          {book.imageUrl ? <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover rounded-lg" /> : <span className="text-gray-400">No Image</span>}
        </div>

        <h2 className="text-xl font-bold mt-4">{book.title}</h2>
        <p className="text-gray-600">{book.author}</p>

        <p className="text-sm text-gray-500 mt-2">{book.description}</p>

        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-3">
            <Bookmark className="text-black cursor-pointer hover:text-blue-600 hover:scale-125 transition ease-in-out duration-300" size={20} onClick={() => alert("Fitur Belum Tersedia")} />
            <Download className="text-black cursor-pointer hover:text-blue-600 hover:scale-125 transition ease-in-out duration-300" size={20} onClick={() => alert("Fitur Belum Tersedia")} />
          </div>
          <button className="bg-[#E4F0FE] text-black px-4 py-1 rounded-full hover:bg-blue-700 hover:text-white hover:scale-125 transition ease-in-out duration-300">{book.status}</button>
        </div>
      </div>
    </div>
  );
}
