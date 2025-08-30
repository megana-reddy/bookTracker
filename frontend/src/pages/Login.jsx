import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="relative h-screen w-screen bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1650&q=80')",
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-black/20 backdrop-blur-md shadow-xl rounded-2xl p-8 w-96">
        <h2 className="text-3xl font-bold font-serif text-center text-white mb-6">
          📚 BookTracker Login
        </h2>

        <form className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-500 bg-transparent text-white placeholder-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-500 bg-transparent text-white placeholder-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-white hover:text-blue-800 text-white font-semibold rounded-lg shadow-md transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
