
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const { user, signOut, isLoading } = useSupabaseAuth();
  const { currencySymbol } = useCurrency();

  const isActive = (path: string) => location.pathname === path;
  const closeMenu = () => setIsMenuOpen(false);

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  if (isLoading) {
    return (
      <header className="relative z-10 bg-gradient-to-r from-marketplace-primary via-marketplace-accent to-marketplace-secondary text-white shadow-lg">
        <div className="marketplace-container">
          <nav className="flex items-center justify-between py-4">
            <div className="h-8 w-32 bg-white/20 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-white/20 rounded animate-pulse"></div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="relative z-10 bg-gradient-to-r from-marketplace-primary via-marketplace-accent to-marketplace-secondary text-white shadow-lg">
        <div className="marketplace-container">
          <nav className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold hover:scale-105 transition-transform">
              Hajj<span className="text-yellow-300">Ambassador</span> {currencySymbol}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`hover:text-yellow-300 transition-colors px-3 py-2 rounded-md ${
                  isActive('/') ? 'text-yellow-300 bg-white/10' : 'hover:bg-white/10'
                }`}
              >
                Marketplace
              </Link>
              <Link
                to="/courses"
                className={`hover:text-yellow-300 transition-colors px-3 py-2 rounded-md ${
                  isActive('/courses') ? 'text-yellow-300 bg-white/10' : 'hover:bg-white/10'
                }`}
              >
                Courses
              </Link>
              <Link
                to="/certifications"
                className={`hover:text-yellow-300 transition-colors px-3 py-2 rounded-md ${
                  isActive('/certifications') ? 'text-yellow-300 bg-white/10' : 'hover:bg-white/10'
                }`}
              >
                Certifications
              </Link>
              <Link
                to="/mentorship"
                className={`hover:text-yellow-300 transition-colors px-3 py-2 rounded-md ${
                  isActive('/mentorship') ? 'text-yellow-300 bg-white/10' : 'hover:bg-white/10'
                }`}
              >
                Mentorship
              </Link>
              <Link
                to="/blog"
                className={`hover:text-yellow-300 transition-colors px-3 py-2 rounded-md ${
                  isActive('/blog') ? 'text-yellow-300 bg-white/10' : 'hover:bg-white/10'
                }`}
              >
                Blog
              </Link>
              <Link
                to="/donate"
                className={`hover:text-yellow-300 transition-colors px-3 py-2 rounded-md ${
                  isActive('/donate') ? 'text-yellow-300 bg-white/10' : 'hover:bg-white/10'
                }`}
              >
                Donate
              </Link>
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/messages">
                    <Button variant="ghost" className="hover:bg-white/10 text-white hover:text-yellow-300 transition-colors">
                      Messages
                    </Button>
                  </Link>
                  <Link to="/create-listing">
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-marketplace-primary font-medium shadow-lg hover:shadow-xl transition-all">
                      Create Listing
                    </Button>
                  </Link>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="hover:bg-white/10 p-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback className="bg-white/20 text-white">
                            {user.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Link to="/auth">
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-marketplace-primary font-medium shadow-lg hover:shadow-xl transition-all">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-yellow-300 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gradient-to-br from-marketplace-primary via-marketplace-accent to-marketplace-secondary pt-16 px-4 pb-4">
          <div className="flex flex-col h-full">
            <div className="flex-1 flex flex-col space-y-4 py-8">
              <Link to="/" onClick={closeMenu} className="px-4 py-3 hover:bg-white/10 rounded-lg transition-colors">
                Marketplace
              </Link>
              <Link to="/courses" onClick={closeMenu} className="px-4 py-3 hover:bg-white/10 rounded-lg transition-colors">
                Courses
              </Link>
              <Link to="/certifications" onClick={closeMenu} className="px-4 py-3 hover:bg-white/10 rounded-lg transition-colors">
                Certifications
              </Link>
              <Link to="/mentorship" onClick={closeMenu} className="px-4 py-3 hover:bg-white/10 rounded-lg transition-colors">
                Mentorship
              </Link>
              <Link to="/blog" onClick={closeMenu} className="px-4 py-3 hover:bg-white/10 rounded-lg transition-colors">
                Blog
              </Link>
              <Link to="/donate" onClick={closeMenu} className="px-4 py-3 hover:bg-white/10 rounded-lg transition-colors">
                Donate
              </Link>
            </div>

            <div className="border-t border-white/20 pt-4 space-y-2">
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-yellow-300">
                    {user.email}
                  </div>
                  <Link to="/messages" onClick={closeMenu}>
                    <Button variant="ghost" className="w-full justify-start hover:bg-white/10 text-white">
                      Messages
                    </Button>
                  </Link>
                  <Link to="/create-listing" onClick={closeMenu}>
                    <Button className="w-full justify-start bg-yellow-400 hover:bg-yellow-500 text-marketplace-primary">
                      Create Listing
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={closeMenu}>
                    <Button variant="ghost" className="w-full justify-start hover:bg-white/10 text-white">
                      Profile
                    </Button>
                  </Link>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    className="w-full justify-start hover:bg-red-500/20 text-red-300"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/auth" onClick={closeMenu}>
                  <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-marketplace-primary">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
