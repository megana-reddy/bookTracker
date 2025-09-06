import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Reading");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = { title, author, status };

    try {
      const res = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // secure
        },
        body: JSON.stringify(newBook),
      });

      if (res.ok) {
        alert("Book added successfully! 📚");
        navigate("/library"); // redirect to library after adding
      } else {
        alert("Failed to add book ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding book ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[400px]">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          ➕ Add a New Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Book Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter book title"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter author's name"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="Reading">📖 Reading</option>
              <option value="Completed">✅ Completed</option>
              <option value="Want to Read">⭐ Want to Read</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
