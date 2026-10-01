/**
 * Problem: Two Sum III - Data Structure Design (class with add/find)
 * Difficulty: Easy
 * Pattern: Hashmap-backed streaming design
 * Time Complexity: O(1) amortized add, O(n) find (n = distinct numbers added)
 * Space Complexity: O(n)
 * Backend Relevance: A stateful add/find service backed by a frequency map is the
 *   same shape as a stream-processing counter service (e.g. sliding-window metrics
 *   store) that ingests events and answers aggregate queries on demand.
 */

class TwoSum {
  constructor() {
    this.counts = new Map();
  }

  add(number) {
    this.counts.set(number, (this.counts.get(number) || 0) + 1);
  }

  find(value) {
    for (const [num, count] of this.counts) {
      const complement = value - num;
      if (complement === num) {
        if (count > 1) return true;
      } else if (this.counts.has(complement)) {
        return true;
      }
    }
    return false;
  }
}

// ---- Tests ----
const ts1 = new TwoSum();
ts1.add(1);
ts1.add(3);
ts1.add(5);
console.log(ts1.find(4), '// expected: true');
console.log(ts1.find(7), '// expected: false');

const ts2 = new TwoSum();
ts2.add(3);
ts2.add(3);
console.log(ts2.find(6), '// expected: true');

// SENIOR NOTES:
// - At 1B+ elements: find() is O(n) per query which is too slow at scale; you'd
//   maintain the complement check incrementally or move to a sorted structure
//   / precomputed set of achievable sums if queries vastly outnumber adds.
// - Distributed systems: add() could be sharded by hash(number) across nodes, but
//   find() needs a scatter-gather across all shards (or a co-located replica of
//   the full count map) since any two shards could hold a matching pair.
// - Real-world analog: a real-time metrics/counter service (e.g. a sliding window
//   event-frequency store) that ingests values continuously and answers ad-hoc
//   aggregate queries.

module.exports = TwoSum;
