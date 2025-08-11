import React from "react";
import { cn } from "@/utils/cn";
import { useNavigate, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";

const Header = ({ 
  searchValue = "", 
  onSearchChange, 
  searchResultCount = 0,
  className 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationTabs = [
    { name: "Communities", path: "/", icon: "Users" },
    { name: "My Feed", path: "/feed", icon: "BookOpen" },
    { name: "Trending", path: "/trending", icon: "TrendingUp" }
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
              <ApperIcon name="Zap" className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold font-display gradient-text">
              Nexus Hub
            </h1>
          </div>

          {/* Navigation Tabs - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationTabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => navigate(tab.path)}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative",
                  isActive(tab.path)
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <ApperIcon name={tab.icon} className="h-4 w-4 mr-2" />
                {tab.name}
                {isActive(tab.path) && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden sm:block flex-1 max-w-md mx-8">
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              showResults={searchValue.length > 0}
              resultCount={searchResultCount}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <ApperIcon name="Menu" className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar Mobile */}
        <div className="sm:hidden pb-3">
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            showResults={searchValue.length > 0}
            resultCount={searchResultCount}
          />
        </div>
      </div>

      {/* Bottom Navigation - Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <nav className="flex">
          {navigationTabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className={cn(
                "flex-1 flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors relative",
                isActive(tab.path)
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <ApperIcon name={tab.icon} className="h-5 w-5 mb-1" />
              {tab.name}
              {isActive(tab.path) && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary-500 rounded-b-full"></div>
              )}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;