import { X } from "lucide-react";
import { Bookmark, Download, BookOpen } from "lucide-react";
type BookPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  book: {
    title: string;
    author: string;
    description: string;
    image: string;
  };
};

export default function BookPopup({ isOpen, onClose, book }: BookPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
          {book.image ? <img src={book.image} alt={book.title} className="w-full h-full object-cover rounded-lg" /> : <span className="text-gray-400">No Image</span>}
        </div>

        <h2 className="text-xl font-bold mt-4">{book.title}</h2>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-sm text-gray-500 mt-2">{book.description}</p>

        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-3">
            <Bookmark className="text-black cursor-pointer hover:text-blue-600 hover:scale-125  transision ease-in-out duration-300" size={20} onClick={() => alert("Fitur Belum Tersedia  ")} />
            <Download className="text-black cursor-pointer hover:text-blue-600 hover:scale-125  transision ease-in-out duration-300" size={20} onClick={() => alert("Fitur Belum Tersedia  ")} />
          </div>
          <button className=" bg-[#E4F0FE]  text-black px-4 py-1 rounded-full hover:bg-blue-700 hover:text-white hover:scale-125  transision ease-in-out duration-300">Borrow</button>
        </div>
      </div>
    </div>
  );
}
