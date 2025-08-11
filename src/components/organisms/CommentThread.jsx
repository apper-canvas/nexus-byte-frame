import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import CommentInput from '@/components/molecules/CommentInput';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

function CommentThread({ comment, onReply, onUpvote, level = 0, maxLevel = 5 }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [repliesCollapsed, setRepliesCollapsed] = useState(false);

  const handleReply = async (replyData) => {
    try {
      await onReply(comment.Id, replyData);
      setShowReplyInput(false);
    } catch (err) {
      // Error handled by parent
    }
  };

  const handleUpvote = () => {
    onUpvote(comment.Id);
  };

  const toggleReplies = () => {
    setRepliesCollapsed(!repliesCollapsed);
  };

  const hasReplies = comment.replies && comment.replies.length > 0;
  const canReply = level < maxLevel;
  const indentLevel = Math.min(level, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "relative",
        level > 0 && "ml-4 md:ml-6"
      )}
    >
      {/* Indent line for nested comments */}
      {level > 0 && (
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 to-transparent" />
      )}

      <div
        className={cn(
          "relative bg-gray-50 rounded-xl p-4 transition-all duration-200",
          level > 0 && "ml-4 border-l-2 border-gray-200",
          collapsed && "opacity-60"
        )}
        style={{
          paddingLeft: level > 0 ? `${Math.min(level * 12, 60)}px` : undefined
        }}
      >
        {/* Comment Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {comment.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-gray-900">{comment.author}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">
                {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
              </span>
            </div>
          </div>
          
          {hasReplies && (
            <Button
              onClick={toggleReplies}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700 px-2 py-1"
            >
              <ApperIcon 
                name={repliesCollapsed ? "ChevronDown" : "ChevronUp"} 
                size={14} 
              />
            </Button>
          )}
        </div>

        {/* Comment Content */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-gray-800 mb-3 leading-relaxed">{comment.content}</p>

              {/* Comment Actions */}
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleUpvote}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-primary-600 hover:bg-primary-50 px-2 py-1"
                >
                  <ApperIcon name="ArrowUp" size={14} className="mr-1" />
                  {comment.upvoteCount || 0}
                </Button>

                {canReply && (
                  <Button
                    onClick={() => setShowReplyInput(!showReplyInput)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700 px-2 py-1"
                  >
                    <ApperIcon name="Reply" size={14} className="mr-1" />
                    Reply
                  </Button>
                )}

                {hasReplies && (
                  <span className="text-sm text-gray-500">
                    {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                  </span>
                )}
              </div>

              {/* Reply Input */}
              <AnimatePresence>
                {showReplyInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 pl-4 border-l-2 border-primary-200"
                  >
                    <CommentInput
                      onSubmit={handleReply}
                      onCancel={() => setShowReplyInput(false)}
                      placeholder={`Reply to ${comment.author}...`}
                      submitText="Reply"
                      showCancel={true}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nested Replies */}
      <AnimatePresence>
        {hasReplies && !repliesCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 space-y-2"
          >
            {comment.replies.map((reply) => (
              <CommentThread
                key={reply.Id}
                comment={reply}
                onReply={onReply}
                onUpvote={onUpvote}
                level={level + 1}
                maxLevel={maxLevel}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CommentThread;