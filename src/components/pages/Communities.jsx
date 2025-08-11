import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CommunitiesGrid from "@/components/organisms/CommunitiesGrid";
import CategorySidebar from "@/components/organisms/CategorySidebar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useCommunities } from "@/hooks/useCommunities";
import { useCategories } from "@/hooks/useCategories";

const Communities = ({ searchQuery = "" }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { 
    communities, 
    loading, 
    error, 
    loadCommunities, 
    searchCommunities, 
    filterByCategories, 
    joinCommunity 
  } = useCommunities();
  
  const {
    categories,
    toggleExpanded,
    toggleSelected,
    clearAllSelections,
    getSelectedCategoryNames
  } = useCategories();

  // Handle search
  useEffect(() => {
    if (searchQuery.trim()) {
      searchCommunities(searchQuery);
    } else {
      const selectedCategories = getSelectedCategoryNames();
      if (selectedCategories.length > 0) {
        filterByCategories(selectedCategories);
      } else {
        loadCommunities();
      }
    }
  }, [searchQuery]);

  // Handle category filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      const selectedCategories = getSelectedCategoryNames();
      filterByCategories(selectedCategories);
    }
  }, [categories]);

  const handleCommunityClick = (community) => {
    navigate(`/community/${community.Id}`);
  };

  const handleCommunityJoin = (community) => {
    if (community.isJoined) {
      // Handle leave logic if needed
      return;
    }
    joinCommunity(community.Id);
  };

  const handleCategoryToggle = (categoryId) => {
    toggleExpanded(categoryId);
  };

  const handleSubcategoryToggle = (categoryId, subcategory) => {
    // Future implementation for subcategory filtering
    console.log("Subcategory toggle:", categoryId, subcategory);
  };

  const handleClearAll = () => {
    clearAllSelections();
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto flex">
        {/* Desktop Sidebar */}
        <CategorySidebar
          categories={categories}
          onCategoryToggle={toggleSelected}
          onSubcategoryToggle={handleSubcategoryToggle}
          onClearAll={handleClearAll}
          className="hidden lg:block"
        />

        {/* Mobile Sidebar */}
        <CategorySidebar
          categories={categories}
          onCategoryToggle={toggleSelected}
          onSubcategoryToggle={handleSubcategoryToggle}
          onClearAll={handleClearAll}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl sm:text-3xl font-bold text-gray-900 font-display gradient-text"
                >
                  Discover Communities
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-600 mt-2"
                >
                  Find your tribe and join engaging discussions
                </motion.p>
              </div>

              {/* Mobile Filter Button */}
              <Button
                variant="secondary"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Search Results Info */}
            {searchQuery.trim() && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200"
              >
                <div className="flex items-center text-primary-700">
                  <ApperIcon name="Search" className="h-4 w-4 mr-2" />
                  <span className="font-medium">
                    {communities.length} communities found for "{searchQuery}"
                  </span>
                </div>
              </motion.div>
            )}

            {/* Communities Grid */}
            <CommunitiesGrid
              communities={communities}
              loading={loading}
              error={error}
              onCommunityClick={handleCommunityClick}
              onCommunityJoin={handleCommunityJoin}
              onRetry={loadCommunities}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Communities;