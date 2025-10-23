import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { checkUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Get CSRF token
            await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
                withCredentials: true
            });

            // Attempt login
            const response = await axios.post(
                'http://localhost:8000/api/login',
                { email, password },
                { withCredentials: true }
            );
            localStorage.setItem('token', response.data.access_token);

            console.log(response.data);

            // Re-fetch user data
            await checkUser();

            // Navigate to dashboard
            navigate('/');
        } catch (err) {
            console.error("Login error:", err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign In
                    </button>
                    <a href="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Don't have an account? Register
                    </a>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;