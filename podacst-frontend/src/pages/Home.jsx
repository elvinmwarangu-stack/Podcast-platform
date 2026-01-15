import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { podcastsApi } from "../api/podcasts";
import { categoriesApi } from "../api/categories";
import { favoritesApi } from "../api/favorites";
import { useAuth } from "../context/AuthContext";
import PodcastCard from "../components/PodcastCard";

export default function Home() {
  const { user } = useAuth();
  const [podcasts, setPodcasts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    podcastsApi.getAll().then(setPodcasts).catch(console.error);
    categoriesApi.getAll().then(setCategories).catch(console.error);
    if (user) {
      favoritesApi.getAll().then(setFavorites).catch(console.error);
    }
  }, [user]);

  const filteredPodcasts = selectedCategory
    ? podcasts.filter(p => p.category.id === selectedCategory)
    : podcasts;

  const totalListens = podcasts.reduce((sum, p) => sum + p.listen_count, 0);

  return (
    <div>
      <section className="bg-gradient-to-r from-purple-900 via-purple-700 to-pink-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-4">Welcome to PodWave</h1>
          <p className="text-2xl mb-2">Discover Your Next Favorite Podcast</p>
          <p className="text-lg mb-8 text-purple-100">Stream thousands of podcasts across all genres. Listen, subscribe, and connect with creators worldwide.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
              Get Started Free
            </Link>
            <button onClick={() => document.getElementById('podcasts').scrollIntoView({ behavior: 'smooth' })} className="bg-purple-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-900 transition">
              Browse Podcasts
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-4xl font-bold text-purple-400 mb-2">{podcasts.length}</h3>
              <p className="text-gray-300">Total Podcasts</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-4xl font-bold text-purple-400 mb-2">{categories.length}</h3>
              <p className="text-gray-300">Categories</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-4xl font-bold text-purple-400 mb-2">{totalListens}</h3>
              <p className="text-gray-300">Total Listens</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-4xl font-bold text-purple-400 mb-2">24/7</h3>
              <p className="text-gray-300">Always Available</p>
            </div>
          </div>
        </div>
      </section>

      <section id="podcasts" className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold mb-6 text-white">Explore Podcasts</h2>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded whitespace-nowrap transition ${!selectedCategory ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded whitespace-nowrap transition ${selectedCategory === cat.id ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPodcasts.map(podcast => (
            <PodcastCard
              key={podcast.id}
              podcast={podcast}
              isFavorite={favorites.some(f => f.podcast_id === podcast.id)}
              onFavoriteChange={() => user && favoritesApi.getAll().then(setFavorites)}
            />
          ))}
        </div>
      </section>

      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Why Choose PodWave?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-800 p-8 rounded-lg">
              <div className="text-5xl mb-4">🎧</div>
              <h3 className="text-xl font-bold mb-2 text-white">High Quality Audio</h3>
              <p className="text-gray-400">Crystal clear sound for the best listening experience</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg">
              <div className="text-5xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-2 text-white">Global Content</h3>
              <p className="text-gray-400">Access podcasts from creators around the world</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2 text-white">Community Driven</h3>
              <p className="text-gray-400">Engage with creators and fellow listeners</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
