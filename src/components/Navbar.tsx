
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { MessageCircle, ShoppingCart } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // For demo, we'll assume user is logged in
  
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
            <span className="absolute -top-1 -right-1 bg-marketplace-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">2</span>
          </Link>
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/my-listings" className="w-full">My Listings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/messages" className="w-full">Messages</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={() => setIsLoggedIn(false)} className="w-full text-left">
                    Log Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setIsLoggedIn(true)}>Log In</Button>
              <Button onClick={() => setIsLoggedIn(true)}>Sign Up</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
