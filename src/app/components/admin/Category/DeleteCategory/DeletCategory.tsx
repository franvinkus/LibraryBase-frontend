"use client";
import { useState } from "react";
import axios from "axios";

interface DeleteCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: number | null;
  categoryName: string | null;
}

export default function DeleteCategory({ isOpen, onClose, categoryId, categoryName }: DeleteCategoryProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  if (!isOpen || categoryId === null) return null;

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
      const id = categoryId;
      const response = await axios.delete(`${API_BASE_URL}/api/LibraryBase/CRUD/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Category deleted successfully!");
        onClose();
        window.location.reload();
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
        <h2 className="text-xl font-bold mb-4 text-center text-black">Delete Category</h2>

        {/* Input Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Categories Name</label>
          <input type="text" className="w-full px-3 py-2 rounded-md bg-gray-200 focus:outline-none text-black" placeholder={categoryName ?? "Category Name"} readOnly value={categoryName ?? ""} />
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
