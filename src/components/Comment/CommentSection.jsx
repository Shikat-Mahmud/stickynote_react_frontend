import React, { useState, useEffect, useCallback } from 'react';
import CommentCard from './CommentCard';
import { apiBaseUrl } from '../../config';
import { useAuth } from '../../contexts/AuthContext';
import axiosClient from '../../utils/axiosClient';

function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);
    const [newCommentContent, setNewCommentContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    const fetchComments = useCallback(async () => {
        try {
            const response = await axiosClient.get(`${apiBaseUrl}/posts/${postId}/comments`);
            setComments(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch comments.');
            setLoading(false);
            console.error("Error fetching comments:", err);
        }
    }, [postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please log in to comment.');
            return;
        }
        if (!newCommentContent.trim()) return;
        try {
            await axiosClient.post(`${apiBaseUrl}/posts/${postId}/comments`, { content: newCommentContent });
            setNewCommentContent('');
            fetchComments(); // Refresh comments
        } catch (err) {
            console.error("Error adding comment:", err);
            alert('Failed to add comment.');
        }
    };

    if (loading) return <div className="mt-4 text-center text-sm">Loading comments...</div>;
    if (error) return <div className="mt-4 text-center text-sm text-red-500">{error}</div>;

    return (
        <div className="mt-4 border-t border-gray-300 pt-4">
            <h4 className="text-md font-semibold mb-3">Comments ({comments.length})</h4>
            {user && (
                <form onSubmit={handleAddComment} className="mb-4 flex flex-col">
                    <textarea
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows="2"
                        placeholder="Write a comment..."
                        value={newCommentContent}
                        onChange={(e) => setNewCommentContent(e.target.value)}
                    ></textarea>
                    <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded">
                        Add Comment
                    </button>
                </form>
            )}

            <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                {comments.length === 0 ? (
                    <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
                ) : (
                    comments.map(comment => (
                        <CommentCard key={comment.id} comment={comment} postId={postId} onCommentUpdate={fetchComments} />
                    ))
                )}
            </div>
        </div>
    );
}

export default CommentSection;