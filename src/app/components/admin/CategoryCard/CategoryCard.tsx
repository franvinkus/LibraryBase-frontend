import { Pencil, Trash2, Plus } from "lucide-react";

export default function CategoryCard() {
  // Data dummy kategori
  const categories = [
    { id: 1, name: "Romance", created_at: "2025-03-20", updated_at: "2025-03-20", created_by: 1, updated_by: "NULL" },
    { id: 2, name: "Horror", created_at: "2025-03-18", updated_at: "2025-03-19", created_by: 2, updated_by: 3 },
    { id: 3, name: "Fantasy", created_at: "2025-03-15", updated_at: "2025-03-18", created_by: 1, updated_by: 2 },
    { id: 4, name: "Science Fiction", created_at: "2025-03-10", updated_at: "2025-03-15", created_by: 3, updated_by: 4 },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-black ">Categories</h2>
        <button className="bg-[#D9D9D9] p-2 rounded-lg hover:text-white hover:bg-blue-700 hover:scale-110">
          <Plus size={20} />
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full border-collapse rounded-lg">
          {/* Header */}
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

          {/* Body */}
          <tbody className="rounded-b-lg">
            {categories.map((category, index) => (
              <tr key={index} className="text-center border-b last:rounded-b-lg text-black ">
                <td className="p-3">{category.id}</td>
                <td className="p-3">{category.name}</td>
                <td className="p-3">{category.created_at}</td>
                <td className="p-3">{category.updated_at}</td>
                <td className="p-3">{category.created_by}</td>
                <td className="p-3">{category.updated_by}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
