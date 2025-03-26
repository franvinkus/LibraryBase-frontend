"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddBook({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<{ cateId: number; cateName: string }[]>([]);
  const [imgFile, setImgFile] = useState<File | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7055";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("User session expired! Please login again.");
        }

        const response = await axios.get(`${API_BASE_URL}/api/LibraryBase/CRUD/Get-Category`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(e.target.value, 10);
    if (selectedValue && !selectedCategories.includes(selectedValue)) {
      setSelectedCategories((prev) => [...prev, selectedValue]);
    }
  };

  const removeCategory = (categoryId: number) => {
    setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImgFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !author.trim() || selectedCategories.length === 0 || !description.trim() || !imgFile) {
      alert("⚠️ Semua field harus diisi!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("imgFile", imgFile);
    selectedCategories.forEach((category) => formData.append("categoryIds", category.toString()));

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("User session expired! Please login again.");
      }

      const response = await axios.post(`${API_BASE_URL}/api/Books/Add-Book`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Success:", response.data);
      Swal.fire({
        title: "Good job!",
        text: "Add Book Successfully!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (err) {
      console.error("Error adding book:", err);
      setError("❌ Gagal menambahkan buku.");
    } finally {
      setLoading(false);
    }
  };
  return isOpen ? (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[400px]">
        <h2 className="text-xl font-bold text-center text-black mb-4">Add Book</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <label className="block text-sm font-semibold text-gray-700">Title Book</label>
        <input type="text" className="w-full px-4 py-2 border rounded-lg text-black" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label className="block text-sm font-semibold text-gray-700 mt-3">Author</label>
        <input type="text" className="w-full px-4 py-2 border rounded-lg text-black" value={author} onChange={(e) => setAuthor(e.target.value)} />

        <label className="block text-sm font-semibold text-gray-700 mt-3">Category</label>
        <select className="w-full px-4 py-2 border rounded-lg text-black" onChange={handleCategoryChange} value="">
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.cateId} value={category.cateId}>
              {category.cateName}
            </option>
          ))}
        </select>

        <div className="mt-2 max-h-20 overflow-y-auto border rounded-lg p-2">
          {selectedCategories.length > 0 ? (
            selectedCategories.map((categoryId) => {
              const category = categories.find((cat) => cat.cateId === categoryId);
              return (
                <span key={categoryId} className="inline-flex items-center px-3 py-1 m-1 bg-blue-500 text-white rounded-lg text-sm">
                  {category?.cateName}
                  <button onClick={() => removeCategory(categoryId)} className="ml-2 text-white hover:text-gray-300">
                    ✕
                  </button>
                </span>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm">No categories selected</p>
          )}
        </div>

        <label className="block text-sm font-semibold text-gray-700 mt-3">Upload Image</label>
        <input type="file" className="w-full px-4 py-2 border rounded-lg text-black" onChange={handleFileChange} />

        <label className="block text-sm font-semibold text-gray-700 mt-3">Description</label>
        <textarea className="w-full px-4 py-2 border rounded-lg text-black" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} className={`px-4 py-2 rounded-lg ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
