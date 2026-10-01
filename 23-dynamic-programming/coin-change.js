/**
 * Problem: Coin Change
 * Difficulty: Medium
 * Pattern: Dynamic Programming (unbounded knapsack / min-count)
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount)
 * Backend Relevance: Minimum-denomination-count problems mirror computing
 * the fewest API calls, cache tiers, or batch sizes needed to satisfy a
 * target quantity from a fixed set of available unit sizes.
 */

function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const c of coins) {
      if (c <= i) dp[i] = Math.min(dp[i], dp[i - c] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// ---- Tests ----
console.log(coinChange([1, 2, 5], 11), '// expected:', 3);
console.log(coinChange([2], 3), '// expected:', -1);
console.log(coinChange([1], 0), '// expected:', 0);

// SENIOR NOTES:
// - At 1B+ elements: an amount of 1B makes the O(amount) dp array itself
//   gigabytes in size — infeasible to hold fully in memory; would need a
//   number-theoretic (Frobenius/greedy-for-canonical-systems) approach or
//   chunked/streamed DP with checkpointing.
// - Distributed systems: the DP recurrence is inherently sequential per
//   index, but the amount range can be split into overlapping windows
//   across workers if coin denominations are small relative to the range,
//   recombining boundary states (bounded lookback = max coin value).
// - Real-world analog: computing the minimum number of cache-tier lookups
//   or batch API calls needed to fulfill an inventory/quantity request
//   using a fixed set of package sizes.

module.exports = coinChange;
