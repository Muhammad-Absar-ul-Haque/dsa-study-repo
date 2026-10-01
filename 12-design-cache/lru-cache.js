/**
 * Problem: LRU Cache
 * Difficulty: Medium
 * Pattern: Design / Hashing (Map preserves insertion order)
 * Time Complexity: O(1) get/put
 * Space Complexity: O(capacity)
 * Backend Relevance: Core eviction policy behind in-memory caches (Redis allkeys-lru, CDN edge caches, DB buffer pools).
 */

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // insertion order == recency order (oldest first, newest last)
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value); // re-insert -> marks as most recently used
    return value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      const oldestKey = this.map.keys().next().value; // first inserted = least recently used
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
}

// ---- Tests ----
const lru = new LRUCache(2);
lru.put(1, 1);
lru.put(2, 2);
console.log(lru.get(1), '// expected:', 1);
lru.put(3, 3); // evicts key 2 (least recently used)
console.log(lru.get(2), '// expected:', -1);
lru.put(4, 4); // evicts key 1
console.log(lru.get(1), '// expected:', -1);
console.log(lru.get(3), '// expected:', 3);
console.log(lru.get(4), '// expected:', 4);

// SENIOR NOTES:
// - At 1B+ elements: a single Map can't hold billions of entries in memory on one node; needs sharding across many cache instances keyed by hash(key).
// - Distributed systems: consistent hashing routes keys to shards; eviction becomes per-shard, requiring approximate global recency (e.g. CLOCK/segmented LRU) instead of one exact global order.
// - Real-world analog: Redis allkeys-lru eviction policy; browser HTTP cache; CPU cache line replacement.

module.exports = LRUCache;
