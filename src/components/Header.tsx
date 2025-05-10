
import React from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  return (
    <div className="relative w-full overflow-hidden">
      {/* Header background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: 'url("/lovable-uploads/d91c2dbc-4643-4e73-b459-a708554a6f8e.png")',
          height: '500px'
        }}
      >
        {/* No overlay needed as the image already has its own colors */}
      </div>
      
      <div className="relative z-10 marketplace-container pt-28 pb-20 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">
          MarketChat <span className="text-yellow-400">Marketplace</span>
        </h1>
        <p className="text-white text-center max-w-2xl mb-8 text-lg">
          Connect, Collaborate, Succeed. Buy and sell directly with no middleman.
        </p>
        
        <div className="w-full max-w-2xl">
          <SearchBar onSearch={() => {}} />
        </div>
        
        {!user && (
          <div className="mt-8">
            <Link 
              to="/create-listing" 
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-all"
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
