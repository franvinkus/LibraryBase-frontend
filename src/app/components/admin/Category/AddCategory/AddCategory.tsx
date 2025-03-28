import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddCategory({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null; // Jangan render modal jika tidak dibuka

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      setError("⚠️ Category name is required!");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7055";
      const token = localStorage.getItem("authToken");

      console.log("JWT Token:", token);

      if (!token) {
        setError("❌ User session expired! Please login again.");
        console.warn("⚠️ No token found, redirecting to login...");
        return;
      }

      // 🔥 Kirim request ke backend dengan JWT
      const response = await axios.post(
        `${API_BASE_URL}/api/LibraryBase/CRUD/Add-Category`,
        { categoryName }, // Body
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Good job!",
          text: "Add Category Successfully!",  
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(); // Reload halaman setelah menekan OK
          }
        });
      } else {
        console.error("⚠️ API Error:", response.data);
        throw new Error(response.data.message || "Failed to add category");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "❌ Login gagal, silakan coba lagi.");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("⚠️ Terjadi kesalahan yang tidak terduga.");
      }
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
        <h2 className="text-xl font-bold mb-4 text-center text-black">Add Category</h2>

        {/* Input Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Category Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md bg-gray-200 focus:outline-none text-black disabled:bg-gray-300"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Status Message */}
        {message && <p className="text-sm text-center mb-2 text-green-500">{message}</p>}
        {error && <p className="text-sm text-center mb-2 text-red-500">{error}</p>}

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-[#E4F0FE] text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white hover:scale-105 transision ease-in-out duration-300">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} className={`px-4 py-2 rounded-lg transition ease-in-out duration-300 ${loading ? "bg-gray-400 text-white" : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"}`}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
