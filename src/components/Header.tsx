
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
      {/* Header background with Islamic green gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-green-700 to-teal-600" style={{ height: '500px' }}>
        {/* Overlay with Islamic pattern opacity */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="relative z-10 marketplace-container pt-28 pb-20 flex flex-col items-center">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">
            Hajj Ambassador <span className="text-amber-300">Marketplace</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-amber-200 text-lg mb-4">
            <span className="text-2xl">🕋</span>
            <span>Connect • Trade • Serve the Pilgrims</span>
            <span className="text-2xl">🕋</span>
          </div>
        </div>
        
        <p className="text-white text-center max-w-3xl mb-8 text-lg px-4">
          The premier marketplace for Hajj ambassadors and service providers. 
          Connect pilgrims with trusted services, accommodations, and guidance for their sacred journey.
        </p>
        
        <div className="w-full max-w-2xl mb-6">
          <SearchBar onSearch={() => {}} />
        </div>
        
        {user && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 text-center">
            <p className="text-white text-sm mb-2">
              <span className="font-semibold">{user.username}</span> • 
              <span className="capitalize text-amber-200 ml-1">{user.subscriptionTier} Plan</span>
            </p>
            <p className="text-amber-200 text-sm">
              {user.subscriptionTier === 'enterprise' 
                ? 'Unlimited ads remaining' 
                : `${(user.maxAds || 0) - (user.adsUsed || 0)} ads remaining`
              }
            </p>
          </div>
        )}
        
        {!user && (
          <div className="mt-8">
            <Link 
              to="/create-listing" 
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-medium transition-all text-lg shadow-lg"
            >
              Start Your Hajj Business Today - 20 Free Ads!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
