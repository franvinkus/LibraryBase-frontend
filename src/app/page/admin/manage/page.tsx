"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Home, Users, Settings, Menu, Search, Pencil, Trash2, Plus } from "lucide-react";
import SidebarAdmin from "@/app/components/admin/SidebarAdmin/SidebarAdmin";
import NavbarAdmin from "@/app/components/admin/NavbarAdmin/NavbarAdmin";
import UpdateManageUser from "@/app/components/admin/Manage/UpdateManage/EditManage";
import DeleteManageUser from "@/app/components/admin/Manage/DeleteManage/DeleteManage";

interface BorrowData {
  bookingId: number;
  userId: number;
  username: string;
  bookId: number;
  title: string;
  returnDate: string;
  status: string;
  pageNumber: number;
  pageSize: number;
}

export default function AdminDashboardManage() {
  const [borrowData, setBorrowData] = useState<BorrowData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchUsername, setSearchUsername] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selecteduserId, setSelecteduserId] = useState<number | null>(null);
  const [selectedbookingId, setSelectedbokkingId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7055";

  const fetchBorrowData = async (username: string = "", page: number = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("User session expired! Please login again.");
      }

      const response = await axios.get(`${API_BASE_URL}/api/Borrow/See-All-Borrow/Admin`, {
        params: {
          username: username || undefined,
          pageNumber: page,
          pageSize: pageSize,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle both array and single object response
      if (Array.isArray(response.data)) {
        setBorrowData(response.data);
      } else if (response.data) {
        setBorrowData([response.data]);
      } else {
        setBorrowData([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowData(searchUsername, currentPage);
  }, [currentPage, pageSize]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchBorrowData(searchUsername, 1);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />

      {/* Main Content */}
      <main className="flex-1 p-6 pt-6 lg:pt-16">
        {/* Navbar */}
        <NavbarAdmin />

        {/* Borrow Data Section */}
        <section className="mt-10">
          <div className="relative">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
                <h2 className="text-lg font-bold text-black">Manage Borrow List</h2>

                {/* Search and Page Size Controls */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <form onSubmit={handleSearch} className="flex items-center">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search by username..."
                        className="pl-10 pr-4 py-2 bg-[#F0F5FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        value={searchUsername}
                        onChange={(e) => setSearchUsername(e.target.value)}
                      />
                      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                    <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Search
                    </button>
                  </form>

                  <div className="flex items-center">
                    <label htmlFor="pageSize" className="mr-2 text-sm text-gray-600">
                      Items per page:
                    </label>
                    <select id="pageSize" value={pageSize} onChange={handlePageSizeChange} className="border rounded-lg px-3 text-black py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                </div>
              </div>

              {isLoading && <div className="text-center py-4">Loading data...</div>}
              {error && <div className="text-red-500 text-center py-4">{error}</div>}

              {!isLoading && !error && (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-lg">
                      <thead>
                        <tr className="bg-[#D9D9D9] text-black">
                          <th className="p-3 text-left">Booking ID</th>
                          <th className="p-3 text-left">User ID</th>
                          <th className="p-3 text-left">Username</th>
                          <th className="p-3 text-left">Book ID</th>
                          <th className="p-3 text-left">Title</th>
                          <th className="p-3 text-left">Return Date</th>
                          <th className="p-3 text-left">Status</th>
                          <th className="p-3 text-left">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {borrowData.length > 0 ? (
                          borrowData.map((item) => (
                            <tr key={item.bookingId} className="border-b hover:bg-gray-50 text-black">
                              <td className="p-3">{item.bookingId}</td>
                              <td className="p-3">{item.userId}</td>
                              <td className="p-3">{item.username}</td>
                              <td className="p-3">{item.bookId}</td>
                              <td className="p-3">{item.title}</td>
                              <td className="p-3">{item.returnDate || "-"}</td>
                              <td className="p-3">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    item.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : item.status === "approved"
                                      ? "bg-green-100 text-green-800"
                                      : item.status === "rejected"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </td>
                              <td className="p-3">
                                <div className="flex gap-2">
                                  <button className="text-blue-500 hover:text-blue-700 hover:scale-125 transition ease-in-out duration-300" title="Edit">
                                    <Pencil
                                      size={18}
                                      onClick={() => {
                                        setSelectedbokkingId(item.bookingId);
                                        setSelecteduserId(item.userId);
                                        setIsUpdateModalOpen(true);
                                      }}
                                    />
                                  </button>
                                  <button className="text-red-500 hover:text-red-700 hover:scale-125 transition ease-in-out duration-300" title="Delete">
                                    <Trash2
                                      size={18}
                                      onClick={() => {
                                        setSelectedbokkingId(item.bookingId);
                                        setSelecteduserId(item.userId);
                                        setIsDeleteModalOpen(true);
                                      }}
                                    />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={8} className="p-4 text-center text-gray-500">
                              No borrowing records found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
                    <div className="text-sm text-gray-600">Showing page {currentPage} of data</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={borrowData.length < pageSize}
                        className={`px-4 py-2 rounded ${borrowData.length < pageSize ? "bg-gray-200 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}

              {isUpdateModalOpen && selecteduserId !== null && (
                <UpdateManageUser
                  isOpen={isUpdateModalOpen}
                  onClose={() => {
                    setIsUpdateModalOpen(false);
                    setSelecteduserId(null);
                  }}
                  userId={selecteduserId}
                  bookingId={selectedbookingId}
                  currentStatus={selectedStatus}
                />
              )}

              {isDeleteModalOpen && selecteduserId !== null && (
                <DeleteManageUser
                  isOpen={isDeleteModalOpen}
                  onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelecteduserId(null);
                  }}
                  userId={selecteduserId}
                  bookingId={selectedbookingId}
                  currentStatus={selectedStatus}
                />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
