
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { getBlogPost, updateBlogPost } from '@/services/blogService';

const blogPostSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  content: z.string().min(10, { message: "Content must be at least 10 characters" }),
  image: z.string().url({ message: "Please enter a valid image URL" }).or(z.string().length(0)),
  tags: z.string().optional()
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

const EditBlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: post, isLoading: isLoadingPost } = useQuery({
    queryKey: ['blogPost', id],
    queryFn: () => getBlogPost(id || ''),
    enabled: !!id
  });

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
      tags: ""
    },
  });

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        content: post.content,
        image: post.image || '',
        tags: post.tags ? post.tags.join(', ') : ''
      });
    }
  }, [post, form]);

  const mutation = useMutation({
    mutationFn: (values: BlogPostFormValues & { id: string }) => {
      const { id, ...postData } = values;
      return updateBlogPost(id, postData);
    },
    onSuccess: () => {
      toast.success("Blog post updated successfully!");
      navigate(`/blog/${id}`);
    },
    onError: () => {
      toast.error("Failed to update blog post. Please try again.");
    }
  });

  const onSubmit = (values: BlogPostFormValues) => {
    if (!user) {
      toast.error("You must be logged in to update a blog post");
      return;
    }

    if (!post) {
      toast.error("Post not found");
      return;
    }

    const tagsArray = values.tags ? values.tags.split(',').map(tag => tag.trim()) : [];

    mutation.mutate({
      id: id || '',
      title: values.title,
      content: values.content,
      image: values.image || undefined,
      tags: tagsArray.length > 0 ? tagsArray : undefined
    });
  };

  if (!user) {
    navigate('/blog');
    return null;
  }

  if (isLoadingPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="marketplace-container py-24 flex justify-center">
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (post && post.author !== user.id) {
    navigate(`/blog/${id}`);
    toast.error("You don't have permission to edit this post");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="marketplace-container py-24">
        <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
        
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
                  onClick={() => navigate(`/blog/${id}`)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-marketplace-primary hover:bg-marketplace-dark"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Updating..." : "Update Post"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditBlogPost;
