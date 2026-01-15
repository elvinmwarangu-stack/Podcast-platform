import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-white mb-6">Contact Us</h1>
      <div className="bg-gray-800 rounded-lg p-8">
        {submitted ? (
          <div className="text-center text-green-400">
            <p className="text-xl mb-4">Thank you for contacting us!</p>
            <p className="text-gray-300">We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                rows="6"
                required
              />
            </div>
            <button className="w-full bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
