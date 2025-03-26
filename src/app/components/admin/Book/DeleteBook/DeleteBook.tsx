"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface DeleteBookProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: number | null;
  title: string | null;
}

export default function DeleteBook({ isOpen, onClose, bookId, title }: DeleteBookProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  if (!isOpen || bookId === null) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7055"; // Ganti dengan URL backend Anda
      const token = localStorage.getItem("authToken");

      if (!token) {
        // Jika token tidak ditemukan
        setError("User session expired! Please login again.");
        setLoading(false);
        return;
      }
      const id = bookId;
      const response = await axios.delete(`${API_BASE_URL}/api/Books/Delete-Book/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Good job!",
          text: "Delete Book Successfully!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(); // Reload halaman setelah menekan OK
          }
        });
      }
    } catch (err) {
      setError("Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Tombol Close */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          ✖
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4 text-center text-black">Delete Book</h2>

        {/* Input Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Title Book</label>
          <input type="text" className="w-full px-3 py-2 rounded-md bg-gray-200 focus:outline-none text-black" placeholder={title ?? "Book Title"} readOnly value={title ?? ""} />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-[#E4F0FE] text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white hover:scale-105 transision ease-in-out duration-300">
            Cancel
          </button>
          <button onClick={handleDelete} className={`px-4 py-2 rounded-lg hover:scale-105 transition duration-300 ${loading ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
