
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

// Define user type
export interface User {
  id: string;
  username: string;
  email?: string;
  isAdmin?: boolean;
  subscriptionTier?: 'free' | 'basic' | 'premium' | 'enterprise';
  adsUsed?: number;
  maxAds?: number;
  subscriptionEnd?: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  recoverPassword: (username: string) => Promise<void>;
  upgradeSubscription: (tier: 'basic' | 'premium' | 'enterprise') => void;
  canCreateAd: () => boolean;
  incrementAdCount: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local storage key
const USER_STORAGE_KEY = 'hajjMarket_user';

// Mock user database (in a real app, this would be in a backend)
const MOCK_USERS: Record<string, { 
  username: string; 
  password: string; 
  isAdmin?: boolean;
  subscriptionTier?: 'free' | 'basic' | 'premium' | 'enterprise';
  adsUsed?: number;
  subscriptionEnd?: string;
}> = {
  "Adebayo": { 
    username: "Adebayo", 
    password: "toheeb1", 
    isAdmin: true,
    subscriptionTier: 'enterprise',
    adsUsed: 0
  }
};

// Subscription tier limits and pricing
const SUBSCRIPTION_LIMITS = {
  free: { maxAds: 20, price: 0 },
  basic: { maxAds: 100, price: 25 },
  premium: { maxAds: 500, price: 50 },
  enterprise: { maxAds: -1, price: 100 } // -1 means unlimited
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session on load
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Ensure user has subscription info
        if (!parsedUser.subscriptionTier) {
          parsedUser.subscriptionTier = 'free';
          parsedUser.adsUsed = 0;
          parsedUser.maxAds = SUBSCRIPTION_LIMITS.free.maxAds;
        }
        setUser(parsedUser);
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

    // Create user with free tier
    const userId = `user_${Date.now()}`;
    MOCK_USERS[username] = { 
      username, 
      password,
      subscriptionTier: 'free',
      adsUsed: 0
    };
    
    const newUser: User = { 
      id: userId, 
      username, 
      email: `${username}@example.com`,
      subscriptionTier: 'free',
      adsUsed: 0,
      maxAds: SUBSCRIPTION_LIMITS.free.maxAds
    };
    
    setUser(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    toast.success("Welcome to Hajj Ambassador Marketplace! You have 20 free ads to start with.");
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

    const tier = userRecord.subscriptionTier || 'free';
    const loggedInUser: User = { 
      id: `user_${Date.now()}`, 
      username, 
      email: `${username}@example.com`,
      isAdmin: userRecord.isAdmin || false,
      subscriptionTier: tier,
      adsUsed: userRecord.adsUsed || 0,
      maxAds: SUBSCRIPTION_LIMITS[tier].maxAds,
      subscriptionEnd: userRecord.subscriptionEnd
    };
    
    setUser(loggedInUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedInUser));
    toast.success(`Welcome back to Hajj Ambassador Marketplace, ${username}!`);
    return Promise.resolve();
  };

  // Password recovery function
  const recoverPassword = async (username: string): Promise<void> => {
    const userRecord = MOCK_USERS[username];
    if (!userRecord) {
      toast.error("User not found");
      throw new Error("User not found");
    }

    // In a real app, this would send an email
    toast.success(`Password recovery instructions sent! Your password is: ${userRecord.password}`);
    console.log(`Recovery for: ${username}, password: ${userRecord.password}`);
    return Promise.resolve();
  };

  // Upgrade subscription
  const upgradeSubscription = (tier: 'basic' | 'premium' | 'enterprise') => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      subscriptionTier: tier,
      maxAds: SUBSCRIPTION_LIMITS[tier].maxAds,
      subscriptionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    };
    
    setUser(updatedUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    
    if (user.username && MOCK_USERS[user.username]) {
      MOCK_USERS[user.username].subscriptionTier = tier;
      MOCK_USERS[user.username].subscriptionEnd = updatedUser.subscriptionEnd;
    }
    
    toast.success(`Successfully upgraded to ${tier.charAt(0).toUpperCase() + tier.slice(1)} plan!`);
  };

  // Check if user can create ad
  const canCreateAd = (): boolean => {
    if (!user) return false;
    if (user.subscriptionTier === 'enterprise') return true; // Unlimited
    return (user.adsUsed || 0) < (user.maxAds || 0);
  };

  // Increment ad count
  const incrementAdCount = () => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      adsUsed: (user.adsUsed || 0) + 1
    };
    
    setUser(updatedUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    
    if (user.username && MOCK_USERS[user.username]) {
      MOCK_USERS[user.username].adsUsed = updatedUser.adsUsed;
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout, 
      recoverPassword,
      upgradeSubscription,
      canCreateAd,
      incrementAdCount
    }}>
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
