import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CommunityHeader from "@/components/organisms/CommunityHeader";
import DiscussionFeed from "@/components/organisms/DiscussionFeed";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useCommunity } from "@/hooks/useCommunities";
import { useDiscussions } from "@/hooks/useDiscussions";

const CommunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { community, loading: communityLoading, error: communityError, joinCommunity, leaveCommunity } = useCommunity(id);
  const { discussions, loading: discussionsLoading, error: discussionsError, loadDiscussions } = useDiscussions(id);

  if (communityLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <Loading />
        </div>
      </div>
    );
  }

  if (communityError) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <Error
            title="Community not found"
            message={communityError}
            onRetry={() => navigate("/")}
          />
        </div>
      </div>
    );
  }

  const handleJoin = (communityData) => {
    if (communityData.isJoined) {
      leaveCommunity();
    } else {
      joinCommunity();
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleDiscussionClick = (discussion) => {
    // Future implementation for discussion detail view
    console.log("Discussion clicked:", discussion);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background pb-20 md:pb-0"
    >
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Community Header */}
        <CommunityHeader
          community={community}
          onJoin={handleJoin}
          onBack={handleBack}
        />

        {/* Discussion Feed */}
        <DiscussionFeed
          discussions={discussions}
          loading={discussionsLoading}
          error={discussionsError}
          onDiscussionClick={handleDiscussionClick}
          onRetry={loadDiscussions}
        />
      </div>
    </motion.div>
  );
};

export default CommunityDetail;