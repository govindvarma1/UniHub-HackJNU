import React, { createContext, useState, useContext } from 'react';

const ProfessorAuthContext = createContext();

export const ProfessorAuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    <ProfessorAuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </ProfessorAuthContext.Provider>
  );
};

export const useProfessorAuth = () => {
  const context = useContext(ProfessorAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
