import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
          setUser(data);
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
    {/* Navbar */}
    <nav className="flex justify-between items-center px-6 py-4 bg-orange-200 shadow-md w-full">
      <h1 className="text-2xl font-bold text-orange-800">📚 BookTracker</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>

    {/* Welcome Section */}
    <div className="flex flex-col items-center justify-center mt-16 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome back,{" "}
        <span className="text-orange-600">
          {user ? user.username : "Loading..."}
        </span>
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Track your reading journey and manage your library 📖
      </p>

      {/* Quick Actions */}
      <div className="flex gap-6">
        <button onClick={()=> navigate("/add-book")} className="px-6 py-3 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600 transition">
          ➕ Add Book
        </button>
        <button onClick={()=> navigate("/library")} className="px-6 py-3 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition">
          📖 View Library
        </button>
      </div>
    </div>
  </div>
);

}

export default Dashboard;
