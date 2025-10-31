import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import randomColor from '../Utility/GenerateRandomColor';

const GuestLayout = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [randomCardColor] = useState(randomColor);

    useEffect(() => {
        if (!loading && user) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        return null;
    }

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-100 w-full px-10 sm:px-0">
            <div
            className={`relative square-card p-6 w-full max-w-md sm:max-w-sm border-t-4 ${randomCardColor} overflow-hidden shadow-md rounded-2xl`}
        >
            <img
                src="/assets/icons/alpin.svg"
                alt="pin"
                className="pin-icon absolute -top-3 right-4 pin-icon"
            />
            <Outlet />
            </div>
        </main>
    );
};

export default GuestLayout;
