import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  hasAccount: boolean;
  login: () => void;
  logout: () => void;
  setHasAccount: (hasAccount: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const hasAccountFlag = localStorage.getItem('hasAccount') === 'true';
    setIsLoggedIn(!!token);
    setHasAccount(hasAccountFlag);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, hasAccount, login, logout, setHasAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};