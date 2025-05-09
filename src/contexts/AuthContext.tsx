
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

// Define user type
export interface User {
  id: string;
  username: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local storage key
const USER_STORAGE_KEY = 'marketChat_user';

// Mock user database (in a real app, this would be in a backend)
const MOCK_USERS: Record<string, { username: string; password: string }> = {};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session on load
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Register new user
  const register = async (username: string, password: string): Promise<void> => {
    // Validate inputs
    if (!username || !password) {
      toast.error("Username and password are required");
      throw new Error("Username and password are required");
    }
    
    // Check if username is taken
    if (MOCK_USERS[username]) {
      toast.error("Username is already taken");
      throw new Error("Username is already taken");
    }

    // Create user
    const userId = `user_${Date.now()}`;
    MOCK_USERS[username] = { username, password };
    
    const newUser = { id: userId, username };
    setUser(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    toast.success("Account created successfully");
    return Promise.resolve();
  };

  // Login user
  const login = async (username: string, password: string): Promise<void> => {
    // Validate inputs
    if (!username || !password) {
      toast.error("Username and password are required");
      throw new Error("Username and password are required");
    }

    // Check if user exists and password matches
    const userRecord = MOCK_USERS[username];
    if (!userRecord || userRecord.password !== password) {
      toast.error("Invalid username or password");
      throw new Error("Invalid username or password");
    }

    const loggedInUser = { id: `user_${Date.now()}`, username };
    setUser(loggedInUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedInUser));
    toast.success("Logged in successfully");
    return Promise.resolve();
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
