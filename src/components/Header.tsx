
import React from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="relative w-full overflow-hidden">
      {/* Header background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: 'url("/lovable-uploads/7dc6f230-fe69-49c1-8291-9026937a031b.png")',
          height: '400px'
        }}
      >
        {/* Overlay to improve text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      
      <div className="relative z-10 marketplace-container pt-24 pb-16 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">
          Buy, Sell, and Chat <span className="text-marketplace-primary">Directly</span>
        </h1>
        <p className="text-white text-center max-w-2xl mb-8 text-lg">
          Find amazing items in your area and chat instantly with sellers. 
          No middleman, just smooth transactions.
        </p>
        
        <div className="w-full max-w-2xl">
          <SearchBar onSearch={() => {}} />
        </div>
        
        {!user && (
          <div className="mt-8">
            <Link 
              to="/create-listing" 
              className="bg-marketplace-accent hover:bg-marketplace-dark text-white px-6 py-3 rounded-lg font-medium transition-all"
            >
              Start Selling Today
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
