import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">
        Welcome {user ? user.username : "Guest"}! 👋
      </h2>
      <h3 className="text-xl font-semibold mb-4">📚 My Book Tracker</h3>

      {books.length === 0 ? (
        <p>No books found. Add some!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onClick={() => navigate(`/books/${book._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
