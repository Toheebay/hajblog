
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import ItemCard from '@/components/ItemCard';
import { items } from '@/data/items';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateListing = () => {
    if (user) {
      navigate('/create-listing');
    } else {
      toast.error("Please sign in to create a listing", {
        description: "You need an account to sell items"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Header />
      
      <div className="marketplace-container py-10">
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No items found</h2>
            <p className="text-gray-500">Try adjusting your search or category filter</p>
          </div>
        )}
        
        <div className="fixed bottom-6 right-6">
          <Button 
            onClick={handleCreateListing}
            className="bg-marketplace-accent hover:bg-marketplace-dark rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
          >
            <PlusCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
