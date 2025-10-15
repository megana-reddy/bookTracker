import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyBooks() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/books", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          alert("Session expired. Please log in again.");
          navigate("/login");
          return;
        }

        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, [navigate]);

  // Update status
  const handleUpdateStatus = async (bookId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:8000/api/books/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updatedBook = await res.json();
        setBooks((prev) =>
          prev.map((b) => (b._id === updatedBook._id ? updatedBook : b))
        );
      } else {
        alert("Failed to update ❌");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete book
  const handleDeleteBook = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        setBooks((prev) => prev.filter((b) => b._id !== bookId));
      } else {
        alert("Failed to delete ❌");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-orange-700 drop-shadow-sm">
          📚 My Bookshelf
        </h1>
        <p className="text-gray-600 mt-1">
          View, update, and manage your reading list
        </p>
      </div>

      {/* Navigation Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => navigate("/library")}
          className="px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-xl shadow hover:scale-105 hover:shadow-lg transition duration-300"
        >
          🔎 Back to Library
        </button>
      </div>

      {/* No Books */}
      {books.length === 0 ? (
        <div className="flex flex-col items-center mt-16">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="Empty shelf"
            className="w-36 h-36 mb-4 opacity-80"
          />
          <p className="text-lg font-semibold text-gray-600">
            No books added yet. Go explore the library!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="relative bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-5 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Delete Button */}
              <button
                onClick={() => handleDeleteBook(book._id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-lg"
              >
                🗑️
              </button>

              {/* Thumbnail or Placeholder */}
              {book.thumbnail ? (
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-28 h-40 object-cover rounded-md shadow mb-3"
                />
              ) : (
                <div className="w-28 h-40 bg-gray-200 flex items-center justify-center rounded-md mb-3 text-2xl text-gray-500">
                  📘
                </div>
              )}

              {/* Title */}
              <h2 className="text-base font-semibold text-center text-gray-800 line-clamp-2">
                {book.title}
              </h2>

              {/* Author */}
              {book.author && (
                <p className="text-sm text-gray-600 text-center mt-1 line-clamp-1">
                  by {book.author}
                </p>
              )}

              {/* Status */}
              <div className="mt-4 text-center">
                <label className="text-sm font-medium text-gray-700">
                  Status:
                </label>
                <select
                  value={book.status}
                  onChange={(e) => handleUpdateStatus(book._id, e.target.value)}
                  className="ml-2 border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="Reading">📖 Reading</option>
                  <option value="Completed">✅ Completed</option>
                  <option value="Want to Read">⭐ Want to Read</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBooks;
