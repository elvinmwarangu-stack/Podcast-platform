import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { favoritesApi } from "../api/favorites";
import { useAuth } from "../context/AuthContext";
import PodcastCard from "../components/PodcastCard";

export default function Favorites() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadFavorites();
  }, [user, navigate]);

  const loadFavorites = () => {
    favoritesApi.getAll()
      .then(setFavorites)
      .catch(console.error);
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-white">❤️ My Favorites</h1>
      {favorites.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <p className="text-2xl mb-2">🤍</p>
          <p className="text-gray-400 mb-4">No favorites yet</p>
          <Link to="/" className="text-purple-400 hover:text-purple-300 underline">Browse podcasts</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(podcast => (
            <PodcastCard
              key={podcast.id}
              podcast={podcast}
              isFavorite={true}
              onFavoriteChange={loadFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
}
