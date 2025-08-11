import discussionsData from "@/services/mockData/discussions.json";
import commentsData from "@/services/mockData/comments.json";

class DiscussionService {
constructor() {
    this.discussions = [...discussionsData];
    this.comments = [...commentsData];
    this.nextCommentId = Math.max(...this.comments.map(c => c.Id)) + 1;
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
// Comment methods
  async getComments(discussionId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const discussionComments = this.comments
      .filter(comment => comment.discussionId === discussionId && !comment.parentId)
      .map(comment => ({
        ...comment,
        replies: this.getReplies(comment.Id)
      }));
    
    return discussionComments;
  }

  getReplies(parentId) {
    return this.comments
      .filter(comment => comment.parentId === parentId)
      .map(comment => ({
        ...comment,
        replies: this.getReplies(comment.Id)
      }));
  }

  async addComment(discussionId, commentData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newComment = {
      Id: this.nextCommentId++,
      discussionId,
      parentId: null,
      content: commentData.content,
      author: commentData.author,
      timestamp: commentData.timestamp,
      upvoteCount: commentData.upvoteCount || 0,
      replies: []
    };
    
    this.comments.unshift(newComment);
    
    // Update discussion comment count
    const discussion = this.discussions.find(d => d.Id === discussionId);
    if (discussion) {
      discussion.commentCount++;
    }
    
    return newComment;
  }

  async addReply(discussionId, parentId, replyData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newReply = {
      Id: this.nextCommentId++,
      discussionId,
      parentId,
      content: replyData.content,
      author: replyData.author,
      timestamp: replyData.timestamp,
      upvoteCount: replyData.upvoteCount || 0,
      replies: []
    };
    
    this.comments.unshift(newReply);
    
    // Update discussion comment count
    const discussion = this.discussions.find(d => d.Id === discussionId);
    if (discussion) {
      discussion.commentCount++;
    }
    
    return newReply;
  }

  async upvoteComment(commentId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const comment = this.comments.find(c => c.Id === commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }
    
    comment.upvoteCount++;
    return comment;
  }
}
export default new DiscussionService();