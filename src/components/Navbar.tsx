
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import AuthModal from '@/components/AuthModal';
import { useCurrency } from '@/contexts/CurrencyContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const { currencySymbol } = useCurrency();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="relative z-10 bg-marketplace-primary text-white">
        <div className="marketplace-container">
          <nav className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold">
              Market<span className="text-marketplace-accent">Chat</span> {currencySymbol}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`hover:text-marketplace-accent ${isActive('/') ? 'text-marketplace-accent' : ''}`}
              >
                Marketplace
              </Link>
              <Link
                to="/courses"
                className={`hover:text-marketplace-accent ${isActive('/courses') ? 'text-marketplace-accent' : ''}`}
              >
                Courses
              </Link>
              <Link
                to="/certifications"
                className={`hover:text-marketplace-accent ${isActive('/certifications') ? 'text-marketplace-accent' : ''}`}
              >
                Certifications
              </Link>
              <Link
                to="/mentorship"
                className={`hover:text-marketplace-accent ${isActive('/mentorship') ? 'text-marketplace-accent' : ''}`}
              >
                Mentorship
              </Link>
              <Link
                to="/community"
                className={`hover:text-marketplace-accent ${isActive('/community') ? 'text-marketplace-accent' : ''}`}
              >
                Community
              </Link>
              <Link
                to="/donate"
                className={`hover:text-marketplace-accent ${isActive('/donate') ? 'text-marketplace-accent' : ''}`}
              >
                Donate
              </Link>
              
              {user?.isAdmin && (
                <Link
                  to="/admin/courses"
                  className="hover:text-marketplace-accent text-yellow-300"
                >
                  Admin
                </Link>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/messages">
                    <Button variant="ghost" className="hover:bg-marketplace-dark">
                      Messages
                    </Button>
                  </Link>
                  <Link to="/create-listing">
                    <Button className="bg-marketplace-accent hover:bg-marketplace-accent/90">
                      Create Listing
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="outline" className="border-white text-white hover:bg-marketplace-dark">
                      My Profile
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button onClick={() => setIsAuthModalOpen(true)} className="bg-marketplace-accent hover:bg-marketplace-accent/90">
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
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
        <div className="md:hidden fixed inset-0 z-50 bg-marketplace-primary pt-16 px-4 pb-4">
          <div className="flex flex-col h-full">
            <div className="flex-1 flex flex-col space-y-4 py-8">
              <Link to="/" onClick={closeMenu} className="px-4 py-2 hover:bg-marketplace-dark rounded">
                Marketplace
              </Link>
              <Link to="/courses" onClick={closeMenu} className="px-4 py-2 hover:bg-marketplace-dark rounded">
                Courses
              </Link>
              <Link to="/certifications" onClick={closeMenu} className="px-4 py-2 hover:bg-marketplace-dark rounded">
                Certifications
              </Link>
              <Link to="/mentorship" onClick={closeMenu} className="px-4 py-2 hover:bg-marketplace-dark rounded">
                Mentorship
              </Link>
              <Link to="/community" onClick={closeMenu} className="px-4 py-2 hover:bg-marketplace-dark rounded">
                Community
              </Link>
              <Link to="/donate" onClick={closeMenu} className="px-4 py-2 hover:bg-marketplace-dark rounded">
                Donate
              </Link>
              
              {user?.isAdmin && (
                <Link to="/admin/courses" onClick={closeMenu} className="px-4 py-2 hover:bg-marketplace-dark rounded text-yellow-300">
                  Admin
                </Link>
              )}
            </div>

            <div className="border-t border-marketplace-dark pt-4 space-y-2">
              {user ? (
                <>
                  <Link to="/messages" onClick={closeMenu} className="block">
                    <Button variant="ghost" className="w-full justify-start hover:bg-marketplace-dark">
                      Messages
                    </Button>
                  </Link>
                  <Link to="/create-listing" onClick={closeMenu} className="block">
                    <Button className="w-full justify-start bg-marketplace-accent hover:bg-marketplace-accent/90">
                      Create Listing
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={closeMenu} className="block">
                    <Button variant="outline" className="w-full justify-start border-white text-white hover:bg-marketplace-dark">
                      My Profile
                    </Button>
                  </Link>
                </>
              ) : (
                <Button
                  onClick={() => {
                    closeMenu();
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full bg-marketplace-accent hover:bg-marketplace-accent/90"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
