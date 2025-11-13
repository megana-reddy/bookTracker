import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ state for toggle
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://booktracker-q2pv.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token); // save JWT
        alert("Login successful!");
        navigate("/dashboard"); // go to dashboard
      } else {
        alert(data.message || "Invalid credentials!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div
      className="relative h-screen w-screen bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1650&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 bg-black/30 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-96 border border-white/10">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow-lg">
          📚 BookTracker Login
        </h2>

        <form className="flex flex-col space-y-5" onSubmit={handleLogin}>
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

          {/* Password with toggle */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black bg-black/20 text-white placeholder-white/50 rounded-xl shadow-sm focus:outline-none focus:border-[#c77dff] focus:shadow-[0_0_20px_rgba(183,136,255,0.8)] transition-all duration-300 backdrop-blur-sm pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-white/60 hover:text-white transition-colors"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-black text-white font-semibold rounded-xl shadow-lg border border-black/60 hover:scale-105 hover:shadow-[0_0_20px_rgba(183,136,255,0.9)] transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-white/80 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
