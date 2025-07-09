
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marked } from 'marked';
import Navbar from '@/components/Navbar';
import SocialShare from '@/components/SocialShare';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { getBlogPost, deleteBlogPost, updateBlogPost } from '@/services/blogService';
import { format } from 'date-fns';
import { Edit, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blogPost', id],
    queryFn: () => getBlogPost(id || ''),
    enabled: !!id
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      toast.success('Blog post deleted successfully');
      navigate('/blog');
    },
    onError: () => {
      toast.error('Failed to delete blog post');
    }
  });
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteMutation.mutate(id || '');
    }
  };
  
  const handleEdit = () => {
    navigate(`/blog/edit/${id}`);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="marketplace-container py-24 flex justify-center">
          <p>Loading post...</p>
        </div>
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="marketplace-container py-24 flex flex-col items-center">
          <p className="text-red-500 mb-4">Blog post not found</p>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const isAuthor = user && post.author === user.id;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="marketplace-container py-24">
        <Link to="/blog" className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to blog
        </Link>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {post.image && (
            <div className="h-64 md:h-96 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                <div className="flex items-center text-gray-500 mb-4">
                  <span>By {post.authorName}</span>
                  <span className="mx-2">•</span>
                  <span>{format(new Date(post.createdAt || Date.now()), 'MMMM dd, yyyy')}</span>
                </div>
              </div>
              
              {isAuthor && (
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center"
                    onClick={handleEdit}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              )}
            </div>

            {/* Social Share Component */}
            <div className="mb-6">
              <SocialShare 
                title={post.title}
                description={post.content?.substring(0, 150) + '...' || ''}
              />
            </div>
            
            <Separator className="my-6" />
            
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: marked(post.content || '') }}
            />
            
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
