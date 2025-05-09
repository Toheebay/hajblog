
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, DollarSign, Tag } from 'lucide-react';
import { items } from '@/data/items';
import Navbar from '@/components/Navbar';
import { format } from 'date-fns';
import UserAvatar from '@/components/UserAvatar';

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = items.find(item => item.id === id);
  
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Item Not Found</h2>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const formattedDate = format(new Date(item.createdAt), 'MMMM dd, yyyy');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="marketplace-container pt-24 pb-10">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="h-80 md:h-[500px] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{item.title}</h1>
                <Badge className="bg-marketplace-accent">
                  {item.price === 0 ? "FREE" : `$${item.price}`}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-500 mb-4">
                <Tag className="h-4 w-4" />
                <span>{item.category}</span>
              </div>
              
              <Separator className="my-4" />
              
              <div className="mb-6">
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{item.description}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="font-semibold mb-2">Location</h2>
                <p className="text-gray-700">{item.location}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="font-semibold mb-2">Posted</h2>
                <p className="text-gray-700">{formattedDate}</p>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <UserAvatar 
                    src={item.seller.avatar}
                    name={item.seller.name}
                    size="md"
                  />
                  <div>
                    <p className="font-medium">{item.seller.name}</p>
                    <p className="text-sm text-gray-500">Member</p>
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate(`/chat/${item.seller.id}?itemId=${item.id}`)}
                  className="bg-marketplace-primary hover:bg-marketplace-dark"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat with Seller
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related items could go here */}
      </div>
    </div>
  );
};

export default ItemDetail;
