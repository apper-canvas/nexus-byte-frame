import React from "react";
import { motion } from "framer-motion";
import DiscussionPost from "@/components/molecules/DiscussionPost";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useFeedDiscussions } from "@/hooks/useDiscussions";

const MyFeed = () => {
  const { discussions, loading, error, loadFeedDiscussions } = useFeedDiscussions();

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
            title="Failed to load feed"
            message={error}
            onRetry={loadFeedDiscussions}
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
            title="Your feed is empty"
            description="Join some communities to see discussions from your favorite topics here!"
            actionLabel="Discover Communities"
            onAction={() => window.location.href = "/"}
            icon="BookOpen"
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
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-bold text-gray-900 font-display gradient-text mb-2"
          >
            My Feed
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            Latest discussions from communities you've joined
          </motion.p>
        </div>

        {/* Feed Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-4 mb-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <ApperIcon name="Activity" className="h-5 w-5 mr-2" />
              <span>{discussions.length} new discussions</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <ApperIcon name="Clock" className="h-4 w-4 mr-1" />
              <span>Last updated now</span>
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
            >
              <DiscussionPost
                discussion={discussion}
                onClick={handleDiscussionClick}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MyFeed;