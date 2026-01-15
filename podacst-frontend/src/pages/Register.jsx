import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", full_name: "" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-600 mb-2">PodWave</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">Sign Up</h2>
            <p className="text-gray-600">Join millions of listeners worldwide</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-600">{error}</div>}
            <input
              type="text"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none transition-colors"
            />
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none transition-colors"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none transition-colors"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none transition-colors"
              required
            />
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all mt-6">
              Sign Up
            </button>
          </form>
          
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-purple-600 font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
