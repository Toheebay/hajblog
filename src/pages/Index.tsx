
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import ItemCard from '@/components/ItemCard';
import { items } from '@/data/items';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="marketplace-container pt-24 pb-10">
        <div className="flex flex-col items-center justify-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Buy, Sell, and Chat <span className="text-marketplace-primary">Directly</span>
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mb-8">
            Find amazing items in your area and chat instantly with sellers. 
            No middleman, just smooth transactions.
          </p>
          
          <SearchBar onSearch={setSearchQuery} />
        </div>
        
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
          <Button className="bg-marketplace-accent hover:bg-marketplace-dark rounded-full h-14 w-14 shadow-lg flex items-center justify-center">
            <PlusCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
