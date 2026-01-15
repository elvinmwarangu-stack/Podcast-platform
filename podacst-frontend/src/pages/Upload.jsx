import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { podcastsApi } from "../api/podcasts";
import { categoriesApi } from "../api/categories";
import { useAuth } from "../context/AuthContext";

const SUGGESTED_CATEGORIES = [
  "Technology", "Business", "Education", "Comedy", "News & Politics",
  "Health & Fitness", "True Crime", "Sports", "Music", "Science",
  "History", "Arts & Culture", "Self-Improvement", "Gaming", "Food & Cooking",
  "Travel", "Religion & Spirituality", "Parenting", "Fiction", "Society & Culture"
];

export default function Upload() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    audio_url: "",
    cover_image_url: "",
    category_id: "",
    duration_seconds: "",
  });
  const [newCategory, setNewCategory] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    categoriesApi.getAll().then(setCategories).catch(console.error);
  }, [user, navigate]);

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const category = await categoriesApi.create({ name: newCategory, description: "" });
      setCategories([...categories, category]);
      setFormData({...formData, category_id: category.id});
      setNewCategory("");
      setShowCategoryInput(false);
    } catch (err) {
      setError("Error creating category");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: formData.title,
        description: formData.description || null,
        audio_url: formData.audio_url,
        cover_image_url: formData.cover_image_url || null,
        category_id: parseInt(formData.category_id),
        duration_seconds: formData.duration_seconds ? parseInt(formData.duration_seconds) : null,
      };
      console.log('Sending podcast data:', data);
      const podcast = await podcastsApi.create(data);
      navigate(`/podcast/${podcast.id}`);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-white">Upload Podcast</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-lg p-8 space-y-4">
        {error && <div className="text-red-400">{error}</div>}
        
        <div>
          <label className="block text-gray-300 mb-2">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            rows="4"
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Audio URL *</label>
          <input
            type="url"
            value={formData.audio_url}
            onChange={(e) => setFormData({...formData, audio_url: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Cover Image URL</label>
          <input
            type="url"
            value={formData.cover_image_url}
            onChange={(e) => setFormData({...formData, cover_image_url: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Category *</label>
          {showCategoryInput ? (
            <div className="space-y-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                list="category-suggestions"
              />
              <datalist id="category-suggestions">
                {SUGGESTED_CATEGORIES.map(cat => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowCategoryInput(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowCategoryInput(true)}
                className="text-purple-400 hover:underline text-sm"
              >
                + Create new category
              </button>
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Duration (seconds)</label>
          <input
            type="number"
            value={formData.duration_seconds}
            onChange={(e) => setFormData({...formData, duration_seconds: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
          />
        </div>
        
        <button className="w-full bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 font-semibold">
          Upload Podcast
        </button>
      </form>
    </div>
  );
}
