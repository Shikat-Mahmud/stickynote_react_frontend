import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { apiBaseUrl } from '../../config';
import { setPageTitle } from '../../utils/setPageTitle';

const generateRandomColor = () => {
    const colors = [
        'bg-blue-200 border-blue-400',
        'bg-green-200 border-green-400',
        'bg-purple-200 border-purple-400',
        'bg-yellow-200 border-yellow-400',
        'bg-red-200 border-red-400',
        'bg-indigo-200 border-indigo-400',
        'bg-pink-200 border-pink-400',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [randomCardColor] = useState(generateRandomColor);
    const navigate = useNavigate();
    const { checkUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(
                `${apiBaseUrl}/login`,
                { email, password },
                { withCredentials: true }
            );

            localStorage.setItem('token', response.data.access_token);
            await checkUser();

            setTimeout(() => navigate('/'), 100);
        } catch (err) {
            console.error("Login error:", err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    useEffect(() => {
        setPageTitle('Login');
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
            <div
                className={`relative square-card p-6 w-full max-w-md sm:max-w-sm border-t-4 ${randomCardColor} overflow-hidden shadow-md rounded-2xl`}
            >
                <img
                    src="/assets/icons/alpin.svg"
                    alt="pin"
                    className="pin-icon absolute -top-3 right-4 pin-icon"
                />

                <form onSubmit={handleSubmit} className="w-full">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Sign In
                    </h2>

                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                    )}

                    {/* Email */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto mb-3 sm:mb-0"
                        >
                            Sign In
                        </button>
                        <a
                            href="/register"
                            className="text-sm text-blue-500 hover:text-blue-800 font-semibold p-2"
                        >
                            Don’t have an account? Register
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;