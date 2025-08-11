import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "Nothing here yet",
  description = "Check back later for new content.",
  actionLabel = "Refresh",
  onAction,
  icon = "Search"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} className="h-10 w-10 text-primary-500" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 font-display mb-3">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>
        
        {onAction && (
          <Button
            onClick={onAction}
            variant="primary"
            size="lg"
            className="min-w-32"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;