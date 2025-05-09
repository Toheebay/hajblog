
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Eye, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { items } from '@/data/items';
import { toast } from 'sonner';

const MyListings: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" />;
  }

  // Filter items to only show those belonging to the current user
  const userListings = items.filter(item => item.seller.id === user.id);

  const handleCreateListing = () => {
    navigate('/create-listing');
  };

  const handleDeleteListing = (id: string) => {
    // In a real app, this would delete from database
    toast.success("Listing deleted successfully!");
    console.log("Delete listing with ID:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="marketplace-container py-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Listings</h1>
          <Button 
            onClick={handleCreateListing}
            className="bg-marketplace-primary hover:bg-marketplace-dark"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Listing
          </Button>
        </div>
        
        {userListings.length === 0 ? (
          <Card className="bg-white p-8 text-center">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <PlusCircle className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No Listings Yet</h3>
              <p className="text-gray-500 mb-6">
                You haven't created any listings yet. Start selling your items today!
              </p>
              <Button 
                onClick={handleCreateListing}
                className="bg-marketplace-primary hover:bg-marketplace-dark"
              >
                Create Your First Listing
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {userListings.map(listing => (
              <Card key={listing.id} className="overflow-hidden bg-white">
                <div className="flex items-center p-4 sm:p-6">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={listing.image} 
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{listing.title}</h3>
                        <p className="text-marketplace-accent font-medium">
                          ${listing.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {listing.category} • {listing.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link to={`/item/${listing.id}`}>
                      <Button size="sm" variant="outline" className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Link to={`/edit-listing/${listing.id}`}>
                      <Button size="sm" variant="outline" className="flex items-center">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleDeleteListing(listing.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
