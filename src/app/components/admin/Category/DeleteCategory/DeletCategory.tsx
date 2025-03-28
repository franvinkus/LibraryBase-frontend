"use client";
import { useState } from "react";

export default function DeleteCategory({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [categoryName, setCategoryName] = useState("");
  const [updateBy, setUpdateBy] = useState("");

  if (!isOpen) return null; // Jangan render modal jika tidak dibuka

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
          <input type="text" className="w-full px-3 py-2  rounded-md bg-gray-200 focus:outline-none text-black" placeholder="Categories Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Update By</label>
          <input type="text" className="w-full px-3 py-2 rounded-md bg-gray-200 focus:outline-none text-black" placeholder="Update By" value={updateBy} onChange={(e) => setUpdateBy(e.target.value)} />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-[#E4F0FE] text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white hover:scale-105 transision ease-in-out duration-300">
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#E4F0FE] text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white hover:scale-105 transision ease-in-out duration-300">Delete</button>
        </div>
      </div>
    </div>
  );
}
