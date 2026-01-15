import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 shadow-lg px-6 py-4 flex justify-between items-center border-b border-gray-700">
      <Link to="/" className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition">
        🎧 PodWave
      </Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/upload" className="text-gray-300 hover:text-purple-400 transition">Upload</Link>
            <Link to="/favorites" className="text-gray-300 hover:text-purple-400 transition">Favorites</Link>
            <Link to="/profile" className="text-gray-300 hover:text-purple-400 transition">Profile</Link>
            <button onClick={logout} className="text-gray-300 hover:text-purple-400 transition">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-300 hover:text-purple-400 transition">Login</Link>
            <Link to="/register" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
