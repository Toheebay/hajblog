
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { createBlogPost } from '@/services/blogService';
import { ArrowLeft } from 'lucide-react';

const blogPostSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  content: z.string().min(10, { message: "Content must be at least 10 characters" }),
  image: z.string().url({ message: "Please enter a valid image URL" }).or(z.string().length(0)),
  tags: z.string().optional()
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

const CreateBlogPost: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
      tags: ""
    },
  });

  const mutation = useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => {
      toast.success("Story shared successfully! 📝", {
        description: "Your experience is now live for the community"
      });
      navigate('/blog');
    },
    onError: () => {
      toast.error("Failed to share your story. Please try again.");
    }
  });

  const onSubmit = (values: BlogPostFormValues) => {
    if (!user) {
      toast.error("You must be logged in to share a story");
      return;
    }

    const tagsArray = values.tags ? values.tags.split(',').map(tag => tag.trim()) : [];

    mutation.mutate({
      title: values.title,
      content: values.content,
      image: values.image || undefined,
      tags: tagsArray.length > 0 ? tagsArray : undefined,
      author: user.id,
      authorName: user.username
    });
  };

  if (!user) {
    navigate('/blog');
    toast.error("Please log in to share your story.");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      
      <div className="marketplace-container py-16">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/blog')} 
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Blog
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Share Your Story</h1>
          <p className="text-gray-600">Share your experiences and insights with fellow pilgrims</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 md:p-8 max-w-4xl border-emerald-200">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Story Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., My First Hajj Experience" 
                        className="border-emerald-200 focus:border-emerald-500" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Your Story</FormLabel>
                    <FormDescription className="text-gray-500">
                      Share your experiences, insights, or advice for fellow pilgrims.
                    </FormDescription>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your Hajj journey, lessons learned, or advice for other pilgrims..." 
                        className="min-h-[400px] border-emerald-200 focus:border-emerald-500"
                        {...field} 
                      />
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
                    <FormLabel className="text-gray-700 font-medium">Image URL (optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/your-image.jpg" 
                        className="border-emerald-200 focus:border-emerald-500" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Add a photo to make your story more engaging
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Tags (optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="hajj, experience, tips, advice, spiritual" 
                        className="border-emerald-200 focus:border-emerald-500" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Comma-separated tags to help categorize your story
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-3 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/blog')}
                  className="border-emerald-200 text-gray-700 hover:bg-emerald-50"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Sharing..." : "Share Story"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPost;
