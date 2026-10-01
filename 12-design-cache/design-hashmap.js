/**
 * Problem: Design HashMap
 * Difficulty: Easy
 * Pattern: Design / Hashing (array of buckets, chaining)
 * Time Complexity: O(1) average put/get/remove, O(n) worst case (all collisions)
 * Space Complexity: O(n)
 * Backend Relevance: This is literally how language-level hash maps (and database hash indexes) are implemented under the hood.
 */

class MyHashMap {
  constructor() {
    this.bucketCount = 1009; // prime size reduces clustering
    this.buckets = Array.from({ length: this.bucketCount }, () => []);
  }

  _hash(key) {
    return key % this.bucketCount;
  }

  put(key, value) {
    const bucket = this.buckets[this._hash(key)];
    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    bucket.push([key, value]);
  }

  get(key) {
    const bucket = this.buckets[this._hash(key)];
    for (const pair of bucket) {
      if (pair[0] === key) return pair[1];
    }
    return -1;
  }

  remove(key) {
    const bucket = this.buckets[this._hash(key)];
    const idx = bucket.findIndex((pair) => pair[0] === key);
    if (idx !== -1) bucket.splice(idx, 1);
  }
}

// ---- Tests ----
const hashMap = new MyHashMap();
hashMap.put(1, 1);
hashMap.put(2, 2);
console.log(hashMap.get(1), '// expected:', 1);
console.log(hashMap.get(3), '// expected:', -1);
hashMap.put(2, 1); // update
console.log(hashMap.get(2), '// expected:', 1);
hashMap.remove(2);
console.log(hashMap.get(2), '// expected:', -1);

// SENIOR NOTES:
// - At 1B+ elements: fixed bucket count causes long chains; needs dynamic resizing (rehashing) when load factor exceeds a threshold (~0.75).
// - Distributed systems: this single-node hash map becomes a distributed hash table (DHT) with consistent hashing to route keys to owning nodes, e.g. DynamoDB partitioning.
// - Real-world analog: Java HashMap/Python dict internals, database hash index, memcached's internal slab hashing.

module.exports = MyHashMap;
