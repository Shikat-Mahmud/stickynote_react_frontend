import React, { useState } from 'react';
import { X, PaperPlaneTilt } from 'phosphor-react';
import { apiBaseUrl } from '../../config';
import axiosClient from '../../utils/axiosClient';

const CreatePostModal = ({ user, onClose, onPostCreated }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            setError('Please write something before posting.');
            return;
        }

        try {
            setLoading(true);
            await axiosClient.post(`${apiBaseUrl}/posts`, {
                user_id: user.id,
                content,
            });
            setContent('');
            onClose();
            onPostCreated();
        } catch (err) {
            console.error('Error creating post:', err);
            setError('Failed to create post. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    <X size={22} />
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
                    Create New Post
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                        rows="5"
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex justify-center items-center space-x-2 transition duration-200"
                    >
                        <PaperPlaneTilt size={20} weight="fill" />
                        <span>{loading ? 'Posting...' : 'Post'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePostModal;
