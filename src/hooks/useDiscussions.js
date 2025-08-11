import { useState, useEffect } from "react";
import discussionService from "@/services/api/discussionService";
import { toast } from "react-toastify";

export const useDiscussions = (communityId) => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadDiscussions = async () => {
    if (!communityId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await discussionService.getByCommunityId(communityId);
      setDiscussions(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load discussions");
    } finally {
      setLoading(false);
    }
};

  const createPost = async (postData) => {
    try {
      setLoading(true);
      setError(null);
      const newPost = await discussionService.create(postData);
      // Add the new post to the beginning of the discussions array
      setDiscussions(prevDiscussions => [newPost, ...prevDiscussions]);
      return newPost;
    } catch (err) {
      setError(err.message);
      toast.error("Failed to create post");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiscussions();
  }, [communityId]);

  return {
    discussions,
    loading,
    error,
    loadDiscussions,
    createPost
  };
};

export const useTrendingDiscussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTrendingDiscussions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await discussionService.getTrending();
      setDiscussions(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load trending discussions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrendingDiscussions();
  }, []);

  return {
    discussions,
    loading,
    error,
    loadTrendingDiscussions
  };
};

export const useFeedDiscussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadFeedDiscussions = async () => {
    try {
      setLoading(true);
      setError(null);
      // Get joined community IDs (mock implementation)
      const joinedCommunityIds = ["1", "2", "4", "6", "9"];
      const data = await discussionService.getFeedForCommunities(joinedCommunityIds);
      setDiscussions(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedDiscussions();
  }, []);

  return {
    discussions,
    loading,
    error,
    loadFeedDiscussions
  };
};