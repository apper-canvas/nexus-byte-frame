import React from "react";
import { motion } from "framer-motion";
import DiscussionPost from "@/components/molecules/DiscussionPost";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useTrendingDiscussions } from "@/hooks/useDiscussions";

const Trending = () => {
  const { discussions, loading, error, loadTrendingDiscussions } = useTrendingDiscussions();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <Error
            title="Failed to load trending discussions"
            message={error}
            onRetry={loadTrendingDiscussions}
          />
        </div>
      </div>
    );
  }

  if (!discussions.length) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <Empty
            title="No trending discussions"
            description="Check back later to see the hottest discussions across all communities!"
            icon="TrendingUp"
          />
        </div>
      </div>
    );
  }

  const handleDiscussionClick = (discussion) => {
    // Future implementation for discussion detail view
    console.log("Discussion clicked:", discussion);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background pb-20 md:pb-0"
    >
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center mb-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-accent-400 to-accent-500 rounded-lg flex items-center justify-center mr-3">
              <ApperIcon name="TrendingUp" className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-display gradient-text">
              Trending Discussions
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            The hottest discussions happening right now across all communities
          </motion.p>
        </div>

        {/* Trending Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-accent-50 to-accent-100 rounded-lg p-4 mb-6 border border-accent-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center text-accent-700">
              <ApperIcon name="Flame" className="h-5 w-5 mr-2" />
              <span className="font-medium">{discussions.length} hot discussions</span>
            </div>
            <div className="flex items-center text-sm text-accent-600">
              <ApperIcon name="Clock" className="h-4 w-4 mr-1" />
              <span>Updated every hour</span>
            </div>
          </div>
        </motion.div>

        {/* Discussion Feed */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
          className="space-y-3"
        >
          {discussions.map((discussion, index) => (
            <motion.div
              key={discussion.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              {/* Trending Rank */}
              <div className="absolute -left-12 top-4 w-8 h-8 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10 hidden sm:flex">
                {index + 1}
              </div>
              
              <DiscussionPost
                discussion={discussion}
                onClick={handleDiscussionClick}
                className={index < 3 ? "ring-2 ring-accent-200 border-accent-300" : ""}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Trending;