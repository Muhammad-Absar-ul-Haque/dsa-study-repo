/**
 * Problem: Design HashSet
 * Difficulty: Easy
 * Pattern: Design / Hashing (array of buckets, chaining)
 * Time Complexity: O(1) average add/remove/contains, O(n) worst case (all collisions)
 * Space Complexity: O(n)
 * Backend Relevance: Underlies deduplication layers, e.g. "seen tweet ids" filters or idempotency-key tracking in request pipelines.
 */

class MyHashSet {
  constructor() {
    this.bucketCount = 1009;
    this.buckets = Array.from({ length: this.bucketCount }, () => []);
  }

  _hash(key) {
    return key % this.bucketCount;
  }

  add(key) {
    const bucket = this.buckets[this._hash(key)];
    if (!bucket.includes(key)) bucket.push(key);
  }

  remove(key) {
    const bucket = this.buckets[this._hash(key)];
    const idx = bucket.indexOf(key);
    if (idx !== -1) bucket.splice(idx, 1);
  }

  contains(key) {
    return this.buckets[this._hash(key)].includes(key);
  }
}

// ---- Tests ----
const hashSet = new MyHashSet();
hashSet.add(1);
hashSet.add(2);
console.log(hashSet.contains(1), '// expected:', true);
console.log(hashSet.contains(3), '// expected:', false);
hashSet.add(2);
console.log(hashSet.contains(2), '// expected:', true);
hashSet.remove(2);
console.log(hashSet.contains(2), '// expected:', false);

// SENIOR NOTES:
// - At 1B+ elements: linear bucket scan (includes/indexOf) degrades badly under skewed hashing; needs balanced structures per bucket (tree/BST) as Java's HashMap does past a chain-length threshold.
// - Distributed systems: exact membership across a cluster is expensive; systems use probabilistic structures like Bloom filters to answer "definitely not present" cheaply before a real lookup.
// - Real-world analog: Bloom filters in Cassandra/HBase to skip disk reads, request-deduplication middleware.

module.exports = MyHashSet;
