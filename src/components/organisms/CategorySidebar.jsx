import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const CategorySidebar = ({ 
  categories = [],
  onCategoryToggle,
  onSubcategoryToggle,
  onClearAll,
  className,
  isOpen = false,
  onClose
}) => {
  const selectedCount = categories.filter(cat => cat.isSelected).length;

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 font-display">
          Categories
        </h2>
        <div className="flex items-center space-x-2">
          {selectedCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="text-xs"
            >
              Clear all
            </Button>
          )}
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <ApperIcon name="X" className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Filter Count */}
      {selectedCount > 0 && (
        <div className="p-4 bg-primary-50 border-b border-gray-200">
          <div className="flex items-center text-sm text-primary-700">
            <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
            <span>{selectedCount} categories selected</span>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-4">
        <CategoryFilter
          categories={categories}
          onCategoryToggle={onCategoryToggle}
          onSubcategoryToggle={onSubcategoryToggle}
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:block w-80 bg-white border-r border-gray-200 h-full",
        className
      )}>
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 z-50 flex"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative w-80 bg-white shadow-xl"
          >
            {sidebarContent}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default CategorySidebar;