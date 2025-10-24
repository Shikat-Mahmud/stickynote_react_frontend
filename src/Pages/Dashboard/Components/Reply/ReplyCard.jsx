import React, { useState } from 'react';
import Reactions from '../../../../components/Reaction/Reactions';
import { apiBaseUrl, apiStorageUrl } from '../../../../config';
import { useAuth } from '../../../../contexts/AuthContext';
import axiosClient from '../../../../utils/axiosClient';
import { timeAgo } from '../../../../components/Utility/TimeAgo';

const generateRandomReplyColor = () => {
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

function ReplyCard({ reply, onReplyUpdate }) {
    const { user } = useAuth();
    const [randomCardColor] = useState(generateRandomReplyColor);
    const [randomCardAvater] = useState(generateRandomAvater);


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
                    src={
                        reply.user.avater ? `${apiStorageUrl}/${reply.user.avater}`
                            : `/assets/icons/${reply.user?.gender == 'male'
                                ? 'male_avater.png'
                                : (reply.user?.gender == 'female'
                                    ? 'female_avater.png'
                                    : randomCardAvater
                                )
                            }`
                    }
                    alt="user"
                    className="text-base mr-1 max-h-8 h-8 w-8 rounded-full object-cover"
                />
                <div>
                    <h6 className="font-medium text-gray-800">{reply.user.name}</h6>
                    <div className="flex items-center">
                        <p className="text-gray-600" style={{ fontSize: '10px' }}>{reply.user.uid}</p>
                        <span className="text-gray-500 ms-2" style={{ fontSize: '10px' }}>
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
