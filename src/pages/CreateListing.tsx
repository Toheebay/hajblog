
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { categories } from '@/data/items';
import Navbar from '@/components/Navbar';

const itemSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  price: z.coerce.number().min(0, { message: "Price cannot be negative" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  location: z.string().min(3, { message: "Location must be at least 3 characters" }),
  image: z.string().url({ message: "Please enter a valid image URL" }).or(z.string().length(0)),
});

type ItemFormValues = z.infer<typeof itemSchema>;

const CreateListing: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      category: "",
      location: "",
      image: "",
    },
  });

  const onSubmit = (values: ItemFormValues) => {
    if (!user) {
      toast.error("You must be logged in to create a listing");
      return;
    }

    // For now, we'll just simulate adding the item
    toast.success("Listing created successfully!");
    console.log("New listing:", {
      ...values,
      id: String(Date.now()),
      seller: {
        id: user.id,
        name: user.username,
        avatar: `https://i.pravatar.cc/150?u=${user.username}`,
      },
      createdAt: new Date().toISOString(),
    });
    
    // In a real app, we would save to a database here
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="marketplace-container py-24">
        <h1 className="text-3xl font-bold mb-6">Create New Listing</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 max-w-2xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Vintage Coffee Table" {...field} />
                    </FormControl>
                    <FormDescription>
                      A clear, descriptive title for your item
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormDescription>
                      Set to 0 if the item is free
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your item, including condition, age, dimensions, etc." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.filter(cat => cat !== "All").map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Brooklyn, NY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a URL to an image of your item
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-marketplace-primary">
                Create Listing
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
