import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { podcastsApi } from "../api/podcasts";
import { commentsApi } from "../api/comments";
import { favoritesApi } from "../api/favorites";
import { useAuth } from "../context/AuthContext";

export default function PodcastDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [podcast, setPodcast] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    podcastsApi.getById(id).then(setPodcast).catch(console.error);
    commentsApi.getByPodcast(id).then(setComments).catch(console.error);
    if (user) {
      favoritesApi.getAll().then(favs => {
        setIsFavorite(favs.some(f => f.podcast_id === parseInt(id)));
      }).catch(console.error);
    }
  }, [id, user]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await commentsApi.create({ podcast_id: parseInt(id), content: newComment });
      setNewComment("");
      const updated = await commentsApi.getByPodcast(id);
      setComments(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await favoritesApi.remove(id);
      } else {
        await favoritesApi.add(id);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error(err);
    }
  };

  if (!podcast) return <div className="container mx-auto px-4 py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        {podcast.cover_image_url && (
          <img src={podcast.cover_image_url} alt={podcast.title} className="w-full h-64 object-cover rounded mb-6" />
        )}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-sm text-purple-600 font-semibold">{podcast.category.name}</span>
            <h1 className="text-4xl font-bold mb-2">{podcast.title}</h1>
            <p className="text-gray-600 mb-4">{podcast.description}</p>
          </div>
          {user && (
            <button onClick={toggleFavorite} className="text-2xl">
              {isFavorite ? '❤️' : '🤍'}
            </button>
          )}
        </div>
        <audio controls className="w-full mb-4">
          <source src={podcast.audio_url} type="audio/mpeg" />
        </audio>
        <div className="text-sm text-gray-600">
          <span>👥 {podcast.listen_count} listens</span>
          {podcast.duration_seconds && <span className="ml-4">⏱️ {Math.floor(podcast.duration_seconds / 60)} minutes</span>}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {user && (
          <form onSubmit={handleAddComment} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full border rounded p-3 mb-2"
              rows="3"
            />
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Post Comment
            </button>
          </form>
        )}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="border-b pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{comment.user?.username || 'Anonymous'}</p>
                    <p className="text-gray-800 mt-1">{comment.content}</p>
                    <p className="text-sm text-gray-500 mt-2">{new Date(comment.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
