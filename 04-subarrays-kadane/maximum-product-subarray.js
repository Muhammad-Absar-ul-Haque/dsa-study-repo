/**
 * Problem: Maximum Product Subarray
 * Difficulty: Medium
 * Pattern: Kadane's Algorithm (track running max AND min)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: Tracking both a running max and min mirrors handling sign-flipping
 * multipliers in pricing/discount pipelines where a negative factor can flip best <-> worst.
 */

function maxProduct(nums) {
  let currentMax = nums[0];
  let currentMin = nums[0];
  let result = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const n = nums[i];
    if (n < 0) {
      // a negative number swaps the roles of max and min
      [currentMax, currentMin] = [currentMin, currentMax];
    }
    currentMax = Math.max(n, currentMax * n);
    currentMin = Math.min(n, currentMin * n);
    result = Math.max(result, currentMax);
  }

  return result;
}

// ---- Tests ----
console.log(maxProduct([2, 3, -2, 4]), '// expected:', 6);
console.log(maxProduct([-2, 0, -1]), '// expected:', 0);
console.log(maxProduct([-2, 3, -4]), '// expected:', 24);

// SENIOR NOTES:
// - At 1B+ elements: product accumulators overflow/underflow floating point fast;
//   in a real system you'd work in log-space (sum of logs, track sign separately).
// - Distributed systems: unlike sum-based Kadane, products aren't easily mergeable
//   across shards without also carrying sign counts and zero-position metadata.
// - Real-world analog: compounding growth-rate windows (best contiguous run of
//   multiplicative factors, e.g. conversion-rate or interest-rate streaks).

module.exports = maxProduct;
