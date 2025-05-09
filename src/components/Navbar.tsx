
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { MessageCircle, ShoppingCart, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50">
      <div className="marketplace-container flex justify-between items-center py-4">
        <Link to="/" className="flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6 text-marketplace-primary" />
          <span className="text-xl font-bold text-marketplace-primary">MarketChat</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/messages" className="relative">
            <MessageCircle className="h-6 w-6 text-gray-600 hover:text-marketplace-primary transition-colors" />
            {user && (
              <span className="absolute -top-1 -right-1 bg-marketplace-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">2</span>
            )}
          </Link>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer h-8 w-8">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${user.username}`} />
                  <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <div className="w-full font-medium">{user.username}</div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/my-listings" className="w-full">My Listings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/messages" className="w-full">Messages</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <div className="flex items-center w-full text-left">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <AuthModal variant="outline" triggerText="Log In" />
              <AuthModal triggerText="Sign Up" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
