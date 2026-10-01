/**
 * Problem: Maximum Sum Subarray of Size K
 * Difficulty: Easy
 * Pattern: Sliding Window (fixed size)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: Rolling-window aggregation, like computing max rolling
 *   throughput over a fixed number of time buckets.
 */

function maxSumSubarray(arr, k) {
  if (arr.length < k) return 0;

  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];

  let best = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k]; // slide: add new, drop oldest
    best = Math.max(best, windowSum);
  }
  return best;
}

// ---- Tests ----
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3), '// expected: 9');
console.log(maxSumSubarray([2, 3, 4, 1, 5], 2), '// expected: 7');
console.log(maxSumSubarray([1, 1, 1, 1], 4), '// expected: 4');

// SENIOR NOTES:
// - At 1B+ elements: O(n) streaming with O(1) memory is ideal — you never need
//   to hold more than k elements' worth of running state.
// - Distributed systems: compute per-shard rolling sums, overlapping shards by
//   k-1 elements at the boundary, then take the global max across shard results.
// - Real-world analog: rolling window metrics dashboards (e.g. max requests/sec
//   over any 5-minute window) computed incrementally instead of recomputed.

module.exports = maxSumSubarray;
