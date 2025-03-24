"use client";
import { useState } from "react";

export default function AddCategory({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen) return null; // Jangan render modal jika tidak dibuka

  const handleSubmit = async () => {
    if (!categoryName) {
      setMessage("Category name is required!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://localhost:7055/api/LibraryBase/CRUD/Add-Category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName }),
      });

      if (!response.ok) throw new Error("Failed to add category");

      setMessage("Category added successfully!");
      setCategoryName("");
    } catch (error: any) {
      setMessage(error.message || "Something went wrong!");
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
          <input type="text" className="w-full px-3 py-2 rounded-md bg-gray-200 focus:outline-none text-black" placeholder="Enter category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        </div>

        {/* Status Message */}
        {message && <p className="text-sm text-center mb-2 text-red-500">{message}</p>}

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition ease-in-out duration-300">
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
