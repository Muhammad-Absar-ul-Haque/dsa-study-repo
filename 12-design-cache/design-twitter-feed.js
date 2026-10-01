/**
 * Problem: Design Twitter
 * Difficulty: Medium
 * Pattern: Design / Heap (k-way merge of sorted feeds)
 * Time Complexity: postTweet O(1); follow/unfollow O(1); getNewsFeed O(k log k) where k = followees
 * Space Complexity: O(n) tweets stored + O(k) heap
 * Backend Relevance: Classic fan-out-on-read news feed merge, same shape as merging per-user timelines in social platforms.
 */

const { MinHeap } = require('../_helpers/heap');

class Twitter {
  constructor() {
    this.timestamp = 0;
    this.tweets = new Map(); // userId -> [{tweetId, time}] oldest first
    this.following = new Map(); // userId -> Set of followeeIds
  }

  postTweet(userId, tweetId) {
    if (!this.tweets.has(userId)) this.tweets.set(userId, []);
    this.tweets.get(userId).push({ tweetId, time: this.timestamp++ });
  }

  follow(followerId, followeeId) {
    if (followerId === followeeId) return;
    if (!this.following.has(followerId)) this.following.set(followerId, new Set());
    this.following.get(followerId).add(followeeId);
  }

  unfollow(followerId, followeeId) {
    if (this.following.has(followerId)) this.following.get(followerId).delete(followeeId);
  }

  getNewsFeed(userId) {
    const candidateIds = new Set([userId, ...(this.following.get(userId) || [])]);
    // comparator inverted (b.time - a.time) so the heap surfaces the most recent tweet first
    const heap = new MinHeap((a, b) => b.time - a.time);

    for (const uid of candidateIds) {
      const list = this.tweets.get(uid);
      if (list && list.length > 0) {
        const idx = list.length - 1;
        heap.push({ uid, idx, time: list[idx].time, tweetId: list[idx].tweetId });
      }
    }

    const result = [];
    while (!heap.isEmpty() && result.length < 10) {
      const top = heap.pop();
      result.push(top.tweetId);
      const list = this.tweets.get(top.uid);
      if (top.idx > 0) {
        const nextIdx = top.idx - 1;
        heap.push({ uid: top.uid, idx: nextIdx, time: list[nextIdx].time, tweetId: list[nextIdx].tweetId });
      }
    }
    return result;
  }
}

// ---- Tests ----
const twitter = new Twitter();
twitter.postTweet(1, 5);
console.log(twitter.getNewsFeed(1), '// expected:', [5]);
twitter.follow(1, 2);
twitter.postTweet(2, 6);
console.log(twitter.getNewsFeed(1), '// expected:', [6, 5]);
twitter.unfollow(1, 2);
console.log(twitter.getNewsFeed(1), '// expected:', [5]);

// SENIOR NOTES:
// - At 1B+ elements: per-user tweet lists and per-user "who I follow" sets must be sharded; celebrities with millions of followers break naive fan-out-on-write.
// - Distributed systems: real feeds use hybrid fan-out (push for normal users, pull/merge for celebrities), backed by precomputed timelines in Redis/Cassandra plus this k-way merge for the pull path.
// - Real-world analog: Twitter's actual timeline service, RSS feed aggregators merging many sorted sources by timestamp.

module.exports = Twitter;
