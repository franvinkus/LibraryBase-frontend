"use client";
import { useState } from "react";
import { Home, Users, Settings, Menu } from "lucide-react";
import SidebarAdmin from "@/app/components/admin/SidebarAdmin/SidebarAdmin";
import NavbarAdmin from "@/app/components/admin/NavbarAdmin/NavbarAdmin";
import AddCategory from "@/app/components/admin/Category/AddCategory/AddCategory";
import UpdateCategory from "@/app/components/admin/Category/UpdateCategory/UpdateCategory";
import DeleteCategory from "@/app/components/admin/Category/DeleteCategory/DeletCategory";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function Manage() {
  const categories = [
    { id: 1, name: "Romance", created_at: "2025-03-20", updated_at: "2025-03-20", created_by: 1, updated_by: "NULL" },
    { id: 2, name: "Horror", created_at: "2025-03-18", updated_at: "2025-03-19", created_by: 2, updated_by: 3 },
    { id: 3, name: "Fantasy", created_at: "2025-03-15", updated_at: "2025-03-18", created_by: 1, updated_by: 2 },
    { id: 4, name: "Science Fiction", created_at: "2025-03-10", updated_at: "2025-03-15", created_by: 3, updated_by: 4 },
  ];
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />

      {/* Main Content */}
      <main className="flex-1 p-6 pt-6 lg:pt-16">
        {/* Navbar */}
        <NavbarAdmin />

        {/* Categories Section */}
        <section className="mt-10">
          <div className="relative">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-black">Manage Book List</h2>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full border-collapse rounded-lg">
                  <thead>
                    <tr className="bg-[#D9D9D9] text-black rounded-t-lg">
                      <th className="p-3">ID</th>
                      <th className="p-3">Category Name</th>
                      <th className="p-3">Created At</th>
                      <th className="p-3">Updated At</th>
                      <th className="p-3">Created By</th>
                      <th className="p-3">Updated By</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="rounded-b-lg">
                    {categories.map((category) => (
                      <tr key={category.id} className="text-center border-b last:rounded-b-lg text-black">
                        <td className="p-3">{category.id}</td>
                        <td className="p-3">{category.name}</td>
                        <td className="p-3">{category.created_at}</td>
                        <td className="p-3">{category.updated_at}</td>
                        <td className="p-3">{category.created_by}</td>
                        <td className="p-3">{category.updated_by}</td>
                        <td className="p-3 flex justify-center gap-2">
                          <button className="text-blue-500 hover:text-blue-700 hover:scale-125 transision ease-in-out duration-300" onClick={() => setIsUpdateModalOpen(true)}>
                            <Pencil size={18} />
                          </button>
                          <button className="text-red-500 hover:text-red-700 hover:scale-125 transision ease-in-out duration-300">
                            <Trash2 size={18} onClick={() => setIsDeleteModalOpen(true)} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {isAddModalOpen && <AddCategory isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />}
            {isUpdateModalOpen && <UpdateCategory isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} />}
            {isDeleteModalOpen && <DeleteCategory isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />}
          </div>
        </section>
      </main>
    </div>
  );
}
