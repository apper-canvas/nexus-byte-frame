import { useState, useEffect } from "react";
import communityService from "@/services/api/communityService";
import { toast } from "react-toastify";

export const useCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCommunities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await communityService.getAll();
      setCommunities(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load communities");
    } finally {
      setLoading(false);
    }
  };

  const searchCommunities = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const data = await communityService.searchByQuery(query);
      setCommunities(data);
    } catch (err) {
      setError(err.message);
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const filterByCategories = async (categories) => {
    try {
      setLoading(true);
      setError(null);
      const data = await communityService.getByCategory(categories);
      setCommunities(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to filter communities");
    } finally {
      setLoading(false);
    }
  };

  const joinCommunity = async (communityId) => {
    try {
      const updatedCommunity = await communityService.joinCommunity(communityId);
      setCommunities(prev => 
        prev.map(c => c.Id === communityId ? updatedCommunity : c)
      );
      toast.success("Successfully joined community!");
    } catch (err) {
      toast.error("Failed to join community");
    }
  };

  const leaveCommunity = async (communityId) => {
    try {
      const updatedCommunity = await communityService.leaveCommunity(communityId);
      setCommunities(prev => 
        prev.map(c => c.Id === communityId ? updatedCommunity : c)
      );
      toast.success("Left community");
    } catch (err) {
      toast.error("Failed to leave community");
    }
  };

  useEffect(() => {
    loadCommunities();
  }, []);

  return {
    communities,
    loading,
    error,
    loadCommunities,
    searchCommunities,
    filterByCategories,
    joinCommunity,
    leaveCommunity
  };
};

export const useCommunity = (communityId) => {
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCommunity = async () => {
    if (!communityId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await communityService.getById(communityId);
      setCommunity(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load community");
    } finally {
      setLoading(false);
    }
  };

  const joinCommunity = async () => {
    try {
      const updatedCommunity = await communityService.joinCommunity(communityId);
      setCommunity(updatedCommunity);
      toast.success("Successfully joined community!");
    } catch (err) {
      toast.error("Failed to join community");
    }
  };

  const leaveCommunity = async () => {
    try {
      const updatedCommunity = await communityService.leaveCommunity(communityId);
      setCommunity(updatedCommunity);
      toast.success("Left community");
    } catch (err) {
      toast.error("Failed to leave community");
    }
  };

  useEffect(() => {
    loadCommunity();
  }, [communityId]);

  return {
    community,
    loading,
    error,
    loadCommunity,
    joinCommunity,
    leaveCommunity
  };
};