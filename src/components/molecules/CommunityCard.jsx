import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const CommunityCard = ({ 
  community, 
  onClick, 
  className,
  onJoin
}) => {
  const handleJoinClick = (e) => {
    e.stopPropagation();
    onJoin?.(community);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 cursor-pointer overflow-hidden transition-all duration-300 group",
        className
      )}
      onClick={onClick}
    >
      {/* Community Image */}
      <div className="h-32 bg-gradient-to-br from-primary-400 to-secondary-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
        <div className="absolute bottom-3 left-4 right-4">
          <Badge variant="primary" className="backdrop-blur-sm bg-white/20 text-white border border-white/30">
            {community.category}
          </Badge>
        </div>
      </div>

      {/* Community Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 font-display line-clamp-1 group-hover:text-primary-600 transition-colors">
            {community.name}
          </h3>
          {community.isJoined && (
            <ApperIcon name="Check" className="h-5 w-5 text-green-500 flex-shrink-0 ml-2" />
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {community.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <ApperIcon name="Users" className="h-4 w-4 mr-1" />
            <span className="font-medium">
              {community.memberCount.toLocaleString()} members
            </span>
          </div>

          <Button
            variant={community.isJoined ? "secondary" : "primary"}
            size="sm"
            onClick={handleJoinClick}
            className="text-xs px-3 py-1.5"
          >
            {community.isJoined ? "Joined" : "Join"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityCard;