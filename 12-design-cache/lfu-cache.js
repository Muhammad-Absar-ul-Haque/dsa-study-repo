/**
 * Problem: LFU Cache
 * Difficulty: Hard
 * Pattern: Design / Hashing (Map + frequency buckets)
 * Time Complexity: O(1) get/put
 * Space Complexity: O(capacity)
 * Backend Relevance: Used where access frequency matters more than recency, e.g. caching hot database rows or popular CDN assets.
 */

class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.minFreq = 0;
    this.keyToVal = new Map();
    this.keyToFreq = new Map();
    this.freqToKeys = new Map(); // freq -> Set of keys (Set preserves insertion order for tie-break)
  }

  _touch(key) {
    const freq = this.keyToFreq.get(key);
    const bucket = this.freqToKeys.get(freq);
    bucket.delete(key);
    if (bucket.size === 0) {
      this.freqToKeys.delete(freq);
      if (this.minFreq === freq) this.minFreq++;
    }
    const newFreq = freq + 1;
    this.keyToFreq.set(key, newFreq);
    if (!this.freqToKeys.has(newFreq)) this.freqToKeys.set(newFreq, new Set());
    this.freqToKeys.get(newFreq).add(key);
  }

  get(key) {
    if (!this.keyToVal.has(key)) return -1;
    this._touch(key);
    return this.keyToVal.get(key);
  }

  put(key, value) {
    if (this.capacity <= 0) return;
    if (this.keyToVal.has(key)) {
      this.keyToVal.set(key, value);
      this._touch(key);
      return;
    }
    if (this.keyToVal.size >= this.capacity) {
      const bucket = this.freqToKeys.get(this.minFreq);
      const evictKey = bucket.values().next().value; // least frequently used, oldest among ties
      bucket.delete(evictKey);
      if (bucket.size === 0) this.freqToKeys.delete(this.minFreq);
      this.keyToVal.delete(evictKey);
      this.keyToFreq.delete(evictKey);
    }
    this.keyToVal.set(key, value);
    this.keyToFreq.set(key, 1);
    if (!this.freqToKeys.has(1)) this.freqToKeys.set(1, new Set());
    this.freqToKeys.get(1).add(key);
    this.minFreq = 1;
  }
}

// ---- Tests ----
const lfu = new LFUCache(2);
lfu.put(1, 1);
lfu.put(2, 2);
console.log(lfu.get(1), '// expected:', 1); // freq: key1=2, key2=1
lfu.put(3, 3); // evicts key 2 (freq 1, least frequently used)
console.log(lfu.get(2), '// expected:', -1);
console.log(lfu.get(3), '// expected:', 3); // freq: key1=2, key3=2
lfu.put(4, 4); // evicts key 1 (tie freq 2, but key1 used less recently among freq-2 keys)
console.log(lfu.get(1), '// expected:', -1);
console.log(lfu.get(3), '// expected:', 3);
console.log(lfu.get(4), '// expected:', 4);

// SENIOR NOTES:
// - At 1B+ elements: frequency buckets can grow unbounded for long-lived hot keys; needs periodic frequency decay/aging to avoid stale "hot" entries dominating forever.
// - Distributed systems: exact global frequency counting requires coordination overhead; systems like TinyLFU (used in Caffeine) approximate frequency with probabilistic sketches instead of exact counters.
// - Real-world analog: Caffeine/Guava cache W-TinyLFU eviction, CDN popularity-based cache admission.

module.exports = LFUCache;
