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
        const res = await fetch("https://booktracker-q2pv.onrender.com/api/books", {
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
      const res = await fetch(`https://booktracker-q2pv.onrender.com/api/books/${bookId}`, {
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
      const res = await fetch(`https://booktracker-q2pv.onrender.com/api/books/${bookId}`, {
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://res.cloudinary.com/dsgytnn2w/video/upload/v1762852003/From_KlickPin_CF_%D0%9F%D0%B8%D0%BD_%D0%BE%D1%82_%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F_sophie_barrera_%D0%BD%D0%B0_%D0%B4%D0%BE%D1%81%D0%BA%D0%B5_Libros_e_historias_%D0%B2_2025_%D0%B3___%D0%A4%D0%BE%D1%82%D0%BE%D0%BA%D0%B0%D0%B1%D0%B8%D0%BD%D0%B0_%D1%80%D0%B0%D0%BC%D0%BA%D0%B8_%D0%9C%D0%B5%D1%82%D0%BE%D0%B4%D0%B8%D0%BA%D0%B8_%D1%84%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F_%D0%9E%D0%B1%D0%BE%D0%B8_%D0%B4%D0%BB%D1%8F_%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C%D0%BD%D1%8B%D1%85_%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%BE%D0%B2_r93h4e.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 min-h-screen p-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg shadow-md border border-black/60 hover:scale-105 hover:shadow-[0_0_18px_rgba(183,136,255,0.9)] transition-all duration-200 font-medium z-30"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-white drop-shadow-sm">📚 My Bookshelf</h1>
          <p className="text-white/80 mt-1">View, update, and manage your reading list</p>
        </div>

        {/* Navigation Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => navigate("/library")}
            className="px-6 py-2 bg-black text-white font-semibold rounded-xl shadow-md border border-black/60 hover:scale-105 hover:shadow-[0_0_20px_rgba(183,136,255,0.9)] transition duration-300"
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
            <p className="text-lg font-semibold text-white">No books added yet. Go explore the library!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-black/30 backdrop-blur-xl rounded-2xl p-4 flex flex-col items-center transition-all transform hover:scale-105 duration-300 border border-white/10 hover:border-[rgba(183,136,255,0.5)] hover:shadow-[0_8px_30px_rgba(183,136,255,0.25)]"
              >
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteBook(book._id)}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-lg"
                >
                  🗑️
                </button>

                {/* Thumbnail or Placeholder */}
                {book.thumbnail ? (
                  <img src={book.thumbnail} alt={book.title} className="w-24 h-36 object-cover rounded-xl mb-4 shadow-lg transition-transform duration-300 hover:scale-105" />
                ) : (
                  <div className="w-24 h-36 bg-white/10 flex items-center justify-center rounded-xl mb-4 text-3xl backdrop-blur-md border border-white/10">
                    📘
                  </div>
                )}

                {/* Title */}
                <h2 className="text-base font-semibold text-center text-white line-clamp-2">{book.title}</h2>

                {/* Author */}
                {book.author && <p className="text-sm text-white/80 text-center mt-1 line-clamp-1">by {book.author}</p>}

                {/* Status */}
                <div className="mt-4 text-center">
                  <label className="text-sm font-medium text-white/80">Status:</label>
                  <select
                    value={book.status}
                    onChange={(e) => handleUpdateStatus(book._id, e.target.value)}
                    className="ml-2 bg-black/20 text-white text-sm rounded-lg px-3 py-1 border border-white/10 focus:outline-none focus:shadow-[0_0_18px_rgba(183,136,255,0.85)] transition-all duration-200"
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
    </div>
  );
}

export default MyBooks;
