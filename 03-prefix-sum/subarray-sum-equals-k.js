/**
 * Problem: Subarray Sum Equals K
 * Difficulty: Medium
 * Pattern: Prefix Sum + HashMap
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Backend Relevance: Counting spans of a numeric event stream that net to a
 *   target delta — e.g. counting time windows where balance change equals zero.
 */

function subarraySum(nums, k) {
  const prefixCount = new Map();
  prefixCount.set(0, 1); // empty prefix sums to 0

  let prefixSum = 0;
  let count = 0;

  for (const num of nums) {
    prefixSum += num;
    // if (prefixSum - k) was seen before, that span sums to k
    const needed = prefixSum - k;
    count += prefixCount.get(needed) || 0;
    prefixCount.set(prefixSum, (prefixCount.get(prefixSum) || 0) + 1);
  }
  return count;
}

// ---- Tests ----
console.log(subarraySum([1, 1, 1], 2), '// expected: 2');
console.log(subarraySum([1, 2, 3], 3), '// expected: 2');
console.log(subarraySum([1, -1, 0], 0), '// expected: 3');

// SENIOR NOTES:
// - At 1B+ elements: the prefix-count hashmap can grow to O(n) distinct sums,
//   which becomes a real memory concern; may need to bound/evict old prefixes
//   if only a bounded lookback window matters.
// - Distributed systems: prefix sums require a running total, so you'd compute
//   per-shard prefix sums plus a running "carry" offset passed shard-to-shard
//   (classic parallel prefix-scan / scan primitive in map-reduce).
// - Real-world analog: counting how many time windows in a transaction log had
//   net-zero (or net-target) balance change, e.g. for reconciliation audits.

module.exports = subarraySum;
