import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";

const SearchBar = ({ 
  placeholder = "Search communities...", 
  value, 
  onChange, 
  className,
  showResults = false,
  resultCount = 0
}) => {
  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <ApperIcon 
          name="Search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" 
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="pl-10 pr-4 h-11 bg-white shadow-sm border-gray-200 focus:shadow-md"
        />
      </div>
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-1 text-xs text-gray-500 px-3">
          {resultCount} communities found
        </div>
      )}
    </div>
  );
};

export default SearchBar;