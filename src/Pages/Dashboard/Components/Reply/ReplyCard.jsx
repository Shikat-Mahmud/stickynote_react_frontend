import React, { useState } from 'react';
import Reactions from '../../../../components/Reaction/Reactions';
import { apiBaseUrl } from '../../../../config';
import { useAuth } from '../../../../contexts/AuthContext';
import axiosClient from '../../../../utils/axiosClient';
import { timeAgo } from '../../../../components/Utility/TimeAgo';

const generateRandomReplyColor = () => {
    const colors = [
        'bg-gray-100 border-gray-300',
        'bg-cyan-100 border-cyan-300',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

function ReplyCard({ reply, onReplyUpdate }) {
    const { user } = useAuth();
    const [randomCardColor] = useState(generateRandomReplyColor);

    const handleReaction = async (reactionType) => {
        if (!user) {
            console.error('Please log in to react.');
            return;
        }
        try {
            await axiosClient.post(`${apiBaseUrl}/replies/${reply.id}/react`, { type: reactionType });
            onReplyUpdate();
        } catch (error) {
            console.error("Error reacting to reply:", error);
        }
    };

    return (
        <div className={`rounded-md shadow-xs p-3 text-xs border-l-2 ${randomCardColor} overflow-hidden wrap-break-word`}>
            <div className="flex items-center mb-1">
                <img
                    src="/assets/icons/male_avater.png"
                    alt="pin"
                    className="text-base mr-1 max-h-8"
                />
                <div>
                    <h6 className="font-medium text-gray-800">{reply.user.name}</h6>
                    <div className="flex items-center">
                        <p className="text-gray-600" style={{fontSize: '10px'}}>{reply.user.uid}</p>
                        <span className="text-gray-500 ms-2" style={{fontSize: '10px'}}>
                            <i className="ri-time-line pe-0.5"></i>
                            {timeAgo(reply.created_at)}
                        </span>
                    </div>
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
