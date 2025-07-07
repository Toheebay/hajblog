
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { getBlogPosts } from '@/services/blogService';
import type { BlogPost } from '@/services/blogService';
import { format } from 'date-fns';
import { BookOpen, PenTool, AlertCircle, Users, ExternalLink } from 'lucide-react';

const categories = [
  'All Posts',
  'Hajj Experience',
  'Spiritual Journey', 
  'Travel Tips',
  'Islamic History',
  'Community Stories',
  'Advice & Guidance',
  'Personal Reflection'
];

const Blog = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getBlogPosts,
    retry: 2,
    retryDelay: 1000
  });

  console.log('Blog posts data:', posts);
  console.log('Blog loading state:', isLoading);
  console.log('Blog error:', error);

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
    console.error('Blog error details:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <Navbar />
        <div className="marketplace-container py-24 flex flex-col items-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 text-center border-red-200 border max-w-md">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Blog Service Unavailable</h3>
            <p className="text-gray-600 mb-4">
              We're experiencing technical difficulties with the blog service. This might be because the backend server is not running.
            </p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Ensure posts is an array
  const blogPosts = Array.isArray(posts) ? posts : [];

  // Filter posts by category
  const filteredPosts = selectedCategory === 'All Posts' 
    ? blogPosts 
    : blogPosts.filter(post => 
        post.tags && post.tags.some(tag => 
          tag.toLowerCase().includes(selectedCategory.toLowerCase().replace(' ', ''))
        )
      );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12 md:py-16">
        <div className="marketplace-container text-center">
          <div className="text-4xl md:text-6xl mb-4">📖</div>
          <h1 className="text-2xl md:text-4xl font-bold mb-4">Hajj Community Blog</h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mb-6">
            Share your experiences, learn from fellow pilgrims, and connect with the Hajj community
          </p>
          
          {/* Medium Profile Link */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
            <p className="text-emerald-100 text-sm mb-2">Follow our featured writer:</p>
            <a 
              href="https://medium.com/@adebayotoheeb" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-white hover:text-emerald-200 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              @adebayotoheeb on Medium
            </a>
          </div>
        </div>
      </div>
      
      <div className="marketplace-container py-8 md:py-16">
        {/* Categories Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Browse by Category</h3>
          
          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-2 pb-4">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    className={`flex-shrink-0 ${
                      selectedCategory === category 
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                        : "hover:bg-emerald-50 hover:text-emerald-700 border-emerald-200"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Desktop: Wrapped grid */}
          <div className="hidden md:flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className={
                  selectedCategory === category 
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                    : "hover:bg-emerald-50 hover:text-emerald-700 border-emerald-200"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              {selectedCategory === 'All Posts' ? 'Community Posts' : selectedCategory}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
            </p>
          </div>
          {user && (
            <Link to="/blog/create">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto">
                <PenTool className="h-4 w-4 mr-2" />
                Share Your Story
              </Button>
            </Link>
          )}
        </div>
        
        {filteredPosts.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm p-6 md:p-8 text-center border-emerald-200">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="bg-emerald-100 rounded-full p-6 mb-6">
                <Users className="h-12 w-12 text-emerald-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
                {selectedCategory === 'All Posts' ? 'Welcome to Our Community Blog' : `No posts in ${selectedCategory}`}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                {selectedCategory === 'All Posts' 
                  ? 'This is where pilgrims share experiences, insights, and guidance for the Hajj journey. Be the first to share your story!'
                  : `Be the first to share content in the ${selectedCategory} category!`
                }
              </p>
              {user ? (
                <Link to="/blog/create">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <PenTool className="h-4 w-4 mr-2" />
                    Create First Post
                  </Button>
                </Link>
              ) : (
                <p className="text-gray-500">Please log in to share your story</p>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredPosts.map((post: BlogPost) => (
              <Card key={post.id} className="overflow-hidden bg-white/80 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300">
                {post.image && (
                  <div className="h-40 md:h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader className="pb-2 p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 line-clamp-2">{post.title}</h2>
                  <p className="text-xs md:text-sm text-gray-500">
                    By {post.authorName} • {format(new Date(post.createdAt || Date.now()), 'MMM dd, yyyy')}
                  </p>
                </CardHeader>
                <CardContent className="pb-2 p-4 md:p-6 md:pt-0">
                  <p className="text-sm md:text-base text-gray-600 line-clamp-3">
                    {post.content.substring(0, 120)}...
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 md:gap-2 mt-3 md:mt-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-emerald-100 text-emerald-800 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-4 md:p-6 md:pt-0">
                  <Link to={`/blog/${post.id}`} className="w-full">
                    <Button variant="ghost" className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 text-sm md:text-base">
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
