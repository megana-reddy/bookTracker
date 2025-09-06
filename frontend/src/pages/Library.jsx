// src/pages/Library.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Library() {
  const [search, setSearch] = useState(""); // Google Books search
  const [results, setResults] = useState([]); // Google Books results
  const navigate = useNavigate();

  // Search books from Google Books API
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${search}`
      );
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error("Google Books fetch error:", err);
    }
  };

  // Add a book from Google search results to My Books
  const handleAddFromGoogle = async (book) => {
    const newBook = {
      title: book.title || "Untitled",
      author: book.authors ? book.authors.join(", ") : "Unknown Author",
      status: "Want to Read", // default status
    };

    try {
      const res = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newBook),
      });

      if (res.ok) {
        alert(`${newBook.title} added to your Books 📚`);
      } else {
        alert("Failed to add ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding book ❌");
    }
  };

  return (
    <div className="p-6">
      {/* Header with navigation */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🔎 Search Google Books</h1>
        <button
          onClick={() => navigate("/mybooks")}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          📖 Go to My Books
        </button>
      </div>

      {/* Google Books Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search books..."
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </form>

      {/* Google Books Results */}
      {results.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Results:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {results.map((item) => {
              const info = item.volumeInfo;
              return (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-xl p-4 border flex flex-col items-center"
                >
                  {/* Book Thumbnail + Title */}
                  {info.imageLinks?.thumbnail ? (
                    <img
                      src={info.imageLinks.thumbnail}
                      alt={info.title || "Book cover"}
                      className="w-32 h-48 object-cover rounded mb-3"
                    />
                  ) : (
                    <div className="w-32 h-48 bg-gray-200 flex items-center justify-center rounded mb-3">
                      📚
                    </div>
                  )}
                  <h2 className="text-lg font-semibold text-center">
                    {info.title || "Untitled"}
                  </h2>

                  {/* Author */}
                  <p className="text-gray-600 text-sm text-center">
                    {info.authors ? info.authors.join(", ") : "Unknown Author"}
                  </p>

                  {info.previewLink && (
                    <a
                      href={info.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-blue-600 hover:underline"
                    >
                      Read Preview →
                    </a>
                  )}

                  {/* Add to My Books Button */}
                  <button
                    onClick={() => handleAddFromGoogle(info)}
                    className="mt-3 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    ➕ Add to My Books
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Library;
