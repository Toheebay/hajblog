
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { categories } from '@/data/items';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="my-6">
      <h2 className="text-lg font-semibold mb-3">Categories</h2>
      <ScrollArea className="whitespace-nowrap pb-4 max-w-full">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={
                selectedCategory === category 
                  ? "bg-marketplace-primary hover:bg-marketplace-dark" 
                  : "hover:bg-marketplace-light hover:text-marketplace-primary"
              }
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
