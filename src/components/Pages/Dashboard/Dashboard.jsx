import React, { useState, useEffect } from 'react';
import PostCard from '../../Post/PostCard';
import { useNavigate } from 'react-router-dom';
import NewPostButton from '../../Post/NewPostButton';
import CreatePostModal from '../../Post/CreatePost';
import axiosClient from '../../../utils/axiosClient';
import { setPageTitle } from '../../../utils/setPageTitle';
import { useAuth } from '../../../contexts/AuthContext';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('Dashboard');

    if (loading) return;
    if (!user) {
      navigate('/login');
      return;
    }
    fetchPosts();
  }, [user, loading, navigate]);

  const fetchPosts = async () => {
    try {
      const response = await axiosClient.get('/posts');
      setPosts(response.data);
      setLoadingPosts(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to fetch posts.');
      setLoadingPosts(false);
    }
  };

  const handlePostCreated = () => {
    console.log('Post created successfully!');
    setShowModal(false);
    fetchPosts();
  };

  if (loading || loadingPosts)
    return <div className="text-center min-h-screen flex justify-center items-center font-stretch-expanded">Loading notes...</div>;

  if (error)
    return <div className="text-center min-h-screen flex justify-center items-center font-stretch-expanded text-red-500">{error}</div>;

  return (
    <div className="pb-4 bg-gray-50 min-h-screen relative">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 pt-3 text-center">Recent Notes</h1>
      <div className="flex justify-center flex-wrap gap-8 items-start">
        {posts.map((post) => (
          <div key={post.id} className="w-full sm:w-auto flex justify-center px-4">
            <PostCard post={post} onPostUpdate={fetchPosts} />
          </div>
        ))}
      </div>
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