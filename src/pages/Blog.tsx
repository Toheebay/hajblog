
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { getBlogPosts } from '@/services/blogService';
import type { BlogPost } from '@/services/blogService';
import { format } from 'date-fns';
import { BookOpen } from 'lucide-react';

const Blog = () => {
  const { user } = useAuth();
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getBlogPosts
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="marketplace-container py-24 flex justify-center">
          <p>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="marketplace-container py-24 flex flex-col items-center">
          <p className="text-red-500 mb-4">Error loading blog posts</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="marketplace-container py-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog</h1>
          {user && (
            <Link to="/blog/create">
              <Button className="bg-marketplace-primary hover:bg-marketplace-dark">
                Create New Post
              </Button>
            </Link>
          )}
        </div>
        
        {posts?.length === 0 ? (
          <Card className="bg-white p-8 text-center">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No Blog Posts Yet</h3>
              <p className="text-gray-500 mb-6">
                Be the first to publish content on our blog!
              </p>
              {user && (
                <Link to="/blog/create">
                  <Button className="bg-marketplace-primary hover:bg-marketplace-dark">
                    Create First Post
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post: BlogPost) => (
              <Card key={post.id} className="overflow-hidden">
                {post.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="text-sm text-gray-500">
                    By {post.authorName} • {format(new Date(post.createdAt || Date.now()), 'MMMM dd, yyyy')}
                  </p>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-gray-600 line-clamp-3">
                    {post.content.substring(0, 150)}...
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Link to={`/blog/${post.id}`}>
                    <Button variant="ghost">Read More</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
