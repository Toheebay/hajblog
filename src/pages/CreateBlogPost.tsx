
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
      toast.success("Blog post created successfully!");
      navigate('/blog');
    },
    onError: () => {
      toast.error("Failed to create blog post. Please try again.");
    }
  });

  const onSubmit = (values: BlogPostFormValues) => {
    if (!user) {
      toast.error("You must be logged in to create a blog post");
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
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="marketplace-container py-24">
        <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 max-w-3xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter post title" {...field} />
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
                    <FormLabel>Content</FormLabel>
                    <FormDescription>
                      Supports Markdown formatting
                    </FormDescription>
                    <FormControl>
                      <Textarea 
                        placeholder="Write your blog post content here..." 
                        className="min-h-[300px]"
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
                    <FormLabel>Feature Image URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a URL to an image for your blog post
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
                    <FormLabel>Tags (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="tag1, tag2, tag3" {...field} />
                    </FormControl>
                    <FormDescription>
                      Comma-separated list of tags
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/blog')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-marketplace-primary hover:bg-marketplace-dark"
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
