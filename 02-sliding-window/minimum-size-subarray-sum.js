/**
 * Problem: Minimum Size Subarray Sum
 * Difficulty: Medium
 * Pattern: Sliding Window (variable size)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: Finding the smallest batch of consecutive events whose
 *   combined weight/cost meets a threshold, e.g. minimal batch size for a payout.
 */

function minSubArrayLen(target, nums) {
  let windowStart = 0;
  let sum = 0;
  let best = Infinity;

  for (let windowEnd = 0; windowEnd < nums.length; windowEnd++) {
    sum += nums[windowEnd];

    while (sum >= target) {
      best = Math.min(best, windowEnd - windowStart + 1);
      sum -= nums[windowStart];
      windowStart++;
    }
  }
  return best === Infinity ? 0 : best;
}

// ---- Tests ----
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]), '// expected: 2');
console.log(minSubArrayLen(4, [1, 4, 4]), '// expected: 1');
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]), '// expected: 0');

// SENIOR NOTES:
// - At 1B+ elements: O(n) amortized (each index enters/exits the window once);
//   requires all values to be non-negative or the shrink logic breaks.
// - Distributed systems: variable-size windows are harder to shard because the
//   window length is data-dependent; typically solved by computing prefix sums
//   per shard and binary-searching across a merged global prefix-sum array.
// - Real-world analog: finding the minimum number of consecutive shipments
//   needed to fill a truck's minimum load threshold.

module.exports = minSubArrayLen;
