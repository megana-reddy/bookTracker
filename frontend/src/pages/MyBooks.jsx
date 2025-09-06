// src/pages/MyBooks.jsx
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 My Books</h1>
      {books.length === 0 ? (
        <p className="text-gray-600">No books added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-md rounded-xl p-4 border"
            >
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-gray-600">by {book.author}</p>

              {/* Status Dropdown */}
              <div className="mt-2">
                <label className="text-sm font-medium">Status:</label>
                <select
                  value={book.status}
                  onChange={(e) => handleUpdateStatus(book._id, e.target.value)}
                  className="ml-2 border rounded px-2 py-1"
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
