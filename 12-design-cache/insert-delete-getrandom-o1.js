/**
 * Problem: Insert Delete GetRandom O(1)
 * Difficulty: Medium
 * Pattern: Design / Hashing (array + value-to-index map)
 * Time Complexity: O(1) insert/remove/getRandom
 * Space Complexity: O(n)
 * Backend Relevance: Mirrors techniques used in load-balancer random pick and A/B test sample selection with O(1) membership + removal.
 */

class RandomizedSet {
  constructor() {
    this.values = []; // dense array for O(1) uniform random access
    this.indexOf = new Map(); // value -> index in values[]
  }

  insert(val) {
    if (this.indexOf.has(val)) return false;
    this.indexOf.set(val, this.values.length);
    this.values.push(val);
    return true;
  }

  remove(val) {
    if (!this.indexOf.has(val)) return false;
    const idx = this.indexOf.get(val);
    const lastVal = this.values[this.values.length - 1];
    // swap target with last element, then pop -> avoids O(n) shift
    this.values[idx] = lastVal;
    this.indexOf.set(lastVal, idx);
    this.values.pop();
    this.indexOf.delete(val);
    return true;
  }

  getRandom() {
    return this.values[Math.floor(Math.random() * this.values.length)];
  }
}

// ---- Tests ----
const rs = new RandomizedSet();
console.log(rs.insert(1), '// expected:', true);
console.log(rs.remove(2), '// expected:', false);
console.log(rs.insert(2), '// expected:', true);
console.log(rs.values.includes(rs.getRandom()), '// expected:', true); // getRandom() is nondeterministic; check membership
console.log(rs.remove(1), '// expected:', true);
console.log(rs.insert(2), '// expected:', false); // already present
console.log(rs.values.includes(rs.getRandom()), '// expected:', true);

// SENIOR NOTES:
// - At 1B+ elements: a single JS array/Map cannot fit in memory on one machine; would need to shard by hash(value) across nodes and pick a random shard then a random element.
// - Distributed systems: uniform random selection across shards requires weighting by shard size (reservoir sampling) to stay unbiased.
// - Real-world analog: load balancer "pick random healthy backend", feature-flag random bucket assignment.

module.exports = RandomizedSet;
