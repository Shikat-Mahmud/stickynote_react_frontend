import { createContext, useContext } from 'react';

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loading: true,
  checkUser: async () => {},
});

export const useAuth = () => useContext(AuthContext);
