import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PostCard from '../Post/PostCard';
import { AuthContext, apiBaseUrl } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import NewPostButton from '../Post/NewPostButton';
import CreatePostModal from '../Post/CreatePost';

function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchPosts();
    }, [user, navigate]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/posts`);
            setPosts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch posts.');
            setLoading(false);
            console.error("Error fetching posts:", err);
        }
    };

    const [showModal, setShowModal] = useState(false);

    const handleCreatePost = () => setShowModal(true);

    const handlePostCreated = () => {
        console.log('Post created successfully!');
        setShowModal(false);
        fetchPosts();
    };

    if (loading) return <div className="text-center min-h-screen flex justify-center items-center font-stretch-expanded">Loading posts...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <div className="pb-4 bg-gray-50 min-h-screen relative">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 pt-3 text-center">Recent Notes</h1>
            <div className="flex justify-center-safe flex-wrap gap-5 items-start">
                {posts.map(post => (
                    <div key={post.id} className="w-full sm:w-auto flex justify-center px-4">
                        <PostCard post={post} onPostUpdate={() => fetchPosts(apiBaseUrl)} />
                    </div>
                ))}
            </div>
            {user && (
                <div className="fixed bottom-5 right-5">
                    <NewPostButton onClick={handleCreatePost} />
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