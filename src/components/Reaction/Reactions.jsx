import React from 'react';

const REACTION_TYPES = [
    { type: 'like', emoji: '👍', color: 'hover:text-blue-600' },
    { type: 'love', emoji: '❤️', color: 'hover:text-red-600' },
    { type: 'haha', emoji: '😂', color: 'hover:text-yellow-600' },
    { type: 'sad', emoji: '😢', color: 'hover:text-yellow-800' },
    { type: 'angry', emoji: '😡', color: 'hover:text-orange-600' },
];

const Reactions = ({ reactionCounts = {}, onReact, isAuthenticated }) => {
    const handleClick = (type) => {
        if (!isAuthenticated) {
            alert('Please log in to react.');
            return;
        }
        onReact(type);
    };

    return (
        <div className="flex space-x-2">
            {REACTION_TYPES.map(({ type, emoji, color }) => (
                <button
                    key={type}
                    onClick={() => handleClick(type)}
                    className={`flex items-center space-x-1 ${color}`}
                >
                    <span>{emoji}</span>
                    <span>{reactionCounts?.[`${type}s`] || 0}</span>
                </button>
            ))}
        </div>
    );
};

export default Reactions;
