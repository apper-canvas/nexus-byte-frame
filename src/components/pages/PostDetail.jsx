import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import discussionService from '@/services/api/discussionService';
import CommentThread from '@/components/organisms/CommentThread';
import CommentInput from '@/components/molecules/CommentInput';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    loadPost();
    loadComments();
  }, [id]);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const postData = await discussionService.getById(parseInt(id));
      setPost(postData);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      setCommentsLoading(true);
      const commentsData = await discussionService.getComments(parseInt(id));
      setComments(commentsData);
    } catch (err) {
      toast.error('Failed to load comments');
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleUpvotePost = async () => {
    try {
      await discussionService.upvote(post.Id);
      setPost(prev => ({ ...prev, upvoteCount: prev.upvoteCount + 1 }));
      toast.success('Post upvoted!');
    } catch (err) {
      toast.error('Failed to upvote post');
    }
  };

  const handleAddComment = async (commentData) => {
    try {
      const newComment = await discussionService.addComment(parseInt(id), commentData);
      setComments(prev => [newComment, ...prev]);
      setPost(prev => ({ ...prev, commentCount: prev.commentCount + 1 }));
      toast.success('Comment added!');
      return newComment;
    } catch (err) {
      toast.error('Failed to add comment');
      throw err;
    }
  };

  const handleAddReply = async (parentId, replyData) => {
    try {
      const newReply = await discussionService.addReply(parseInt(id), parentId, replyData);
      setComments(prev => {
        const updateReplies = (comments) => {
          return comments.map(comment => {
            if (comment.Id === parentId) {
              return { ...comment, replies: [newReply, ...(comment.replies || [])] };
            }
            if (comment.replies) {
              return { ...comment, replies: updateReplies(comment.replies) };
            }
            return comment;
          });
        };
        return updateReplies(prev);
      });
      toast.success('Reply added!');
      return newReply;
    } catch (err) {
      toast.error('Failed to add reply');
      throw err;
    }
  };

  const handleUpvoteComment = async (commentId) => {
    try {
      await discussionService.upvoteComment(commentId);
      setComments(prev => {
        const updateUpvotes = (comments) => {
          return comments.map(comment => {
            if (comment.Id === commentId) {
              return { ...comment, upvoteCount: comment.upvoteCount + 1 };
            }
            if (comment.replies) {
              return { ...comment, replies: updateUpvotes(comment.replies) };
            }
            return comment;
          });
        };
        return updateUpvotes(prev);
      });
      toast.success('Comment upvoted!');
    } catch (err) {
      toast.error('Failed to upvote comment');
    }
  };

  const getSortedComments = () => {
    const sortComments = (comments) => {
      const sorted = [...comments].sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.timestamp) - new Date(a.timestamp);
        } else {
          return b.upvoteCount - a.upvoteCount;
        }
      });
      
      return sorted.map(comment => ({
        ...comment,
        replies: comment.replies ? sortComments(comment.replies) : []
      }));
    };
    
    return sortComments(comments);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={loadPost}
        title="Failed to load post"
      />
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <ApperIcon name="FileQuestion" size={48} className="text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Post not found</h2>
        <p className="text-gray-500 mb-4">The post you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate(-1)} variant="outline">
          <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* Back Button */}
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        className="mb-6 text-gray-600 hover:text-gray-800"
      >
        <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
        Back
      </Button>

      {/* Post Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {post.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="font-medium">{post.author}</span>
          </div>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</span>
        </div>

        {/* Post content - this would be the full post body */}
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 leading-relaxed">
            This is where the full post content would be displayed. In a real application, 
            this would contain the complete post body, images, and other rich content.
          </p>
        </div>

        {/* Post Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          <Button
            onClick={handleUpvotePost}
            variant="ghost"
            className="text-gray-600 hover:text-primary-600 hover:bg-primary-50"
          >
            <ApperIcon name="ArrowUp" size={16} className="mr-1" />
            {post.upvoteCount}
          </Button>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 text-sm">
            <ApperIcon name="MessageCircle" size={16} className="inline mr-1" />
            {post.commentCount} comments
          </span>
        </div>
      </motion.div>

      {/* Comments Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Comments</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="newest">Newest first</option>
              <option value="upvotes">Most upvoted</option>
            </select>
          </div>
        </div>

        {/* Add Comment */}
        <div className="mb-6">
          <CommentInput
            onSubmit={handleAddComment}
            placeholder="Share your thoughts..."
            submitText="Comment"
          />
        </div>

        {/* Comments List */}
        {commentsLoading ? (
          <Loading />
        ) : (
          <div className="space-y-4">
            {getSortedComments().map((comment) => (
              <CommentThread
                key={comment.Id}
                comment={comment}
                onReply={handleAddReply}
                onUpvote={handleUpvoteComment}
                level={0}
                maxLevel={5}
              />
            ))}
            {comments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <ApperIcon name="MessageCircle" size={32} className="mx-auto mb-2 text-gray-400" />
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default PostDetail;