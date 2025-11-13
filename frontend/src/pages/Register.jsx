import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

function Register() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://booktracker-q2pv.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful! Please login.");
        navigate("/login"); // redirect to login page
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div
      className="relative h-screen w-screen bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1650&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 bg-black/30 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-96 border border-white/10">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow-lg">
          ✨ Create Your Account
        </h2>

        <form className="flex flex-col space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black bg-black/20 text-white placeholder-white/50 rounded-xl shadow-sm focus:outline-none focus:border-[#c77dff] focus:shadow-[0_0_20px_rgba(183,136,255,0.8)] transition-all duration-300 backdrop-blur-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black bg-black/20 text-white placeholder-white/50 rounded-xl shadow-sm focus:outline-none focus:border-[#c77dff] focus:shadow-[0_0_20px_rgba(183,136,255,0.8)] transition-all duration-300 backdrop-blur-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black bg-black/20 text-white placeholder-white/50 rounded-xl shadow-sm focus:outline-none focus:border-[#c77dff] focus:shadow-[0_0_20px_rgba(183,136,255,0.8)] transition-all duration-300 backdrop-blur-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-black text-white font-semibold rounded-xl shadow-lg border border-black/60 hover:scale-105 hover:shadow-[0_0_20px_rgba(183,136,255,0.9)] transition-all duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-white/80 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
