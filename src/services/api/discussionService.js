import discussionsData from "@/services/mockData/discussions.json";

class DiscussionService {
  constructor() {
    this.discussions = [...discussionsData];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.discussions]);
      }, 300);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const discussion = this.discussions.find(d => d.Id === parseInt(id));
        if (discussion) {
          resolve({ ...discussion });
        } else {
          reject(new Error("Discussion not found"));
        }
      }, 200);
    });
  }

  async getByCommunityId(communityId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = this.discussions.filter(d => 
          d.communityId === String(communityId)
        );
        // Sort by timestamp descending (most recent first)
        const sorted = filtered.sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        );
        resolve(sorted);
      }, 250);
    });
  }

  async getTrending(limit = 20) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const trending = this.discussions
          .sort((a, b) => (b.upvoteCount + b.commentCount * 2) - (a.upvoteCount + a.commentCount * 2))
          .slice(0, limit);
        resolve(trending);
      }, 300);
    });
  }

  async getFeedForCommunities(communityIds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const feed = this.discussions
          .filter(d => communityIds.includes(d.communityId))
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        resolve(feed);
      }, 250);
    });
  }

  async create(discussionData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDiscussion = {
          ...discussionData,
          Id: Math.max(...this.discussions.map(d => d.Id)) + 1,
          timestamp: new Date().toISOString(),
          commentCount: 0,
          upvoteCount: 0
        };
        this.discussions.unshift(newDiscussion);
        resolve({ ...newDiscussion });
      }, 400);
    });
  }

  async upvote(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const discussionIndex = this.discussions.findIndex(d => d.Id === parseInt(id));
        if (discussionIndex !== -1) {
          this.discussions[discussionIndex].upvoteCount += 1;
          resolve({ ...this.discussions[discussionIndex] });
        } else {
          reject(new Error("Discussion not found"));
        }
      }, 200);
    });
  }
}

export default new DiscussionService();