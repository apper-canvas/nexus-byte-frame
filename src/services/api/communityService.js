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