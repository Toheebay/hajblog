
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
import { MessageCircle, ShoppingCart, LogOut, Users, Heart, Menu, GraduationCap, Award, UserRound } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Community', path: '/community', icon: <Users className="h-4 w-4 mr-1" /> },
    { label: 'Courses', path: '/courses', icon: <GraduationCap className="h-4 w-4 mr-1" /> },
    { label: 'Certifications', path: '/certifications', icon: <Award className="h-4 w-4 mr-1" /> },
    { label: 'Mentorship', path: '/mentorship', icon: <UserRound className="h-4 w-4 mr-1" /> },
    { label: 'Donate', path: '/donate', icon: <Heart className="h-4 w-4 mr-1" /> },
  ];

  const renderNavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link 
          key={item.path} 
          to={item.path} 
          className="text-gray-600 hover:text-marketplace-primary transition-colors flex items-center"
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </>
  );
  
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50">
      <div className="marketplace-container flex justify-between items-center py-4">
        <Link to="/" className="flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6 text-marketplace-primary" />
          <span className="text-xl font-bold text-marketplace-primary">MarketChat</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {renderNavLinks()}
        </div>
        
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
                <DropdownMenuItem>
                  <Link to="/community/create" className="w-full">Create Post</Link>
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
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {renderNavLinks()}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
