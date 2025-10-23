import React from 'react';

const NewPostButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{ height: '50px', width: '50px' }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-full flex justify-center items-center cursor-pointer shadow-lg shadow-gray-400"
        >
            <i className="ri-add-large-line text-xl"></i>
        </button>
    );
};

export default NewPostButton;
