/**
 * Problem: Longest Increasing Subsequence
 * Difficulty: Medium
 * Pattern: Dynamic Programming + Binary Search (patience sorting)
 * Time Complexity: O(n log n) — the naive O(n^2) DP (dp[i] = best ending at i)
 *   is simpler but quadratic; this uses a "tails" array with binary search.
 * Space Complexity: O(n) for the tails array
 * Backend Relevance: LIS-style monotonic-sequence tracking is used in
 * version/timestamp reconciliation (finding the longest run of monotonically
 * increasing events) and in stock/metric trend analysis pipelines.
 */

function lengthOfLIS(nums) {
  const tails = []; // tails[k] = smallest possible tail value of an increasing subsequence of length k+1
  for (const n of nums) {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < n) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = n;
  }
  return tails.length;
}

// ---- Tests ----
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]), '// expected:', 4);
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3]), '// expected:', 4);
console.log(lengthOfLIS([7, 7, 7, 7]), '// expected:', 1);

// SENIOR NOTES:
// - At 1B+ elements: O(n log n) is the practical ceiling for exact LIS at
//   this scale (~30 log-factor); the naive O(n^2) DP would be ~10^18 ops
//   and completely infeasible — always prefer the binary-search variant.
// - Distributed systems: LIS is inherently sequential (order matters), so
//   exact distributed LIS requires either a single pass on one node or
//   approximate/windowed LIS computed per shard and merged with care at
//   shard boundaries (not exact, but scalable).
// - Real-world analog: finding the longest run of monotonically increasing
//   metric readings (e.g. sustained latency/error-rate climb) or the
//   longest chain of compatible schema version upgrades.

module.exports = lengthOfLIS;
