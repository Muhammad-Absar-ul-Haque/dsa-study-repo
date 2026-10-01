/**
 * Problem: Range Sum Query - Immutable
 * Difficulty: Easy
 * Pattern: Prefix Sum
 * Time Complexity: O(n) build, O(1) per query
 * Space Complexity: O(n)
 * Backend Relevance: Precomputed prefix sums mirror materialized aggregate
 *   tables that let you answer range-total queries in O(1) instead of scanning.
 */

class NumArray {
  constructor(nums) {
    // prefix[i] = sum of nums[0..i-1], so prefix has length n+1
    this.prefix = new Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
      this.prefix[i + 1] = this.prefix[i] + nums[i];
    }
  }

  sumRange(left, right) {
    return this.prefix[right + 1] - this.prefix[left];
  }
}

// ---- Tests ----
const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(numArray.sumRange(0, 2), '// expected: 1');
console.log(numArray.sumRange(2, 5), '// expected: -1');
console.log(numArray.sumRange(0, 5), '// expected: -3');

// SENIOR NOTES:
// - At 1B+ elements: O(n) precompute + O(n) storage is the cost of O(1) reads;
//   at huge scale you'd store prefix sums in a columnar/compressed format.
// - Distributed systems: this is exactly how sharded aggregate rollups work —
//   precompute per-shard running totals and a global offset table so any range
//   query resolves via O(shards touched) lookups instead of a full rescan.
// - Real-world analog: precomputed cumulative revenue/metrics tables in an
//   analytics warehouse for instant range queries (no full table scan per query).

module.exports = NumArray;
