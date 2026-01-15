import { useState } from 'react';
import { Link } from 'react-router-dom';
import { favoritesApi } from '../api/favorites';
import { useAuth } from '../context/AuthContext';

export default function PodcastCard({ podcast, isFavorite: initialFavorite, onFavoriteChange }) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      if (isFavorite) {
        await favoritesApi.remove(podcast.id);
      } else {
        await favoritesApi.add(podcast.id);
      }
      setIsFavorite(!isFavorite);
      if (onFavoriteChange) onFavoriteChange();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Link to={`/podcast/${podcast.id}`} className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      {podcast.cover_image_url && (
        <img src={podcast.cover_image_url} alt={podcast.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs text-purple-600 font-semibold">{podcast.category?.name}</span>
          {user && (
            <button onClick={toggleFavorite} className="text-xl hover:scale-110 transition-transform">
              {isFavorite ? '❤️' : '🤍'}
            </button>
          )}
        </div>
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{podcast.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{podcast.description}</p>
        <div className="flex justify-between text-xs text-gray-500">
          <span>👥 {podcast.listen_count} listens</span>
          {podcast.duration_seconds && <span>⏱️ {Math.floor(podcast.duration_seconds / 60)}m</span>}
        </div>
      </div>
    </Link>
  );
}
