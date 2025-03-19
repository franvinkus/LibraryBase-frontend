import Navbar from "@/app/components/Navbar/navbar";
import Sidebar from "@/app/components/Sidebar/Sidebar";
// import BookCard from "@/components/BookCard";

export default function Home() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Navbar />

        {/* Recommended Section */}
        <section className="mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Recommended</h2>
            <button className="text-blue-600">See All &gt;</button>
          </div>
          <div className="flex space-x-4 mt-4">
            {/* <BookCard />
            <BookCard />
            <BookCard />
            <BookCard /> */}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Categories</h2>
            <button className="text-blue-600">See All &gt;</button>
          </div>
          <div className="flex space-x-2 mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">All</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Fantasy</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Education</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Drama</button>
          </div>

          <div className="flex space-x-4 mt-4">
            {/* <BookCard />
            <BookCard />
            <BookCard />
            <BookCard /> */}
          </div>
        </section>
      </main>
    </div>
  );
}
