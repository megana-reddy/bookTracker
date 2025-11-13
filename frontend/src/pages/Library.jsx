// src/pages/Library.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Library() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDefaultBooks = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://www.googleapis.com/books/v1/volumes?q=fiction");
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

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);
    if (!query) {
      const res = await fetch("https://www.googleapis.com/books/v1/volumes?q=fiction");
      const data = await res.json();
      setResults(data.items || []);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error("Search fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFromGoogle = async (book) => {
    const newBook = {
      title: book.title || "Untitled",
      author: book.authors ? book.authors.join(", ") : "Unknown Author",
      thumbnail: book.imageLinks?.thumbnail || null,
      status: "Want to Read",
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
    <div className="min-h-screen relative overflow-hidden">
      <video autoPlay loop muted className="fixed inset-0 w-full h-full object-cover z-0">
        <source
          src="https://res.cloudinary.com/dsgytnn2w/video/upload/v1762850214/From_KlickPin_CF_Magical_Library_in_2025___Library_aesthetic_Ancient_library_Magical_library_cxqmx3.mp4"
          type="video/mp4"
        />
      </video>

      <div className="fixed inset-0 bg-black/50 z-10"></div>

      <div className="relative z-20 min-h-screen p-10">
        
        {/* Back */}
        <button
          onClick={() => navigate("/dashboard")}
          className="absolute top-6 left-6 px-4 py-2 border border-black bg-black text-white rounded-lg shadow-lg hover:shadow-[0_0_12px_#c77dff] transition-all duration-300 font-medium"
        >
          ← Back
        </button>

        <div className="flex justify-between items-center mb-10 mt-6">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            🔎 Search Your Library
          </h1>

          <button
            onClick={() => navigate("/my-books")}
            className="px-6 py-3 border border-black bg-black text-white rounded-xl shadow-lg hover:shadow-[0_0_15px_#c77dff] transition-all duration-300"
          >
            📚 Go to My Books
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-2/3 mx-auto mb-12">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by title or author..."
            className="w-full px-6 py-4 rounded-full border border-black bg-black/20 text-white placeholder-white/70 focus:ring-2 focus:ring-[#c77dff] focus:border-[#c77dff] hover:shadow-[0_0_18px_#c77dff] focus:shadow-[0_0_20px_#c77dff] transition-all duration-200"
          />
          {loading && (
            <span className="absolute right-6 top-4 text-white/70 animate-pulse text-xl">
              ⏳
            </span>
          )}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {results.map((item) => {
              const info = item.volumeInfo || item;
              return (
                <div
                  key={item.id}
                  className="bg-white/10 rounded-xl p-4 flex flex-col items-center border border-white/20 hover:scale-105 hover:shadow-[0_0_18px_#c77dff] transition-all duration-300 backdrop-blur-xl"
                >
                  
                  {info.imageLinks?.thumbnail ? (
                    <img
                      src={info.imageLinks.thumbnail}
                      alt={info.title}
                      className="w-24 h-36 object-cover rounded-lg mb-3"
                    />
                  ) : (
                    <div className="w-24 h-36 bg-white/30 flex items-center justify-center rounded-lg text-3xl">
                      📘
                    </div>
                  )}

                  <h2 className="text-sm font-bold text-center text-white line-clamp-2">
                    {info.title || "Untitled"}
                  </h2>

                  <p className="text-xs text-white/70 text-center mt-1">
                    {info.authors ? info.authors.join(", ") : "Unknown"}
                  </p>

                  <button
                    onClick={() => handleAddFromGoogle(info)}
                    className="mt-3 px-3 py-2 text-xs border border-black bg-black text-white rounded-md hover:shadow-[0_0_12px_#c77dff] transition-all duration-300"
                  >
                    ➕ Add
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Library;
