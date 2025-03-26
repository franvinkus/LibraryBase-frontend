"use client";
import { User, LogOut, Book, Download, Clock, List } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const SidebarAdmin = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    Swal.fire({
      icon: "success",
      title: "Logout Success",
      text: "You have been logged out successfully.",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      router.push("/page/login");
    });
  };

  return (
    <aside className="w-64 h-screen bg-white shadow-md p-6 mt-20 flex flex-col space-y-10">
      {/* User Profile */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mt-5">
          <User size={40} className="text-gray-600" />
        </div>
        <span className="mt-2 font-semibold text-black">Name</span>
        <button className="flex items-center text-red-500 hover:scale-125 transition ease-in-out duration-300" onClick={handleLogout}>
          <LogOut size={20} className="mr-2 mt-5" />
          <p className="mt-5">Logout</p>
        </button>
      </div>

      <hr className="w-full border-t border-gray-300 my-2" />

      {/* Navigation */}
      <nav className="flex flex-col space-y-4 mt-5 ml-5">
        <div className="flex items-center text-gray-700 hover:text-blue-600 hover:scale-125 cursor-pointer transition ease-in-out duration-300" onClick={() => router.push("/page/admin/category")}>
          <List size={20} className="mr-2" />
          Category
        </div>

        <div className="flex items-center text-gray-700 hover:text-blue-600 hover:scale-125 cursor-pointer transition ease-in-out duration-300" onClick={() => router.push("/page/admin/book")}>
          <Book size={20} className="mr-2" />
          Book List
        </div>

        <div className="flex items-center text-gray-700 hover:text-blue-600 hover:scale-125 cursor-pointer transition ease-in-out duration-300" onClick={() => router.push("/page/admin/manage")}>
          <Book size={20} className="mr-2" />
          Manage
        </div>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
