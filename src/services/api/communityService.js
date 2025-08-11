import communitiesData from "@/services/mockData/communities.json";

class CommunityService {
  constructor() {
    this.communities = [...communitiesData];
  }

async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.communities]);
      }, 300);
    });
  }

async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const community = this.communities.find(c => c.Id === parseInt(id));
        if (community) {
          resolve({ ...community });
        } else {
          reject(new Error("Community not found"));
        }
      }, 200);
    });
  }

  async getActivityStats(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const community = this.communities.find(c => c.Id === parseInt(id));
        if (!community) {
          reject(new Error("Community not found"));
          return;
        }

        // Generate realistic activity stats based on community size and type
        const memberCount = community.memberCount;
        const baseActivity = Math.floor(memberCount / 1000);
        
        // Different categories have different activity patterns
        const categoryMultipliers = {
          'Professional': 1.5,
          'Gaming': 2.0,
          'Hobbies': 1.2,
          'Local': 0.8
        };
        
        const multiplier = categoryMultipliers[community.category] || 1.0;
        
        const newPosts = Math.max(1, Math.floor((baseActivity + Math.random() * 10) * multiplier));
        const newMembers = Math.max(0, Math.floor((baseActivity / 2 + Math.random() * 5) * multiplier));
        const activeDiscussions = Math.max(1, Math.floor((baseActivity / 3 + Math.random() * 8) * multiplier));
        
        // Generate last active time
        const hoursAgo = Math.floor(Math.random() * 24) + 1;
        const lastActive = hoursAgo === 1 ? '1 hour ago' : 
                          hoursAgo < 24 ? `${hoursAgo} hours ago` : '1 day ago';

        const stats = {
          newPosts: Math.min(99, newPosts), // Cap at 99 for display
          newMembers: Math.min(50, newMembers), // Cap at 50 for display
          activeDiscussions: Math.min(25, activeDiscussions), // Cap at 25 for display
          lastActive
        };

        resolve(stats);
      }, 150); // Faster response for better UX
    });
  }

  async searchByQuery(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!query.trim()) {
          resolve([...this.communities]);
          return;
        }

        const filtered = this.communities.filter(community =>
          community.name.toLowerCase().includes(query.toLowerCase()) ||
          community.description.toLowerCase().includes(query.toLowerCase()) ||
          community.category.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 200);
    });
  }

  async getByCategory(categories) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!categories || categories.length === 0) {
          resolve([...this.communities]);
          return;
        }

        const filtered = this.communities.filter(community =>
          categories.includes(community.category)
        );
        resolve(filtered);
      }, 250);
    });
  }

async joinCommunity(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const communityIndex = this.communities.findIndex(c => c.Id === parseInt(id));
        if (communityIndex !== -1) {
          this.communities[communityIndex] = {
            ...this.communities[communityIndex],
            isJoined: true,
            memberCount: this.communities[communityIndex].memberCount + 1
          };
          resolve({ ...this.communities[communityIndex] });
        } else {
          reject(new Error("Community not found"));
        }
      }, 300);
    });
  }

  async leaveCommunity(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const communityIndex = this.communities.findIndex(c => c.Id === parseInt(id));
        if (communityIndex !== -1) {
          this.communities[communityIndex] = {
            ...this.communities[communityIndex],
            isJoined: false,
            memberCount: Math.max(0, this.communities[communityIndex].memberCount - 1)
          };
          resolve({ ...this.communities[communityIndex] });
        } else {
          reject(new Error("Community not found"));
        }
      }, 300);
    });
  }

  async getJoinedCommunities() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const joined = this.communities.filter(c => c.isJoined);
        resolve(joined);
      }, 250);
    });
  }

  async getFeaturedCommunities(limit = 6) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const featured = this.communities
          .sort((a, b) => b.memberCount - a.memberCount)
          .slice(0, limit);
        resolve(featured);
      }, 200);
    });
  }
}

export default new CommunityService();