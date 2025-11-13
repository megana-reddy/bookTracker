import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loginCount, setLoginCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("https://booktracker-q2pv.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data);

        // Track login count in localStorage
        let count = parseInt(localStorage.getItem("loginCount") || "0", 10);
        count += 1;
        localStorage.setItem("loginCount", count);
        setLoginCount(count);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginCount"); // reset count on logout
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Semi-transparent gradient overlay */}
      <div className="min-h-screen w-full bg-gradient-to-b from-black/40 via-black/30 to-black/60">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-10 py-4 
  bg-black/30 backdrop-blur-md 
  border-b border-white/10
  shadow-lg sticky top-0 z-50">
  
  {/* Logo / Brand */}
  <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
    📚 BookTracker
  </h1>

  {/* Right-side Menu */}
  <div className="flex items-center gap-8 text-white font-medium text-lg">
    <button
      onClick={() => navigate("/library")}
      className="flex items-center gap-2 hover:scale-110 hover:shadow-[0_0_12px_#c77dff] transition-transform duration-300"
    >
      📖 <span>Library</span>
    </button>

    <button
      onClick={() => navigate("/my-books")}
      className="flex items-center gap-2 hover:scale-110 hover:shadow-[0_0_12px_#c77dff] transition-transform duration-300"
    >
      📚 <span>My Books</span>
    </button>

    <button
      onClick={handleLogout}
      className="flex items-center gap-2 hover:scale-110 hover:shadow-[0_0_12px_#c77dff] transition-transform duration-300"
    >
      🚪 <span>Logout</span>
    </button>
  </div>
</nav>


        {/* Welcome Section */}
        <div className="flex flex-col items-center justify-center mt-16 px-4 text-center">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-2">
            Welcome back,{" "}
            <span className="text-purple-400">
              {user ? user.username : "Loading..."}
            </span>
          </h1>
          <p className="text-white/80 text-lg mb-8">
            Track your reading journey and manage your library 📖
          </p>

          {/* Quick Actions */}
          <div className="flex gap-6 mb-12">
            <button
              onClick={() => navigate("/add-book")}
              className="px-6 py-3 bg-black text-white rounded-xl shadow-lg border border-black/60 hover:scale-105 hover:shadow-[0_0_18px_rgba(183,136,255,0.9)] transition-all duration-300 font-semibold"
            >
              ➕ Add Book
            </button>
            <button
              onClick={() => navigate("/library")}
              className="px-6 py-3 bg-black text-white rounded-xl shadow-lg border border-black/60 hover:scale-105 hover:shadow-[0_0_18px_rgba(183,136,255,0.9)] transition-all duration-300 font-semibold"
            >
              📖 View Library
            </button>
          </div>

          {/* Recommended Books */}
{loginCount > 1 && (
  <div className="w-11/12 md:w-3/4 lg:w-2/3 mt-12">
    <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
      📌 Recommended Books for You
    </h2>

    <div className="flex flex-col gap-5">
      {/* Book 1 */}
      <div className="flex items-center gap-4 px-6 py-4 bg-black/30 backdrop-blur-md border border-white/10 hover:border-[rgba(183,136,255,0.5)] rounded-lg text-white transition transform hover:scale-105 hover:shadow-[0_8px_30px_rgba(183,136,255,0.25)]">
        <img
          src="https://m.media-amazon.com/images/I/91bYsX41DVL.jpg"
          alt="Atomic Habits"
          className="w-14 h-20 object-cover rounded-md shadow-md"
        />
        <div className="flex justify-between items-center w-full">
          <span className="font-semibold text-lg">Atomic Habits</span>
          <span className="text-purple-400">⭐ 4.8</span>
        </div>
      </div>

      {/* Book 2 */}
      <div className="flex items-center gap-4 px-6 py-4 bg-black/30 backdrop-blur-md border border-white/10 hover:border-[rgba(183,136,255,0.5)] rounded-lg text-white transition transform hover:scale-105 hover:shadow-[0_8px_30px_rgba(183,136,255,0.25)]">
        <img
          src="https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg"
          alt="The Alchemist"
          className="w-14 h-20 object-cover rounded-md shadow-md"
        />
        <div className="flex justify-between items-center w-full">
          <span className="font-semibold text-lg">The Alchemist</span>
          <span className="text-purple-400">⭐ 4.7</span>
        </div>
      </div>

      {/* Book 3 */}
      <div className="flex items-center gap-4 px-6 py-4 bg-black/30 backdrop-blur-md border border-white/10 hover:border-[rgba(183,136,255,0.5)] rounded-lg text-white transition transform hover:scale-105 hover:shadow-[0_8px_30px_rgba(183,136,255,0.25)]">
        <img
          src="https://m.media-amazon.com/images/I/81JG3b5G-5L.jpg"
          alt="Deep Work"
          className="w-14 h-20 object-cover rounded-md shadow-md"
        />
        <div className="flex justify-between items-center w-full">
          <span className="font-semibold text-lg">Deep Work</span>
          <span className="text-purple-400">⭐ 4.6</span>
        </div>
      </div>

      {/* Book 4 */}
      <div className="flex items-center gap-4 px-6 py-4 bg-black/30 backdrop-blur-md border border-white/10 hover:border-[rgba(183,136,255,0.5)] rounded-lg text-white transition transform hover:scale-105 hover:shadow-[0_8px_30px_rgba(183,136,255,0.25)]">
        <img
          src="https://m.media-amazon.com/images/I/71QKQ9mwV7L.jpg"
          alt="The Subtle Art"
          className="w-14 h-20 object-cover rounded-md shadow-md"
        />
        <div className="flex justify-between items-center w-full">
          <span className="font-semibold text-lg">
            The Subtle Art of Not Giving a F*ck
          </span>
          <span className="text-purple-400">⭐ 4.5</span>
        </div>
      </div>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
