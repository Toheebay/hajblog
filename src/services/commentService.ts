
import { supabase } from '@/integrations/supabase/client';

export interface BlogComment {
  id?: string;
  blog_post_id: string;
  user_id: string;
  user_name: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

export const getBlogComments = async (blogPostId: string) => {
  try {
    const { data, error } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('blog_post_id', blogPostId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return data?.map(comment => ({
      id: comment.id,
      blog_post_id: comment.blog_post_id,
      user_id: comment.user_id,
      user_name: comment.user_name,
      content: comment.content,
      created_at: comment.created_at,
      updated_at: comment.updated_at
    })) || [];
  } catch (error) {
    console.error('Error fetching blog comments:', error);
    return [];
  }
};

export const createBlogComment = async (commentData: Partial<BlogComment>) => {
  try {
    const { data, error } = await supabase
      .from('blog_comments')
      .insert({
        blog_post_id: commentData.blog_post_id!,
        user_id: commentData.user_id!,
        user_name: commentData.user_name!,
        content: commentData.content!
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      blog_post_id: data.blog_post_id,
      user_id: data.user_id,
      user_name: data.user_name,
      content: data.content,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  } catch (error) {
    console.error('Error creating blog comment:', error);
    throw error;
  }
};

export const updateBlogComment = async (id: string, commentData: Partial<BlogComment>) => {
  try {
    const { data, error } = await supabase
      .from('blog_comments')
      .update({
        content: commentData.content
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      blog_post_id: data.blog_post_id,
      user_id: data.user_id,
      user_name: data.user_name,
      content: data.content,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  } catch (error) {
    console.error('Error updating blog comment:', error);
    throw error;
  }
};

export const deleteBlogComment = async (id: string) => {
  try {
    const { error } = await supabase
      .from('blog_comments')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error deleting blog comment:', error);
    throw error;
  }
};
