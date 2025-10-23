import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const GuestLayout = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

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
        <main className="flex justify-center items-center min-h-screen bg-gray-100">
            <Outlet />
        </main>
    );
};

export default GuestLayout;
