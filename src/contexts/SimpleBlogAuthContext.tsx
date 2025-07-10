
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface SimpleBlogUser {
  id: string;
  name: string;
  email?: string;
}

interface SimpleBlogAuthContextType {
  user: SimpleBlogUser | null;
  isLoading: boolean;
  signIn: (name: string, password: string) => Promise<{ error: any }>;
  signUp: (name: string, password: string, email?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const SimpleBlogAuthContext = createContext<SimpleBlogAuthContextType | undefined>(undefined);

export const useSimpleBlogAuth = () => {
  const context = useContext(SimpleBlogAuthContext);
  if (context === undefined) {
    throw new Error('useSimpleBlogAuth must be used within a SimpleBlogAuthProvider');
  }
  return context;
};

// Simple local storage for users (in a real app, this would be a backend)
const STORAGE_KEYS = {
  USERS: 'blog_users',
  CURRENT_USER: 'blog_current_user'
};

interface StoredUser {
  id: string;
  name: string;
  password: string;
  email?: string;
}

const getStoredUsers = (): StoredUser[] => {
  try {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

const setStoredUsers = (users: StoredUser[]) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

const getCurrentUser = (): SimpleBlogUser | null => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const setCurrentUser = (user: SimpleBlogUser | null) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const SimpleBlogAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SimpleBlogUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session on load
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const signUp = async (name: string, password: string, email?: string) => {
    setIsLoading(true);
    
    try {
      if (!name.trim() || !password.trim()) {
        toast.error('Name and password are required');
        return { error: new Error('Name and password are required') };
      }

      const users = getStoredUsers();
      
      // Check if user already exists
      if (users.some(u => u.name.toLowerCase() === name.toLowerCase())) {
        toast.error('A user with this name already exists');
        return { error: new Error('User already exists') };
      }

      // Create new user
      const newStoredUser: StoredUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: name.trim(),
        password,
        email: email?.trim()
      };

      users.push(newStoredUser);
      setStoredUsers(users);

      // Set as current user
      const newUser: SimpleBlogUser = {
        id: newStoredUser.id,
        name: newStoredUser.name,
        email: newStoredUser.email
      };

      setUser(newUser);
      setCurrentUser(newUser);
      
      toast.success(`Welcome to the blog, ${name}!`);
      return { error: null };
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error('Sign up failed');
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (name: string, password: string) => {
    setIsLoading(true);
    
    try {
      if (!name.trim() || !password.trim()) {
        toast.error('Name and password are required');
        return { error: new Error('Name and password are required') };
      }

      const users = getStoredUsers();
      const foundUser = users.find(
        u => u.name.toLowerCase() === name.toLowerCase() && u.password === password
      );

      if (!foundUser) {
        toast.error('Invalid name or password');
        return { error: new Error('Invalid credentials') };
      }

      // Set as current user
      const currentUser: SimpleBlogUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email
      };

      setUser(currentUser);
      setCurrentUser(currentUser);
      
      toast.success(`Welcome back, ${foundUser.name}!`);
      return { error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error('Sign in failed');
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    setCurrentUser(null);
    toast.success('Signed out successfully');
  };

  return (
    <SimpleBlogAuthContext.Provider value={{
      user,
      isLoading,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </SimpleBlogAuthContext.Provider>
  );
};
