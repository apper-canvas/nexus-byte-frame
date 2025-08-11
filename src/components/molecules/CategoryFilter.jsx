import React from "react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const CategoryFilter = ({ 
  categories, 
  onCategoryToggle, 
  onSubcategoryToggle,
  className 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {categories.map((category) => (
        <div key={category.Id} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
          <button
            onClick={() => onCategoryToggle(category.Id)}
            className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
          >
            <div className="flex items-center">
              <span className="font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                {category.name}
              </span>
              {category.isSelected && (
                <span className="ml-2 w-2 h-2 bg-primary-500 rounded-full"></span>
              )}
            </div>
            <motion.div
              animate={{ rotate: category.isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ApperIcon name="ChevronDown" className="h-4 w-4 text-gray-400" />
            </motion.div>
          </button>

          <AnimatePresence>
            {category.isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="ml-4 mt-2 space-y-1">
                  {category.subcategories.map((subcategory) => (
                    <label
                      key={subcategory}
                      className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                        onChange={() => onSubcategoryToggle(category.Id, subcategory)}
                      />
                      <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800">
                        {subcategory}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;