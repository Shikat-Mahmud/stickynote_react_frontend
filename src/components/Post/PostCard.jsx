import React, { useState, useContext } from 'react';
import axios from 'axios';
import CommentSection from '../Comment/CommentSection';
import { AuthContext, apiBaseUrl } from '../../contexts/AuthContext';
import Reactions from '../Reaction/Reactions';

const generateRandomColor = () => {
    const colors = [
        'bg-blue-200 border-blue-400',
        'bg-green-200 border-green-400',
        'bg-purple-200 border-purple-400',
        'bg-yellow-200 border-yellow-400',
        'bg-red-200 border-red-400',
        'bg-indigo-200 border-indigo-400',
        'bg-pink-200 border-pink-400',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

function PostCard({ post, onPostUpdate }) {
    const [showComments, setShowComments] = useState(false);
    const { user } = useContext(AuthContext);

    const [randomCardColor] = useState(generateRandomColor);

    const handleReaction = async (reactionType) => {
        if (!user) {
            alert('Please log in to react.');
            return;
        }
        try {
            await axios.post(`${apiBaseUrl}/posts/${post.id}/react`, { type: reactionType });
            onPostUpdate();
        } catch (error) {
            console.error("Error reacting to post:", error);
        }
    };

    return (
        <div className={`rounded-lg shadow-md p-6 w-96 max-w-full sm:max-w-sm border-t-4 ${randomCardColor} overflow-hidden wrap-break-word`}>
            <div className="flex flex-row items-center justify-between mb-4">
                <div className="flex items-center">
                    <span className="text-3xl mr-3">👤</span>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{post.user.name}</h3>
                        <p className="text-sm text-gray-600">@{post.user.email.split('@')[0]}</p>
                    </div>
                </div>
                <div>
                    <img src="/public/assets/icons/alpin.svg" alt="pin" style={{height: '40px', marginTop: '-20px'}} />
                </div>
            </div>

            <div className="flex">
                <p className="text-gray-700 mb-4 wrap-break-word whitespace-pre-wrap w-full">
                    {post.content}
                </p>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <div className="flex space-x-2">
                    <Reactions
                        reactionCounts={post.reaction_counts}
                        onReact={handleReaction}
                        isAuthenticated={!!user}
                    />
                </div>
                <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-1 hover:text-gray-800">
                    <span>💬</span>
                    <span>{post.comments_count || 0} comments</span>
                </button>
            </div>
            {showComments && <CommentSection postId={post.id} />}
        </div>
    );
}

export default PostCard;