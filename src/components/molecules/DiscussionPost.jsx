import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const DiscussionPost = ({ 
  discussion, 
  onClick, 
  className 
}) => {
  const handleClick = () => {
    toast.info("Discussion view coming soon! 🚀");
    onClick?.(discussion);
  };

  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white rounded-lg border border-gray-200 hover:border-primary-200 hover:shadow-md transition-all duration-200 cursor-pointer group",
        className
      )}
      onClick={handleClick}
    >
      <div className="p-4 border-l-4 border-transparent group-hover:border-primary-400 transition-colors duration-200">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-medium text-gray-900 font-display line-clamp-2 group-hover:text-primary-700 transition-colors pr-4">
            {discussion.title}
          </h3>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="font-medium text-gray-700">{discussion.author}</span>
          <span className="mx-2">•</span>
          <span>{formatDistanceToNow(new Date(discussion.timestamp), { addSuffix: true })}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <ApperIcon name="MessageCircle" className="h-4 w-4 mr-1" />
              <span>{discussion.commentCount}</span>
            </div>
            <div className="flex items-center">
              <ApperIcon name="ArrowUp" className="h-4 w-4 mr-1" />
              <span>{discussion.upvoteCount}</span>
            </div>
          </div>

          <div className="flex items-center text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs mr-1">View discussion</span>
            <ApperIcon name="ArrowRight" className="h-3 w-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiscussionPost;