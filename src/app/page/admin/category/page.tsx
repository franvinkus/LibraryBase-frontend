"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";
import SidebarAdmin from "@/app/components/admin/SidebarAdmin/SidebarAdmin";
import NavbarAdmin from "@/app/components/admin/NavbarAdmin/NavbarAdmin";
import AddCategory from "@/app/components/admin/Category/AddCategory/AddCategory";
import UpdateCategory from "@/app/components/admin/Category/UpdateCategory/UpdateCategory";
import DeleteCategory from "@/app/components/admin/Category/DeleteCategory/DeletCategory";
import { useRouter } from "next/navigation";

export default function AdminDashboardCategory() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ cateId: number; cateName: string; createdAt: string; updatedAt: string }[]>([]);
  const [Router] = useState(useRouter());

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7055";
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("User session expired! Please login again.");
          Router.push("/page/login");
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
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />
      <main className="flex-1 p-6 pt-6 lg:pt-16">
        <NavbarAdmin />
        <section className="mt-10">
          <div className="relative">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-black">Categories</h2>
                <button className="bg-gray-800 text-white   p-2 rounded-lg hover:text-white hover:bg-blue-700 hover:scale-110 transition ease-in-out duration-300" onClick={() => setIsAddModalOpen(true)}>
                  <Plus size={20} />
                </button>
              </div>
              {loading ? (
                <p>Loading categories...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full border-collapse rounded-lg">
                    <thead>
                      <tr className="bg-[#D9D9D9] text-black rounded-t-lg">
                        <th className="p-3">ID</th>
                        <th className="p-3">Category Name</th>
                        <th className="p-3">Created At</th>
                        <th className="p-3">Updated At</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="rounded-b-lg">
                      {categories.map((category) => (
                        <tr key={category.cateId} className="text-center border-b last:rounded-b-lg text-black">
                          <td className="p-3">{category.cateId}</td>
                          <td className="p-3">{category.cateName}</td>
                          <td className="p-3">{category.createdAt}</td>
                          <td className="p-3">{category.updatedAt}</td>
                          <td className="p-3 flex justify-center gap-2">
                            <button
                              className="text-blue-500 hover:text-blue-700 hover:scale-125 transition ease-in-out duration-300"
                              onClick={() => {
                                setSelectedCategoryId(category.cateId);
                                setIsUpdateModalOpen(true);
                              }}
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700 hover:scale-125 transition ease-in-out duration-300"
                              onClick={() => {
                                setSelectedCategoryId(category.cateId);
                                setSelectedCategoryName(category.cateName);
                                setIsDeleteModalOpen(true);
                              }}
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modal Components */}
            {isAddModalOpen && <AddCategory isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />}
            {isUpdateModalOpen && selectedCategoryId !== null && (
              <UpdateCategory
                isOpen={isUpdateModalOpen}
                onClose={() => {
                  setIsUpdateModalOpen(false);
                  setSelectedCategoryId(null);
                }}
                categoryId={selectedCategoryId}
              />
            )}
            {isDeleteModalOpen && selectedCategoryId !== null && (
              <DeleteCategory
                isOpen={isDeleteModalOpen}
                onClose={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedCategoryId(null);
                }}
                categoryId={selectedCategoryId}
                categoryName={selectedCategoryName}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
