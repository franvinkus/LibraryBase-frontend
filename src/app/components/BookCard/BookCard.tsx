type BookCardProps = {
  book: {
    title: string;
    author: string;
    image: string;
  };
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow ease-in-out duration-300    w-48 h-64 flex flex-col justify-between hover:scale-105 ">
      {/* Gambar Buku */}
      <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden ">
        {book.image ? <img src={book.image} alt={book.title} className="w-full h-full object-cover rounded-lg" /> : <span className="text-gray-400 text-sm">No Image</span>}
      </div>

      {/* Konten Buku */}
      <div className="flex-grow flex flex-col justify-between">
        <h3 className="text-md font-semibold mt-2 truncate">{book.title}</h3>
        <p className="text-xs text-gray-500">{book.author}</p>
      </div>
    </div>
  );
}
