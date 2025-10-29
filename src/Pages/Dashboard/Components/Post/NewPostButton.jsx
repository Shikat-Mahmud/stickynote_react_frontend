import React from 'react';

const NewPostButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{ height: '50px', width: '50px' }}
            className="fixed bottom-6 right-6 bg-gray-800 hover:bg-gray-900 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg transition-all z-40 cursor-pointer"
        >
            <i className="ri-add-large-line text-xl"></i>
        </button>
    );
};

export default NewPostButton;
