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
      const res = await fetch("https://booktracker-q2pv.onrender.com/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // secure
        },
        body: JSON.stringify(newBook),
      });

      if (res.ok) {
        alert("Book added successfully! 📚");
        navigate("/my-books"); // redirect to myBooks after adding
      } else {
        alert("Failed to add book ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding book ❌");
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
          src="https://res.cloudinary.com/dsgytnn2w/video/upload/v1762852552/From_KlickPin_CF_Writing_Rituals_of_Famous_Authors_and_What_You_Can_Learn_in_2025___Famous_authors_Logo_design_video_Books_to_read_vsivrl.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col justify-center items-center p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg shadow-md border border-black/60 hover:scale-105 hover:shadow-[0_0_18px_rgba(183,136,255,0.9)] transition-all duration-200 font-medium z-30"
        >
          ← Back
        </button>

        {/* Form Container */}
        <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-white/10 hover:border-white/20 transition-all">
          <h2 className="text-3xl font-bold text-center text-white drop-shadow-lg mb-8">
            ➕ Add a New Book
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Book Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter book title"
                className="w-full px-4 py-3 bg-black/20 text-white placeholder-white/50 border-2 border-black rounded-xl focus:outline-none focus:border-[#c77dff] focus:shadow-[0_0_20px_rgba(183,136,255,0.8)] transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Author Field */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                placeholder="Enter author's name"
                className="w-full px-4 py-3 bg-black/20 text-white placeholder-white/50 border-2 border-black rounded-xl focus:outline-none focus:border-[#c77dff] focus:shadow-[0_0_20px_rgba(183,136,255,0.8)] transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 bg-black/20 text-white border-2 border-black rounded-xl focus:outline-none focus:border-[#c77dff] focus:shadow-[0_0_20px_rgba(183,136,255,0.8)] transition-all duration-300 backdrop-blur-sm"
              >
                <option value="Reading">📖 Reading</option>
                <option value="Completed">✅ Completed</option>
                <option value="Want to Read">⭐ Want to Read</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 px-4 py-3 bg-black text-white rounded-lg border border-black/60 shadow-md hover:scale-105 hover:shadow-[0_0_15px_rgba(183,136,255,0.7)] transition-all duration-300 font-semibold"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-black text-white rounded-lg border border-black/60 shadow-md hover:scale-105 hover:shadow-[0_0_15px_rgba(183,136,255,0.7)] transition-all duration-300 font-semibold"
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
