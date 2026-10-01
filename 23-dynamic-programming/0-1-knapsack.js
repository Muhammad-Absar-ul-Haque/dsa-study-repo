/**
 * Problem: 0/1 Knapsack
 * Difficulty: Medium
 * Pattern: Dynamic Programming (2D grid, bounded item selection)
 * Time Complexity: O(n * capacity)
 * Space Complexity: O(n * capacity) (can be reduced to O(capacity) with a
 *   rolling 1D array iterated right-to-left)
 * Backend Relevance: The classic weight/value knapsack models maximizing
 * value under a hard resource cap — e.g. selecting which jobs to run given
 * a fixed memory/CPU budget, or which cache entries to keep under a size
 * limit to maximize hit-rate value.
 */

function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w]; // don't take item i-1
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
      }
    }
  }
  return dp[n][capacity];
}

// ---- Tests ----
console.log(knapsack([1, 3, 4, 5], [1, 4, 5, 7], 7), '// expected:', 9);
console.log(knapsack([2, 3, 4, 5], [3, 4, 5, 6], 5), '// expected:', 7);
console.log(knapsack([], [], 10), '// expected:', 0);

// SENIOR NOTES:
// - At 1B+ elements: with capacity or item count in the billions, the
//   O(n*capacity) table is infeasible in both time and memory; large-scale
//   solutions use greedy approximations (for fractional-friendly variants),
//   FPTAS (fully polynomial-time approximation schemes), or LP relaxation.
// - Distributed systems: the DP recurrence has row-to-row dependencies, but
//   the capacity dimension can be partitioned into ranges processed by
//   different workers per item-row if boundary values are exchanged, or
//   items can be batched and merged via meet-in-the-middle for exact splits.
// - Real-world analog: selecting which background jobs to schedule under a
//   fixed CPU/memory budget to maximize total business value, or choosing
//   which items to cache under a fixed cache-size limit to maximize hits.

module.exports = knapsack;
