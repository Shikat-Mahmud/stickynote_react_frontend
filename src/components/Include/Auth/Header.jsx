import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { apiBaseUrl } from '../../../config';

function Header() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${apiBaseUrl}/logout`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem('token');
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error.response?.data || error.message);
        }
    };


    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 right-0 left-0 z-50">
            <Link to="/" className="text-2xl font-bold">StickyNote</Link>
            <nav>
                {user ? (
                    <div className="flex items-center space-x-4">
                        <span>Welcome, {user.name}!</span>
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="space-x-4">
                        <Link to="/login" className="hover:text-gray-300">Login</Link>
                        <Link to="/register" className="hover:text-gray-300">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;