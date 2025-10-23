import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { apiBaseUrl } from '../config';
import axiosClient from '../utils/axiosClient';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await axiosClient.get(`${apiBaseUrl}/user`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
