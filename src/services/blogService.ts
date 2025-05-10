
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
  const response = await api.get('/blog');
  return response.data;
};

export const getBlogPost = async (id: string) => {
  const response = await api.get(`/blog/${id}`);
  return response.data;
};

export const createBlogPost = async (postData: Partial<BlogPost>) => {
  const response = await api.post('/blog', postData);
  return response.data;
};

export const updateBlogPost = async (id: string, postData: Partial<BlogPost>) => {
  const response = await api.patch(`/blog/${id}`, postData);
  return response.data;
};

export const deleteBlogPost = async (id: string) => {
  const response = await api.delete(`/blog/${id}`);
  return response.data;
};
