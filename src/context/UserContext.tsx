// src/context/UserContext.tsx
'use client'; // Enables the file to run on the client side in a Next.js app

import React, { createContext, useContext, useState } from 'react';

// Define the shape of the user object
type User = {
  name: string;      // Full display name of the user
  username: string;  // Unique username (e.g., for URLs or mentions)
  avatar: string;    // Avatar image URL or path
  email: string;     // Email address of the user
};

// Define the structure of the context value
type UserContextType = {
  user: User | null;                  // Currently logged-in user, or null if not logged in
  login: (user: User) => void;        // Function to set the user object
  logout: () => void;                 // Function to clear the user (log out)
};

// Create the context with an undefined default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component to wrap your app and provide the user state
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // State to hold the current user

  const login = (user: User) => setUser(user);         // Login function that sets the user state
  const logout = () => setUser(null);                  // Logout function that clears the user state

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}  {/* Render children inside the provider so they have access to the context */}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext in any component
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider'); // Safety check
  }
  return context;
};
