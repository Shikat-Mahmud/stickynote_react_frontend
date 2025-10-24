import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { apiBaseUrl } from '../../../config';
import axiosClient from '../../../utils/axiosClient';

function Header() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axiosClient.post(`${apiBaseUrl}/logout`, null, {
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

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 right-0 left-0 z-50 shadow-md">
            <Link to="/" className="text-2xl font-bold tracking-wide">
                StickyNote
            </Link>

            <nav>
                {user ? (
                    <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
                        <span className="hidden sm:inline">Welcome, {user.name.trim().split(" ")[0]}!</span>

                        {/* Profile Button Wrapper */}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="focus:outline-none cursor-pointer"
                            >
                                <img
                                    src={user.avatar || '/assets/icons/male_avater.png'}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-white hover:border-green-400 transition-all object-cover"
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 top-12 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50 animate-fadeIn">
                                    <Link
                                        to="/profile"
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 transition"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <i className="ri-user-3-line text-lg mr-2"></i> Profile
                                    </Link>

                                    <Link
                                        to="/settings"
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 transition"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <i className="ri-settings-3-line text-lg mr-2"></i> Settings
                                    </Link>

                                    <hr className="my-1" />

                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-100 transition cursor-pointer"
                                    >
                                        <i className="ri-logout-circle-r-line text-lg mr-2 text-red-500"></i> Logout
                                    </button>
                                </div>
                            )}
                        </div>
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