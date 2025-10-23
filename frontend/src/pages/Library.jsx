// src/pages/Library.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Library() {
  const [search, setSearch] = useState(""); // search input
  const [results, setResults] = useState([]); // results from API
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  // Fetch default books when component mounts
  useEffect(() => {
    const fetchDefaultBooks = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=fiction"
        );
        const data = await res.json();
        setResults(data.items || []);
      } catch (err) {
        console.error("Default fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDefaultBooks();
  }, []);

  // Real-time search
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);

    if (!query) {
      //  Re-fetch default books when cleared
      try {
        setLoading(true);
        const res = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=fiction"
        );
        const data = await res.json();
        setResults(data.items || []);
      } catch (err) {
        console.error("Default fetch error:", err);
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error("Search fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add book to My Books
  const handleAddFromGoogle = async (book) => {
    const newBook = {
      title: book.title || "Untitled",
      author: book.authors ? book.authors.join(", ") : "Unknown Author",
      thumbnail: book.imageLinks?.thumbnail || null,
      status: "Want to Read",
    };

    try {
      const res = await fetch("https://booktracker-q2pv.onrender.com/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newBook),
      });

      if (res.ok) {
        navigate("/my-books");
      } else {
        alert("Failed to add ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding book ❌");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-yellow-50 to-orange-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold text-orange-700 drop-shadow">
          🔎 Search Your Library
        </h1>
        <button
          onClick={() => navigate("/my-books")}
          className="px-5 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-xl shadow hover:scale-105 transition"
        >
          📚 Go to My Books
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full md:w-1/2 mx-auto mb-12">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by title or author..."
          className="w-full px-5 py-3 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {loading && (
          <span className="absolute right-5 top-3 text-orange-500 animate-pulse">
            ⏳
          </span>
        )}
      </div>

      {/* Results */}
      {results.length === 0 && !loading && search && (
        <div className="flex flex-col items-center mt-16">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7486/7486742.png"
            alt="Not found"
            className="w-40 h-40 mb-4"
          />
          <p className="text-lg font-semibold text-gray-600">
            No books found. Try another search 🔎
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {results.map((item) => {
            const info = item.volumeInfo || item;
            return (
              <div
                key={item.id}
                className="bg-white/80 backdrop-blur-md shadow-md rounded-lg p-4 flex flex-col items-center transition transform hover:scale-105 hover:shadow-xl"
              >
                {/* Thumbnail */}
                {info.imageLinks?.thumbnail ? (
                  <img
                    src={info.imageLinks.thumbnail}
                    alt={info.title || "Book cover"}
                    className="w-24 h-36 object-cover rounded-md shadow mb-3"
                  />
                ) : (
                  <div className="w-24 h-36 bg-gray-200 flex items-center justify-center rounded-md mb-3 text-2xl">
                    📘
                  </div>
                )}

                {/* Title */}
                <h2 className="text-sm font-semibold text-center text-gray-800 line-clamp-2">
                  {info.title || "Untitled"}
                </h2>

                {/* Author */}
                <p className="text-xs text-gray-600 text-center mt-1 line-clamp-1">
                  {info.authors ? info.authors.join(", ") : "Unknown Author"}
                </p>

                {/* Preview Link */}
                {info.previewLink && (
                  <a
                    href={info.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-xs text-blue-600 hover:underline"
                  >
                    Preview →
                  </a>
                )}

                {/* Add Button */}
                <button
                  onClick={() => handleAddFromGoogle(info)}
                  className="mt-3 px-3 py-1.5 text-xs bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition"
                >
                  ➕ Add
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Library;
