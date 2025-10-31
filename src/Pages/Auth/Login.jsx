import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { apiBaseUrl } from '../../config';
import { setPageTitle } from '../../utils/setPageTitle';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
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

            setPageTitle('');
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
                    className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto mb-3 sm:mb-0"
                >
                    Sign In
                </button>
                <a
                    href="/register"
                    className="text-sm text-blue-500 hover:text-blue-600 font-semibold p-2"
                >
                    Don’t have an account? Register
                </a>
            </div>
        </form>
    );
}

export default Login;