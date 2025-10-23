import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound';
import Header from './components/Layout/Header';
import { apiBaseUrl, AuthContext } from './contexts/AuthContext';
import './index.css';

axios.defaults.withCredentials = true; // Important for Laravel Sanctum

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }

            const response = await axios.get(`${apiBaseUrl}/user`);
            setUser(response.data);
        } catch (error) {
            setUser(null);
            console.error("Not logged in or session expired.", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        console.log("User in Dashboard:", user);
    }, [user]);


    useEffect(() => {
        checkUser();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    const authContextValue = { user, setUser, checkUser };

    return (
        <AuthContext.Provider value={authContextValue}>
            <Router className="relative">
                <Header className="w-full"/>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
