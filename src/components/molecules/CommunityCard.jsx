import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Tooltip from "@/components/atoms/Tooltip";
import communityService from "@/services/api/communityService";

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

const [activityStats, setActivityStats] = useState(null);

  useEffect(() => {
    const fetchActivityStats = async () => {
      try {
        const stats = await communityService.getActivityStats(community.Id);
        setActivityStats(stats);
      } catch (error) {
        console.error('Failed to fetch activity stats:', error);
      }
    };

    fetchActivityStats();
  }, [community.Id]);

  const renderTooltipContent = () => {
    if (!activityStats) {
      return (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Loading activity...</span>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <div className="font-medium text-white mb-2">Recent Activity</div>
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ApperIcon name="MessageSquare" size={12} className="text-blue-300" />
              <span className="text-gray-200">New posts</span>
            </div>
            <span className="text-white font-medium">{activityStats.newPosts}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ApperIcon name="UserPlus" size={12} className="text-green-300" />
              <span className="text-gray-200">Members joined</span>
            </div>
            <span className="text-white font-medium">{activityStats.newMembers}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ApperIcon name="TrendingUp" size={12} className="text-orange-300" />
              <span className="text-gray-200">Active discussions</span>
            </div>
            <span className="text-white font-medium">{activityStats.activeDiscussions}</span>
          </div>
          {activityStats.lastActive && (
            <div className="pt-1 mt-2 border-t border-gray-600">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Clock" size={12} className="text-gray-400" />
                <span className="text-gray-300 text-xs">Last active {activityStats.lastActive}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Tooltip
      content={renderTooltipContent()}
      position="top"
      delay={500}
      className="w-64"
    >
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
    </Tooltip>
  );
};

export default CommunityCard;