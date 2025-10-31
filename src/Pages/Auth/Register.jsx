import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../../config';
import { setPageTitle } from '../../utils/setPageTitle';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== passwordConfirmation) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await axios.post(`${apiBaseUrl}/register`, {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            navigate('/login');
        } catch (err) {
            console.error("Registration error:", err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Registration failed.');
        }
    };

    useEffect(() => {
        setPageTitle('Register');
    }, []);

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Register
            </h2>

            {error && (
                <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            {/* Name */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            {/* Email */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password_confirmation">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="password_confirmation"
                    placeholder="Confirm your password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between">
                <button
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto mb-3 sm:mb-0"
                >
                    Register
                </button>
                <a
                    href="/login"
                    className="text-sm text-blue-500 hover:text-blue-600 font-semibold p-2"
                >
                    Already have an account? Login
                </a>
            </div>
        </form>
    );
}

export default Register;