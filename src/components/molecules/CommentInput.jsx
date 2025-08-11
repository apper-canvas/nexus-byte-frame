import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

function CommentInput({ 
  onSubmit, 
  onCancel, 
  placeholder = "Add a comment...", 
  submitText = "Comment",
  showCancel = false,
  maxLength = 500 
}) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || loading) return;

    try {
      setLoading(true);
      await onSubmit({
        content: content.trim(),
        author: "CurrentUser", // In a real app, this would come from auth context
        timestamp: new Date().toISOString(),
        upvoteCount: 0
      });
      setContent('');
    } catch (err) {
      // Error handled by parent
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setContent('');
    onCancel?.();
  };

  const remainingChars = maxLength - content.length;
  const isOverLimit = remainingChars < 0;
  const isNearLimit = remainingChars <= 50 && remainingChars > 0;

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-3"
    >
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={cn(
            "w-full px-4 py-3 border border-gray-200 rounded-xl resize-none",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "placeholder-gray-500 text-gray-800 transition-all duration-200",
            isOverLimit && "border-red-300 focus:ring-red-500"
          )}
          disabled={loading}
        />
        
        {/* Character Counter */}
        <div className={cn(
          "absolute bottom-2 right-2 text-xs font-medium",
          isOverLimit && "text-red-500",
          isNearLimit && "text-amber-500",
          !isNearLimit && !isOverLimit && "text-gray-400"
        )}>
          {remainingChars} left
        </div>
      </div>

      {/* Helper text for over limit */}
      {isOverLimit && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 flex items-center gap-1"
        >
          <ApperIcon name="AlertCircle" size={14} />
          Comment is too long. Please keep it under {maxLength} characters.
        </motion.p>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        {showCancel && (
          <Button
            type="button"
            onClick={handleCancel}
            variant="ghost"
            size="sm"
            disabled={loading}
          >
            Cancel
          </Button>
        )}
        
        <Button
          type="submit"
          disabled={!content.trim() || loading || isOverLimit}
          size="sm"
          className="min-w-[80px]"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
              Posting...
            </div>
          ) : (
            <>
              <ApperIcon name="Send" size={14} className="mr-1" />
              {submitText}
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
}

export default CommentInput;