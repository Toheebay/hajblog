
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import ItemCard from '@/components/ItemCard';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import { items } from '@/data/items';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from 'sonner';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { user } = useSupabaseAuth();
  const navigate = useNavigate();
  
  // Get unique categories from items
  const categories = ['All', ...Array.from(new Set(items.map(item => item.category)))];
  
  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateListing = () => {
    if (!user) {
      toast.error("Please sign in to create a Hajj service listing", {
        description: "Join our community of Hajj ambassadors"
      });
      return;
    }
    
    // Simple check - authenticated users can create listings
    // You can add more sophisticated ad limit checking here if needed
    navigate('/create-listing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      <Header />
      
      <div className="marketplace-container py-10">
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🕋</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Hajj services found</h2>
            <p className="text-gray-500">Try adjusting your search or category filter</p>
          </div>
        )}
        
        <div className="fixed bottom-6 right-6">
          <Button 
            onClick={handleCreateListing}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-full h-14 w-14 shadow-lg flex items-center justify-center text-white"
          >
            <PlusCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Subscription Plans Section */}
      <section className="bg-white/80 backdrop-blur-sm">
        <SubscriptionPlans />
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="marketplace-container text-center">
          <h2 className="text-3xl font-bold mb-8">Trusted by Hajj Pilgrims Worldwide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-emerald-200">Pilgrims Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-emerald-200">Verified Ambassadors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-emerald-200">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
