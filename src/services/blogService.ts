
import { supabase } from '@/integrations/supabase/client';

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
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data?.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      authorName: post.author_name,
      image: post.image,
      tags: post.tags,
      createdAt: post.created_at,
      updatedAt: post.updated_at
    })) || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const getBlogPost = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      author: data.author,
      authorName: data.author_name,
      image: data.image,
      tags: data.tags,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};

export const createBlogPost = async (postData: Partial<BlogPost>) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: postData.title!,
        content: postData.content!,
        author: postData.author!,
        author_name: postData.authorName!,
        image: postData.image,
        tags: postData.tags
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      author: data.author,
      authorName: data.author_name,
      image: data.image,
      tags: data.tags,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

export const updateBlogPost = async (id: string, postData: Partial<BlogPost>) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        title: postData.title,
        content: postData.content,
        image: postData.image,
        tags: postData.tags
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      author: data.author,
      authorName: data.author_name,
      image: data.image,
      tags: data.tags,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};

export const deleteBlogPost = async (id: string) => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};
