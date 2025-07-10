
import { SimpleBlogUser } from '@/contexts/SimpleBlogAuthContext';

export interface SimpleBlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorName: string;
  image?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'blog_posts';

const getStoredPosts = (): SimpleBlogPost[] => {
  try {
    const posts = localStorage.getItem(STORAGE_KEY);
    return posts ? JSON.parse(posts) : [];
  } catch {
    return [];
  }
};

const setStoredPosts = (posts: SimpleBlogPost[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const getBlogPosts = async (): Promise<SimpleBlogPost[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return getStoredPosts().sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const getBlogPost = async (id: string): Promise<SimpleBlogPost | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const posts = getStoredPosts();
  return posts.find(post => post.id === id) || null;
};

export const createBlogPost = async (data: {
  title: string;
  content: string;
  author: string;
  authorName: string;
  image?: string;
  tags?: string[];
}): Promise<SimpleBlogPost> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const posts = getStoredPosts();
  const newPost: SimpleBlogPost = {
    id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  posts.push(newPost);
  setStoredPosts(posts);
  
  return newPost;
};

export const updateBlogPost = async (id: string, data: {
  title?: string;
  content?: string;
  image?: string;
  tags?: string[];
}): Promise<SimpleBlogPost | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const posts = getStoredPosts();
  const postIndex = posts.findIndex(post => post.id === id);
  
  if (postIndex === -1) {
    return null;
  }
  
  posts[postIndex] = {
    ...posts[postIndex],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  setStoredPosts(posts);
  return posts[postIndex];
};

export const deleteBlogPost = async (id: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const posts = getStoredPosts();
  const filteredPosts = posts.filter(post => post.id !== id);
  
  if (filteredPosts.length === posts.length) {
    return false; // Post not found
  }
  
  setStoredPosts(filteredPosts);
  return true;
};
