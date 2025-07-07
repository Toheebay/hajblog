
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <Filter className="h-4 w-4 text-gray-600 flex-shrink-0" />
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-[200px] border-emerald-200 focus:border-emerald-500 bg-white">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent className="bg-white border-emerald-200 z-50">
          {categories.map((category) => (
            <SelectItem 
              key={category} 
              value={category} 
              className="hover:bg-emerald-50 focus:bg-emerald-50"
            >
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
