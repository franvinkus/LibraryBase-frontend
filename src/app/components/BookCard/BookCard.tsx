const BookCard = () => {
  return (
    <div className="w-70 h-80 bg-white p-4 shadow-md rounded-lg">
      <div className="w-full h-50 bg-gray-200  flex items-center justify-center">
        <span className="text-gray-500">Image</span>
      </div>
      <h2 className="font-semibold mt-2 text-black">Title</h2>
      <p className="text-gray-500 text-sm">Author</p>
    </div>
  );
};

export default BookCard;
