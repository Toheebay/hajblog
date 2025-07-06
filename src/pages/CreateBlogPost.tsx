
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
      toast.success("Blog post published successfully! 📝", {
        description: "Your Hajj guidance is now live for pilgrims"
      });
      navigate('/blog');
    },
    onError: () => {
      toast.error("Failed to publish blog post. Please try again.");
    }
  });

  const onSubmit = (values: BlogPostFormValues) => {
    if (!user) {
      toast.error("You must be logged in to create a blog post");
      return;
    }

    if (!user.isAdmin) {
      toast.error("Only administrators can create blog posts");
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

  if (!user || !user.isAdmin) {
    navigate('/blog');
    toast.error("Access denied. Only administrators can create blog posts.");
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Blog Post</h1>
          <p className="text-gray-600">Share daily insights and guidance for Hajj pilgrims</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 md:p-8 max-w-4xl border-emerald-200">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Post Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Essential Tips for First-Time Hajj Pilgrims" 
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
                    <FormLabel className="text-gray-700 font-medium">Content</FormLabel>
                    <FormDescription className="text-gray-500">
                      Write your post content. Markdown formatting is supported.
                    </FormDescription>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your wisdom and guidance for Hajj pilgrims..." 
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
                    <FormLabel className="text-gray-700 font-medium">Featured Image URL (optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/hajj-image.jpg" 
                        className="border-emerald-200 focus:border-emerald-500" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Add a relevant image to make your post more engaging
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
                        placeholder="hajj, pilgrimage, mecca, guidance, tips" 
                        className="border-emerald-200 focus:border-emerald-500" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Comma-separated tags to help categorize your post
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
                  {mutation.isPending ? "Publishing..." : "Publish Post"}
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
