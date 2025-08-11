import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 shimmer"></div>
        <div className="p-6 space-y-4">
          <div className="h-8 bg-gray-200 rounded-lg shimmer w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded shimmer w-full"></div>
          <div className="h-4 bg-gray-200 rounded shimmer w-2/3"></div>
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
            <div className="h-4 bg-gray-200 rounded shimmer w-24"></div>
            <div className="h-4 bg-gray-200 rounded shimmer w-32"></div>
          </div>
        </div>
      </div>

      {/* Discussion Feed Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded shimmer w-48"></div>
          <div className="h-4 bg-gray-200 rounded shimmer w-16"></div>
        </div>

        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="space-y-3">
              <div className="h-5 bg-gray-200 rounded shimmer w-4/5"></div>
              <div className="flex items-center space-x-2">
                <div className="h-4 bg-gray-200 rounded shimmer w-20"></div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded shimmer w-24"></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-4 bg-gray-200 rounded shimmer w-16"></div>
                <div className="h-4 bg-gray-200 rounded shimmer w-14"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;