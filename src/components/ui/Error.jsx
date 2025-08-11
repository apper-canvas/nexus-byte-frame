import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  title = "Oops! Something went wrong"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="AlertTriangle" className="h-8 w-8 text-red-500" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 font-display mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>
        
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="primary"
            size="lg"
            className="w-full"
          >
            <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;