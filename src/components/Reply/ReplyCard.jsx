import React, { useState, useContext } from 'react';
import axios from 'axios';
import { apiBaseUrl, AuthContext } from '../../contexts/AuthContext';
import '../../index.css';
import Reactions from '../Reaction/Reactions';

const generateRandomReplyColor = () => {
    const colors = [
        'bg-gray-100 border-gray-300',
        'bg-cyan-100 border-cyan-300',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

function ReplyCard({ reply, onReplyUpdate }) {
    const { user } = useContext(AuthContext);
    const [randomCardColor] = useState(generateRandomReplyColor);

    const handleReaction = async (reactionType) => {
        if (!user) {
            console.error('Please log in to react.');
            return;
        }
        try {
            await axios.post(`${apiBaseUrl}/replies/${reply.id}/react`, { type: reactionType });
            onReplyUpdate();
        } catch (error) {
            console.error("Error reacting to reply:", error);
        }
    };

    return (
        <div className={`rounded-md shadow-xs p-3 text-xs border-l-2 ${randomCardColor} overflow-hidden wrap-break-word`}>
            <div className="flex items-center mb-1">
                <span className="text-base mr-1">👤</span>
                <div>
                    <h6 className="font-medium text-gray-700">{reply.user.name}</h6>
                    <p className="text-xs text-gray-500">@{reply.user.email.split('@')[0]}</p>
                </div>
            </div>

            <div className="flex">
                <p className="text-gray-600 mb-2 wrap-break-word whitespace-pre-wrap w-full">
                    {reply.content}
                </p>
            </div>

            <div className="flex space-x-2 text-xs text-gray-500">
                <Reactions
                    reactionCounts={reply.reaction_counts}
                    onReact={handleReaction}
                    isAuthenticated={!!user}
                />
            </div>
        </div>
    );
}

export default ReplyCard;
