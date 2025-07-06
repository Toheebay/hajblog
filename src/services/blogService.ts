
import api from './api';

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  author: string;
  authorName: string;
  image?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export const getBlogPosts = async () => {
  try {
    const response = await api.get('/blog');
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return empty array on error to prevent crash
    return [];
  }
};

export const getBlogPost = async (id: string) => {
  try {
    const response = await api.get(`/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};

export const createBlogPost = async (postData: Partial<BlogPost>) => {
  try {
    const response = await api.post('/blog', postData);
    return response.data;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

export const updateBlogPost = async (id: string, postData: Partial<BlogPost>) => {
  try {
    const response = await api.patch(`/blog/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};

export const deleteBlogPost = async (id: string) => {
  try {
    const response = await api.delete(`/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};
