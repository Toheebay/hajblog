
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
import { BookOpen, PenTool } from 'lucide-react';

const Blog = () => {
  const { user } = useAuth();
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getBlogPosts
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <Navbar />
        <div className="marketplace-container py-24 flex justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">🕋</div>
            <p className="text-gray-600">Loading Hajj insights...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <Navbar />
        <div className="marketplace-container py-24 flex flex-col items-center">
          <p className="text-red-500 mb-4">Error loading blog posts</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="marketplace-container text-center">
          <div className="text-6xl mb-4">📖</div>
          <h1 className="text-4xl font-bold mb-4">Hajj Ambassador Blog</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Daily insights, guidance, and stories from your journey to the sacred lands
          </p>
        </div>
      </div>
      
      <div className="marketplace-container py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Latest Posts</h2>
            <p className="text-gray-600 mt-1">Stay updated with daily Hajj guidance</p>
          </div>
          {user?.isAdmin && (
            <Link to="/blog/create">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <PenTool className="h-4 w-4 mr-2" />
                Create New Post
              </Button>
            </Link>
          )}
        </div>
        
        {posts?.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm p-8 text-center border-emerald-200">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="bg-emerald-100 rounded-full p-6 mb-6">
                <BookOpen className="h-12 w-12 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Welcome to Our Blog</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                This is where we'll share daily insights, tips, and guidance for your Hajj journey. 
                Check back regularly for new content!
              </p>
              {user?.isAdmin && (
                <Link to="/blog/create">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <PenTool className="h-4 w-4 mr-2" />
                    Create First Post
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: BlogPost) => (
              <Card key={post.id} className="overflow-hidden bg-white/80 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300">
                {post.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">{post.title}</h2>
                  <p className="text-sm text-gray-500">
                    By {post.authorName} • {format(new Date(post.createdAt || Date.now()), 'MMMM dd, yyyy')}
                  </p>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-gray-600 line-clamp-3">
                    {post.content.substring(0, 150)}...
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Link to={`/blog/${post.id}`} className="w-full">
                    <Button variant="ghost" className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                      Read More →
                    </Button>
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
