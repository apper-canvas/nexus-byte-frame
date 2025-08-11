import React, { useState } from "react";
import { motion } from "framer-motion";
import PostCreationForm from "@/components/organisms/PostCreationForm";
import ApperIcon from "@/components/ApperIcon";
import DiscussionPost from "@/components/molecules/DiscussionPost";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const DiscussionFeed = ({ 
  discussions = [],
  loading = false,
  error = null,
  onDiscussionClick,
  onCreatePost,
  onRetry,
  className 
}) => {
  const [showPostForm, setShowPostForm] = useState(false);
  const [creatingPost, setCreatingPost] = useState(false);

  const handleCreatePost = async (postData) => {
    if (!onCreatePost) return;
    
    setCreatingPost(true);
    try {
      await onCreatePost(postData);
      setShowPostForm(false);
    } finally {
      setCreatingPost(false);
    }
  };
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!discussions.length) {
    return (
      <Empty
        title="No discussions yet"
description="Be the first to start a conversation in this community! Share your thoughts and engage with fellow members."
        actionLabel="Create First Post"
        onAction={() => setShowPostForm(true)}
        icon="MessageSquare"
      />
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 font-display">
          Recent Discussions
        </h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {discussions.length} posts
          </span>
          <Button
            onClick={() => setShowPostForm(true)}
            variant="primary"
            size="sm"
            className="flex items-center space-x-2"
          >
            <ApperIcon name="Plus" size={16} />
            <span>New Post</span>
          </Button>
        </div>
      </div>

      {/* Post Creation Form Modal */}
      <PostCreationForm
        isOpen={showPostForm}
        onClose={() => setShowPostForm(false)}
        onSubmit={handleCreatePost}
        communityId={discussions[0]?.communityId}
        loading={creatingPost}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {discussions.map((discussion) => (
          <motion.div key={discussion.Id} variants={itemVariants}>
            <DiscussionPost
              discussion={discussion}
              onClick={onDiscussionClick}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DiscussionFeed;