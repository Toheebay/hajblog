
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { AuthModal } from '@/components/AuthModal';
import { getBlogComments, createBlogComment, updateBlogComment, deleteBlogComment } from '@/services/commentService';
import { format } from 'date-fns';
import { MessageCircle, Edit, Trash2, Send, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface BlogCommentsProps {
  blogPostId: string;
}

const BlogComments: React.FC<BlogCommentsProps> = ({ blogPostId }) => {
  const { user } = useSupabaseAuth();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { data: comments, isLoading } = useQuery({
    queryKey: ['blogComments', blogPostId],
    queryFn: () => getBlogComments(blogPostId),
    enabled: !!blogPostId
  });

  const createMutation = useMutation({
    mutationFn: createBlogComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogComments', blogPostId] });
      setNewComment('');
      toast.success('Comment added successfully');
    },
    onError: () => {
      toast.error('Failed to add comment');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateBlogComment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogComments', blogPostId] });
      setEditingComment(null);
      setEditContent('');
      toast.success('Comment updated successfully');
    },
    onError: () => {
      toast.error('Failed to update comment');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlogComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogComments', blogPostId] });
      toast.success('Comment deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete comment');
    }
  });

  const handleSubmitComment = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    createMutation.mutate({
      blog_post_id: blogPostId,
      user_id: user.id,
      user_name: user.user_metadata?.username || user.email?.split('@')[0] || 'Anonymous',
      content: newComment.trim()
    });
  };

  const handleEditComment = (commentId: string, currentContent: string) => {
    setEditingComment(commentId);
    setEditContent(currentContent);
  };

  const handleUpdateComment = (commentId: string) => {
    if (!editContent.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    updateMutation.mutate({
      id: commentId,
      data: { content: editContent.trim() }
    });
  };

  const handleDeleteComment = (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteMutation.mutate(commentId);
    }
  };

  if (isLoading) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          Comments
        </h3>
        <p className="text-gray-600">Loading comments...</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <MessageCircle className="h-5 w-5 mr-2" />
        Comments ({comments?.length || 0})
      </h3>

      {/* Add Comment Section */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <h4 className="font-medium">Add a Comment</h4>
        </CardHeader>
        <CardContent>
          {user ? (
            <div className="space-y-3">
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleSubmitComment}
                  disabled={createMutation.isPending || !newComment.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {createMutation.isPending ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-3">Please sign in to leave a comment</p>
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Sign In to Comment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id} className="bg-gray-50">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-medium text-gray-900">{comment.user_name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {format(new Date(comment.created_at || Date.now()), 'MMM dd, yyyy at HH:mm')}
                    </span>
                  </div>
                  {user && comment.user_id === user.id && (
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditComment(comment.id!, comment.content)}
                        className="text-gray-600 hover:text-emerald-600"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteComment(comment.id!)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                
                {editingComment === comment.id ? (
                  <div className="space-y-3">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleUpdateComment(comment.id!)}
                        disabled={updateMutation.isPending}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        {updateMutation.isPending ? 'Saving...' : 'Save'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingComment(null);
                          setEditContent('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="bg-gray-50">
            <CardContent className="pt-6 text-center">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No comments yet. Be the first to share your thoughts!</p>
            </CardContent>
          </Card>
        )}
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default BlogComments;
