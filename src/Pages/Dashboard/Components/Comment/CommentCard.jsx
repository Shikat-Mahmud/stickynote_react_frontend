import React, { useState } from 'react';
import ReplyCard from '../Reply/ReplyCard';
import { useAuth } from '../../../../contexts/AuthContext';
import Reactions from '../../../../components/Reaction/Reactions';
import { apiBaseUrl, apiStorageUrl } from '../../../../config';
import axiosClient from '../../../../utils/axiosClient';
import { timeAgo } from '../../../../components/Utility/TimeAgo';

const generateRandomCommentColor = () => {
    const colors = [
        'bg-blue-100 border-blue-300',
        'bg-green-100 border-green-300',
        'bg-purple-100 border-purple-300',
        'bg-yellow-100 border-yellow-300',
        'bg-red-100 border-red-300',
        'bg-indigo-100 border-indigo-300',
        'bg-pink-100 border-pink-300',
        'bg-teal-100 border-teal-300',
        'bg-orange-100 border-orange-300',
        'bg-fuchsia-100 border-fuchsia-300',
        'bg-lime-100 border-lime-300',
        'bg-cyan-100 border-cyan-300',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

const generateRandomAvater = () => {
    const avaters = [
        'male_avater.png',
        'female_avater.png',
    ];
    return avaters[Math.floor(Math.random() * avaters.length)];
};

function CommentCard({ comment, onCommentUpdate }) {
    const [currentComment, setCurrentComment] = useState(comment);
    const [randomCardAvater] = useState(generateRandomAvater);

    React.useEffect(() => {
        setCurrentComment(comment);
    }, [comment]);

    const [showReplies, setShowReplies] = useState(false);
    const [newReplyContent, setNewReplyContent] = useState('');
    const { user } = useAuth();

    const [randomCardColor] = useState(generateRandomCommentColor);

    const handleReaction = async (reactionType) => {
        if (!user) {
            console.error('Please log in to react.');
            return;
        }
        try {
            const response = await axiosClient.post(`${apiBaseUrl}/comments/${currentComment.id}/react`, { type: reactionType });

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
            await axiosClient.post(`${apiBaseUrl}/comments/${currentComment.id}/replies`, { content: tempReply.content });
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
                <img
                    src={
                        currentComment.user.avatar ? `${apiStorageUrl}/${currentComment.user.avatar}`
                            : `/assets/icons/${currentComment.user?.gender == 'male'
                                ? 'male_avater.png'
                                : (currentComment.user?.gender == 'female'
                                    ? 'female_avater.png'
                                    : randomCardAvater
                                )
                            }`
                    }
                    alt="user"
                    className="text-lg mr-2 max-h-10 h-10 w-10 rounded-full object-cover"
                />
                <div>
                    <h5 className="font-medium text-gray-800">{currentComment.user.name}</h5>
                    <div className="flex items-center">
                        <p className="text-xs text-gray-600">{currentComment.user.uid}</p>
                        <span className="text-xs text-gray-500 ms-2">
                            <i className="ri-time-line pe-0.5"></i>
                            {timeAgo(currentComment.created_at)}
                        </span>
                    </div>
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
                    <i className="ri-reply-line text-xl"></i>
                    <span>{currentComment.replies_count || 0} replies</span>
                </button>
            </div>

            {showReplies && (
                <div className="ml-4 mt-3 border-l border-gray-300 pl-3 space-y-2">
                    {user && (
                        <form onSubmit={handleAddReply} className="mb-3 flex flex-row">
                            <input
                                type="text"
                                className="w-full p-1 border rounded-md focus:outline-none text-xs"
                                placeholder="Write a reply..."
                                value={newReplyContent}
                                onChange={(e) => setNewReplyContent(e.target.value)}
                            />
                            <button type="submit" className="ms-1 bg-gray-700 hover:bg-gray-800 text-white text-xs py-0.5 px-2 rounded">
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
