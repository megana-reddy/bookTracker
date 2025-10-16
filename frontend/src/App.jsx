import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import AddBook from "./pages/AddBook";
import Library from "./pages/Library";
import MyBooks from "./pages/MyBooks";
import './App.css'

function App() {
  return (
  <BrowserRouter>
      <Routes>
        {/* Default route → Register page */}
        <Route path="/" element={<Register />} />

        {/* Register route */}
        <Route path="/register" element={<Register />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard route */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/library" element={<Library />} />
        <Route path="/my-books" element={<MyBooks />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
