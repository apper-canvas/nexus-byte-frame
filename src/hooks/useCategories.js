import { useState, useEffect } from "react";
import categoryService from "@/services/api/categoryService";
import { toast } from "react-toastify";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = async (categoryId) => {
    try {
      const updatedCategory = await categoryService.toggleExpanded(categoryId);
      setCategories(prev => 
        prev.map(c => c.Id === categoryId ? updatedCategory : c)
      );
    } catch (err) {
      toast.error("Failed to toggle category");
    }
  };

  const toggleSelected = async (categoryId) => {
    try {
      const updatedCategory = await categoryService.toggleSelected(categoryId);
      setCategories(prev => 
        prev.map(c => c.Id === categoryId ? updatedCategory : c)
      );
    } catch (err) {
      toast.error("Failed to select category");
    }
  };

  const clearAllSelections = async () => {
    try {
      const updatedCategories = await categoryService.clearAllSelections();
      setCategories(updatedCategories);
    } catch (err) {
      toast.error("Failed to clear selections");
    }
  };

  const getSelectedCategoryNames = () => {
    return categories
      .filter(c => c.isSelected)
      .map(c => c.name);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    loadCategories,
    toggleExpanded,
    toggleSelected,
    clearAllSelections,
    getSelectedCategoryNames
  };
};