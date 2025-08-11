import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const CommunityHeader = ({ 
  community,
  onJoin,
  onBack,
  className 
}) => {
  if (!community) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("bg-white rounded-xl shadow-lg overflow-hidden", className)}
    >
      {/* Hero Section */}
      <div className="h-48 bg-gradient-to-br from-primary-500 via-secondary-500 to-primary-600 relative">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all group"
        >
          <ApperIcon name="ArrowLeft" className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Community Badge */}
        <div className="absolute bottom-6 left-6">
          <Badge variant="primary" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 text-sm px-3 py-1">
            {community.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 font-display mb-2">
              {community.name}
            </h1>
            <p className="text-gray-600 leading-relaxed">
              {community.description}
            </p>
          </div>

          <div className="ml-6 flex-shrink-0">
            <Button
              variant={community.isJoined ? "secondary" : "primary"}
              size="lg"
              onClick={() => onJoin(community)}
              className="font-medium"
            >
              {community.isJoined ? (
                <>
                  <ApperIcon name="Check" className="h-4 w-4 mr-2" />
                  Joined
                </>
              ) : (
                <>
                  <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                  Join Community
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
          <div className="flex items-center">
            <ApperIcon name="Users" className="h-4 w-4 mr-1" />
            <span className="font-medium text-gray-700">
              {community.memberCount.toLocaleString()}
            </span>
            <span className="ml-1">members</span>
          </div>
          
          <div className="flex items-center">
            <ApperIcon name="Calendar" className="h-4 w-4 mr-1" />
            <span>Created {formatDistanceToNow(new Date(community.createdAt), { addSuffix: true })}</span>
          </div>

          {community.isJoined && (
            <div className="flex items-center text-green-600">
              <ApperIcon name="CheckCircle" className="h-4 w-4 mr-1" />
              <span className="font-medium">Member</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityHeader;