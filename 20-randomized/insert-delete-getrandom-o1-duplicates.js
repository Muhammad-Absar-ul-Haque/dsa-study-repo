/**
 * Problem: Insert Delete GetRandom O(1) - Duplicates allowed
 * Difficulty: Hard
 * Pattern: Randomized / Design (array + hash map of index sets)
 * Time Complexity: O(1) average for insert, remove, getRandom
 * Space Complexity: O(n)
 * Backend Relevance: Mirrors an in-memory cache/pool that needs O(1) random
 * eviction candidate selection alongside O(1) membership updates (e.g. load
 * balancer connection pools, random sampling for rate-limited feature flags).
 */

class RandomizedCollection {
  constructor() {
    this.vals = [];              // dense array of values
    this.idx = new Map();        // value -> Set of indices in vals
  }

  insert(val) {
    const isNew = !this.idx.has(val) || this.idx.get(val).size === 0;
    if (!this.idx.has(val)) this.idx.set(val, new Set());
    this.idx.get(val).add(this.vals.length);
    this.vals.push(val);
    return isNew;
  }

  remove(val) {
    if (!this.idx.has(val) || this.idx.get(val).size === 0) return false;
    const set = this.idx.get(val);
    const removeIdx = set.values().next().value;
    set.delete(removeIdx);

    const lastIdx = this.vals.length - 1;
    const lastVal = this.vals[lastIdx];
    this.vals[removeIdx] = lastVal;

    if (removeIdx !== lastIdx) {
      const lastSet = this.idx.get(lastVal);
      lastSet.delete(lastIdx);
      lastSet.add(removeIdx);
    }
    this.vals.pop();
    return true;
  }

  getRandom() {
    return this.vals[Math.floor(Math.random() * this.vals.length)];
  }
}

// ---- Tests ----
const rc = new RandomizedCollection();
console.log(rc.insert(1), '// expected:', true);
console.log(rc.insert(1), '// expected:', false);
console.log(rc.insert(2), '// expected:', true);
console.log(rc.remove(1), '// expected:', true);
console.log(rc.vals.length, '// expected:', 2);
const sample = rc.getRandom();
console.log(sample, '// expected: 1 or 2 (value present in collection)');
console.log(rc.remove(5), '// expected:', false);

// SENIOR NOTES:
// - At 1B+ elements: the flat array + Map-of-Sets still works in O(1) per op,
//   but memory (each index stored in a Set) becomes the bottleneck; a typed
//   array + custom open-addressing index structure would be far denser.
// - Distributed systems: sharding by value hash lets each shard own its own
//   RandomizedCollection; a global getRandom() needs weighted random shard
//   selection proportional to shard size (two-level sampling).
// - Real-world analog: connection pool / worker pool management where you
//   need O(1) add/remove of workers and O(1) random pick for load spreading.

module.exports = RandomizedCollection;
