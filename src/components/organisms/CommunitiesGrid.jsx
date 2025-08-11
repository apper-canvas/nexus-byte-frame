import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import CommunityCard from "@/components/molecules/CommunityCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const CommunitiesGrid = ({ 
  communities = [],
  loading = false,
  error = null,
  onCommunityClick,
  onCommunityJoin,
  onRetry,
  className 
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!communities.length) {
    return (
      <Empty
        title="No communities found"
        description="Try adjusting your search or browse different categories to discover communities that match your interests."
        actionLabel="Clear filters"
        onAction={() => window.location.reload()}
      />
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
    >
      {communities.map((community) => (
        <motion.div key={community.Id} variants={itemVariants}>
          <CommunityCard
            community={community}
            onClick={() => onCommunityClick(community)}
            onJoin={() => onCommunityJoin(community)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CommunitiesGrid;