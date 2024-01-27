import React, { createContext, useState, useContext } from 'react';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    <AdminAuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AdminAuthProvider');
  }
  return context;
};
