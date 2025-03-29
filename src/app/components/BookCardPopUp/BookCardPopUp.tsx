import { X } from "lucide-react";
import { Bookmark, Download } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

type BookPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  book: {
    bookId: number;
    title: string;
    author: string;
    description: string;
    imageUrl: string;
  };
};

export default function BookPopup({ isOpen, onClose, book }: BookPopupProps) {
  if (!isOpen) return null;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleBorrow = async () => {
    try {
      setLoading(true);
      setError("");

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7055";
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("User session expired! Please login again.");
        setLoading(false);
        return;
      }

      const bookingId = book.bookId;
      console.log("Book ID:", bookingId);
      console.log("JWT Token:", token);

      // Panggil API dengan token di dalam headers
      const response = await axios.post(
        `${API_BASE_URL}/api/Borrow/${bookingId}/Request-Borrow`,
        {}, // Jika tidak ada body, pastikan ini dikirim sebagai object kosong
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pastikan format benar
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Good job!",
          text: "Request Borrow Book Successed",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
    } catch (err: any) {
      console.error("Error:", err.response);
      setError(err.response?.data?.message || "Failed to borrow book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
          {book.imageUrl ? <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover rounded-lg" /> : <span className="text-gray-400">No Image</span>}
        </div>

        <h2 className="text-xl font-bold mt-4 text-black">{book.title}</h2>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-sm text-gray-500 mt-2">{book.description}</p>

        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-3">
            <Bookmark className="text-black cursor-pointer hover:text-blue-600 hover:scale-125 transition ease-in-out duration-300" size={20} onClick={() => alert("Fitur Belum Tersedia")} />
            <Download className="text-black cursor-pointer hover:text-blue-600 hover:scale-125 transition ease-in-out duration-300" size={20} onClick={() => alert("Fitur Belum Tersedia")} />
          </div>
          <button onClick={handleBorrow} className="bg-[#E4F0FE] text-black px-4 py-1 rounded-full hover:bg-blue-700 hover:text-white hover:scale-125 transition ease-in-out duration-300">
            Borrow
          </button>
        </div>
      </div>
    </div>
  );
}
