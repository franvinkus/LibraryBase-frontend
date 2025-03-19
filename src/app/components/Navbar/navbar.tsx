import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-white shadow-md px-6 py-4">
      <h1 className="text-2xl font-bold text-blue-600">
        Library<span className="text-black">Base</span>
      </h1>
      <div className="relative w-1/3">
        <input type="text" placeholder="Search your favourite books" className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none" />
        <Search className="absolute top-2 left-2 text-gray-500" size={20} />
      </div>
    </nav>
  );
};

export default Navbar;
