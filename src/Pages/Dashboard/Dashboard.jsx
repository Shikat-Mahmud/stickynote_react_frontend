import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePostModal from './Components/Post/CreatePost';
import axiosClient from '../../utils/axiosClient';
import { useAuth } from '../../contexts/AuthContext';
import PostCard from './Components/Post/PostCard';
import NewPostButton from './Components/Post/NewPostButton';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    if (loading) return;
    if (!user) {
      navigate('/login');
      return;
    }

    // First load
    fetchPosts(1, true);
  }, [user, loading, navigate]);

  const fetchPosts = async (pageNumber = 1, replace = false) => {
    try {
      const response = await axiosClient.get(`/posts?page=${pageNumber}`);
      const newPosts = response.data.data || [];

      setPosts((prev) => (replace ? newPosts : [...prev, ...newPosts]));
      setHasMore(!!response.data.next_page_url);
      setLoadingPosts(false);
      setIsFetchingMore(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to fetch posts.');
      setLoadingPosts(false);
      setIsFetchingMore(false);
    }
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 200 >=
      document.documentElement.offsetHeight
    ) {
      if (hasMore && !isFetchingMore) {
        setIsFetchingMore(true);
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPosts(nextPage);
      }
    }
  }, [page, hasMore, isFetchingMore]);

  const handlePostRefresh = async (postId) => {
    try {
      const res = await axiosClient.get(`/posts/${postId}`);
      const updatedPost = res.data;
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? updatedPost : p))
      );
    } catch (err) {
      console.error("Failed to refresh post:", err);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handlePostCreated = () => {
    setShowModal(false);
    setPage(1);
    fetchPosts(1, true);
  };

  if (loading || loadingPosts)
    return (
      <div className="text-center min-h-screen flex justify-center items-center font-stretch-expanded">
        Loading notes...
      </div>
    );

  if (error)
    return (
      <div className="text-center min-h-screen flex justify-center items-center font-stretch-expanded text-red-500">
        {error}
      </div>
    );

  return (
    <div className="pb-4 bg-gray-50 min-h-screen relative">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 pt-3 text-center">
        Recent Notes
      </h1>

      <div className="flex justify-center flex-wrap gap-8 items-start">
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-full sm:w-auto flex justify-center px-4"
          >
            <PostCard post={post} onPostUpdate={() => handlePostRefresh(post.id)} />
          </div>
        ))}
      </div>

      {isFetchingMore && (
        <div className="text-center py-4 text-gray-500">
          Loading more notes...
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="text-center py-6 text-gray-400">
          No more notes to load 🎉
        </div>
      )}

      {user && (
        <div className="fixed bottom-5 right-5">
          <NewPostButton onClick={() => setShowModal(true)} />
          {showModal && (
            <CreatePostModal
              user={user}
              onClose={() => setShowModal(false)}
              onPostCreated={handlePostCreated}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;