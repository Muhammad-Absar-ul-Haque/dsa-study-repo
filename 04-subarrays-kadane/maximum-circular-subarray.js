/**
 * Problem: Maximum Sum Circular Subarray
 * Difficulty: Medium
 * Pattern: Kadane's Algorithm (max case + total-minus-min case)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: Modeling wrap-around windows shows up in circular buffers,
 * ring-based scheduling queues, and 24/7 cyclic time-series (e.g. hour-of-day load).
 */

function maxSubarraySumCircular(nums) {
  let total = 0;
  let currentMax = 0;
  let maxSum = -Infinity;
  let currentMin = 0;
  let minSum = Infinity;

  for (const n of nums) {
    currentMax = Math.max(currentMax + n, n);
    maxSum = Math.max(maxSum, currentMax);

    currentMin = Math.min(currentMin + n, n);
    minSum = Math.min(minSum, currentMin);

    total += n;
  }

  // If all numbers are negative, the "wrap" case (total - minSum) would be 0
  // (empty subarray), which is invalid, so fall back to the non-wrapping max.
  if (maxSum < 0) return maxSum;
  return Math.max(maxSum, total - minSum);
}

// ---- Tests ----
console.log(maxSubarraySumCircular([1, -2, 3, -2]), '// expected:', 3);
console.log(maxSubarraySumCircular([5, -3, 5]), '// expected:', 10);
console.log(maxSubarraySumCircular([-3, -2, -3]), '// expected:', -2);

// SENIOR NOTES:
// - At 1B+ elements: two linear passes (or one combined pass) keep this streaming-friendly;
//   watch for the all-negative edge case which silently breaks the wrap formula.
// - Distributed systems: circular structure implies a fixed logical ring (e.g. consistent
//   hashing ring); computing this per-shard requires knowing the ring boundary up front.
// - Real-world analog: finding the best contiguous load window on a ring buffer or
//   a recurring daily/weekly cycle that can wrap past midnight/week boundary.

module.exports = maxSubarraySumCircular;
