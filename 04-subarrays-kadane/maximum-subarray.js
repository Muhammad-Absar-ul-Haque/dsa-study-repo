/**
 * Problem: Maximum Subarray
 * Difficulty: Easy
 * Pattern: Kadane's Algorithm
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: Same running-sum reset trick used to detect the best contiguous
 * window of a metric stream (e.g. longest profitable trading window, best latency streak).
 */

function maxSubArray(nums) {
  let currentSum = nums[0];
  let bestSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend the previous subarray or start fresh at nums[i]
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    bestSum = Math.max(bestSum, currentSum);
  }

  return bestSum;
}

// ---- Tests ----
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]), '// expected:', 6);
console.log(maxSubArray([1]), '// expected:', 1);
console.log(maxSubArray([5, 4, -1, 7, 8]), '// expected:', 23);

// SENIOR NOTES:
// - At 1B+ elements: single streaming pass is fine memory-wise (O(1) state), but
//   precision drifts with floating point sums; use integer/decimal accumulators.
// - Distributed systems: reduce per-shard (currentSum, bestSum, prefixSum) triples
//   and merge across shard boundaries by checking the suffix-of-left + prefix-of-right sum.
// - Real-world analog: rolling window anomaly detection in metrics pipelines
//   (e.g. best/worst contiguous throughput window in a time series).

module.exports = maxSubArray;
