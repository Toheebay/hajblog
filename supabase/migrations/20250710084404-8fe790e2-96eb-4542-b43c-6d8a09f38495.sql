
-- Create comments table for blog posts
CREATE TABLE IF NOT EXISTS public.blog_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  user_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for blog comments
CREATE POLICY "Anyone can view blog comments" ON public.blog_comments FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert blog comments" ON public.blog_comments 
FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid()::text = user_id);

CREATE POLICY "Users can update their own blog comments" ON public.blog_comments 
FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own blog comments" ON public.blog_comments 
FOR DELETE USING (auth.uid()::text = user_id);

-- Create trigger to automatically update updated_at for comments
CREATE TRIGGER update_blog_comments_updated_at 
    BEFORE UPDATE ON public.blog_comments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
