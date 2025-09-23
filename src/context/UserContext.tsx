
'use client';

import {User} from '../lib/definitions';
import React, { createContext, useContext, useState } from 'react';

type UserContextType = {
  user: User | null;                  
  login: (user: User) => void;        
  logout: () => void;                 
};
/**
 * global state management system for the current user.
 */

//This line creates the Context to be consumed by the useContext
const UserContext = createContext<UserContextType | undefined>(undefined);


//This is a React component that provides the user data to all of its children.
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => setUser(user);         
  const logout = () => setUser(null);                  

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}  
    </UserContext.Provider>
  );
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
