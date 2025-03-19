import { User, LogOut, Book, Download, Clock, List } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white shadow-md p-6 flex flex-col space-y-6">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <User size={40} className="text-gray-600" />
        </div>
        <span className="mt-2 font-semibold">Name</span>
        <button className="flex items-center text-red-500">
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>
      <nav className="flex flex-col space-y-4">
        <a href="#" className="flex items-center text-gray-700">
          <List size={18} className="mr-2" />
          Category
        </a>
        <a href="#" className="flex items-center text-gray-700">
          <Book size={18} className="mr-2" />
          My Library
        </a>
        <a href="#" className="flex items-center text-gray-700">
          <Download size={18} className="mr-2" />
          Download
        </a>
        <a href="#" className="flex items-center text-gray-700">
          <Clock size={18} className="mr-2" />
          History
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
