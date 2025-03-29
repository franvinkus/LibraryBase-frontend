"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";
import SidebarAdmin from "@/app/components/admin/SidebarAdmin/SidebarAdmin";
import NavbarAdmin from "@/app/components/admin/NavbarAdmin/NavbarAdmin";
import AddBook from "@/app/components/admin/Book/AddBook/AddBook";
import DeleteBook from "@/app/components/admin/Book/DeleteBook/DeleteBook";
import UpdateBook from "@/app/components/admin/Book/UpdateBook/UpdateBook";

export default function AdminDashboardBook() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedbookId, setSelectedbookId] = useState<number | null>(null);
  const [selectedtitle, setselectedtitle] = useState<string | null>(null);

  const [books, setbooks] = useState<{ bookId: number; title: string; author: string; categoryIds: number[]; description: string; createdAt: string; updatedAt: string; imageUrl: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7055";
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("User session expired! Please login again.");
        }

        console.log("Fetching books from:", `${API_BASE_URL}/api/Books/Get-Books`);

        const response = await axios.get(`${API_BASE_URL}/api/Books/Get-Books`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Books Data:", response.data);
        setbooks(response.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books");
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
                <h2 className="text-lg font-bold text-black">Book List</h2>
                <button className="bg-gray-800  text-white p-2 rounded-lg hover:text-white hover:bg-blue-700 hover:scale-110 transition ease-in-out duration-300" onClick={() => setIsAddModalOpen(true)}>
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
                        <th className="p-3">Book Title</th>
                        <th className="p-3">Author</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Image</th>
                        <th className="p-3">Created At</th>
                        <th className="p-3">Updated At</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="rounded-b-lg">
                      {books.map((book) => (
                        <tr key={book.bookId} className="text-center border-b last:rounded-b-lg text-black">
                          <td className="p-3">{book.bookId}</td>
                          <td className="p-3">{book.title}</td>
                          <td className="p-3">{book.author}</td>
                          <td className="p-3">{book.categoryIds.join(", ")}</td>
                          <td className="p-3">{book.description}</td>

                          <td className="p-3">
                            {book.imageUrl ? (
                              <>
                                {console.log("Image URL:", book.imageUrl)}
                                <img src={book.imageUrl} alt={book.title} className="w-16 h-16 object-cover rounded-lg" />
                              </>
                            ) : (
                              <span>No Image</span>
                            )}
                          </td>

                          <td className="p-3">{book.createdAt}</td>
                          <td className="p-3">{book.updatedAt}</td>
                          <td className="p-3 flex justify-center gap-2">
                            <button
                              className="text-blue-500 hover:text-blue-700 hover:scale-125 transition ease-in-out duration-300"
                              onClick={() => {
                                setSelectedbookId(book.bookId);
                                setIsUpdateModalOpen(true);
                              }}
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700 hover:scale-125 transition ease-in-out duration-300"
                              onClick={() => {
                                setSelectedbookId(book.bookId);
                                setselectedtitle(book.title);
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
            {isAddModalOpen && <AddBook isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />}

            {isUpdateModalOpen && selectedbookId !== null && (
              <UpdateBook
                isOpen={isUpdateModalOpen}
                onClose={() => {
                  setIsUpdateModalOpen(false);
                  setSelectedbookId(null);
                }}
                bookId={selectedbookId}
              />
            )}

            {isDeleteModalOpen && selectedbookId !== null && (
              <DeleteBook
                isOpen={isDeleteModalOpen}
                onClose={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedbookId(null);
                }}
                bookId={selectedbookId}
                title={selectedtitle}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
