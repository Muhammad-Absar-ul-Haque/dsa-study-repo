/**
 * Problem: Subarray Sums Divisible by K
 * Difficulty: Medium
 * Pattern: Prefix Sum + Modulo Hash Map
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 * Backend Relevance: Bucketing by remainder is the core idea behind consistent hashing
 * and sharding by modulo — grouping items whose cumulative offsets land in the same bucket.
 */

function subarraysDivByK(nums, k) {
  // remainder -> count of prefix sums with that remainder mod k
  const remainderCount = new Map([[0, 1]]);
  let prefixSum = 0;
  let count = 0;

  for (const n of nums) {
    prefixSum += n;
    // JS % can return negative; normalize into [0, k)
    const rem = ((prefixSum % k) + k) % k;
    count += remainderCount.get(rem) || 0;
    remainderCount.set(rem, (remainderCount.get(rem) || 0) + 1);
  }

  return count;
}

// ---- Tests ----
console.log(subarraysDivByK([4, 5, 0, -2, -3, 1], 5), '// expected:', 7);
console.log(subarraysDivByK([5], 9), '// expected:', 0);
console.log(subarraysDivByK([-1, 2, 9], 2), '// expected:', 2);

// SENIOR NOTES:
// - At 1B+ elements: map has at most k entries so memory is bounded by k, not n —
//   pick k-aware bucket arrays instead of a Map for a tight, cache-friendly counter.
// - Distributed systems: remainder buckets partition naturally, similar to modulo-based
//   sharding; merging counts across shards needs the running prefixSum mod k handed off.
// - Real-world analog: rate-limiter or billing-cycle windows where you need counts of
//   time ranges whose cumulative offset aligns to a fixed period boundary.

module.exports = subarraysDivByK;
