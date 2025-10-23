import { Plus } from 'phosphor-react';
import React from 'react';

const NewPostButton = ({ onClick }) => {
    return (
            <button
                onClick={onClick}
                style={{height: '50px', width: '50px'}}
                className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-full flex justify-center items-center cursor-pointer shadow-lg shadow-gray-400"
            >
                <Plus size={20} weight="bold" />
            </button>
    );
};

export default NewPostButton;
