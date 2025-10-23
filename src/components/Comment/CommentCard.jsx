import React, { useState, useContext } from 'react';
import axios from 'axios';
import ReplyCard from '../Reply/ReplyCard';
import { AuthContext } from '../../contexts/AuthContext';
import '../../index.css';
import Reactions from '../Reaction/Reactions';

const API_BASE_URL = 'http://localhost:8000/api';

const generateRandomCommentColor = () => {
    const colors = [
        'bg-teal-100 border-teal-300',
        'bg-orange-100 border-orange-300',
        'bg-fuchsia-100 border-fuchsia-300',
        'bg-lime-100 border-lime-300',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

function CommentCard({ comment, onCommentUpdate }) {
    const [currentComment, setCurrentComment] = useState(comment);
    
    React.useEffect(() => {
        setCurrentComment(comment);
    }, [comment]);

    const [showReplies, setShowReplies] = useState(false);
    const [newReplyContent, setNewReplyContent] = useState('');
    const { user } = useContext(AuthContext);

    const [randomCardColor] = useState(generateRandomCommentColor);

    const handleReaction = async (reactionType) => {
        if (!user) {
            console.error('Please log in to react.');
            return;
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/comments/${currentComment.id}/react`, { type: reactionType });
            
            const updatedCounts = response.data.reaction_counts || currentComment.reaction_counts;

            setCurrentComment(prevComment => ({
                ...prevComment,
                reaction_counts: updatedCounts
            }));
            
            onCommentUpdate(); 

        } catch (error) {
            console.error("Error reacting to comment:", error);
        }
    };

    const handleAddReply = async (e) => {
        e.preventDefault();
        if (!user) {
            console.error('Please log in to reply.');
            return;
        }
        if (!newReplyContent.trim()) return;

        const tempReply = {
            id: 'temp-' + Date.now(), 
            content: newReplyContent,
            user: { name: user.name, email: user.email },
            reaction_counts: {},
        };

        setCurrentComment(prevComment => ({
            ...prevComment,
            replies: [...(prevComment.replies || []), tempReply],
            replies_count: (prevComment.replies_count || 0) + 1,
        }));
        setNewReplyContent('');
        setShowReplies(true);

        try {
            await axios.post(`${API_BASE_URL}/comments/${currentComment.id}/replies`, { content: tempReply.content });
            onCommentUpdate(); 
        } catch (err) {
            console.error("Error adding reply:", err);
            console.error('Failed to add reply.');
            
            setCurrentComment(prevComment => ({
                ...prevComment,
                replies: prevComment.replies.filter(r => r.id !== tempReply.id),
                replies_count: (prevComment.replies_count || 1) - 1,
            }));
        }
    };

    return (
        <div className={`rounded-lg shadow-sm p-4 text-sm border-l-4 ${randomCardColor}`}>
            <div className="flex items-center mb-2">
                <span className="text-lg mr-2">👤</span>
                <div>
                    <h5 className="font-medium text-gray-800">{currentComment.user.name}</h5>
                    <p className="text-xs text-gray-500">@{currentComment.user.email.split('@')[0]}</p>
                </div>
            </div>

            <div className="flex">
                <p className="text-gray-700 mb-3 wrap-break-word whitespace-pre-wrap w-full">
                    {currentComment.content}
                </p>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-600 mb-3">
                <div className="flex space-x-2">
                    <Reactions
                        reactionCounts={currentComment.reaction_counts}
                        onReact={handleReaction}
                        isAuthenticated={!!user}
                    />
                </div>
                <button onClick={() => setShowReplies(!showReplies)} className="flex items-center space-x-1 hover:text-gray-800">
                    <span>↩️</span>
                    <span>{currentComment.replies_count || 0} replies</span>
                </button>
            </div>

            {showReplies && (
                <div className="ml-4 mt-3 border-l border-gray-300 pl-3 space-y-2">
                    {user && (
                        <form onSubmit={handleAddReply} className="mb-3 flex flex-row">
                            <input
                                type="text"
                                className="w-full p-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 text-xs"
                                placeholder="Write a reply..."
                                value={newReplyContent}
                                onChange={(e) => setNewReplyContent(e.target.value)}
                            />
                            <button type="submit" className="ms-1 bg-indigo-500 hover:bg-indigo-600 text-white text-xs py-0.5 px-2 rounded">
                                Reply
                            </button>
                        </form>
                    )}
                    {currentComment.replies && currentComment.replies.length > 0 ? (
                        currentComment.replies.map(reply => (
                            <ReplyCard key={reply.id} reply={reply} onReplyUpdate={onCommentUpdate} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-xs">No replies yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default CommentCard;
