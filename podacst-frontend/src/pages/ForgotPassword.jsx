import { useState } from "react";
import { Link } from "react-router-dom";
import { authApi } from "../api/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authApi.forgotPassword(email);
      setMessage("If email exists, reset link has been sent. Check console for link.");
    } catch (err) {
      setMessage("Error sending reset link");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        {message && <div className="text-green-600">{message}</div>}
        <p className="text-gray-600">Enter your email to receive a password reset link</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
        <button className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Send Reset Link
        </button>
        <Link to="/login" className="block text-center text-purple-600 hover:underline">
          Back to Login
        </Link>
      </form>
    </div>
  );
}
