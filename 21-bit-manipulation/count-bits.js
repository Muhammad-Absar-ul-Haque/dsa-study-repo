/**
 * Problem: Counting Bits
 * Difficulty: Easy
 * Pattern: Bit Manipulation + Dynamic Programming
 * Time Complexity: O(n)
 * Space Complexity: O(n) for the output array
 * Backend Relevance: Popcount tables like this back Bloom filter/bitset
 * utilities and compression heuristics where bit-density per value matters.
 */

function countBits(n) {
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    // i >> 1 drops the lowest bit; add it back if it was set.
    dp[i] = dp[i >> 1] + (i & 1);
  }
  return dp;
}

// ---- Tests ----
console.log(countBits(2), '// expected:', [0, 1, 1]);
console.log(countBits(5), '// expected:', [0, 1, 1, 2, 1, 2]);
console.log(countBits(0), '// expected:', [0]);

// SENIOR NOTES:
// - At 1B+ elements: a dp array of 1B ints is ~4-8GB depending on typed
//   array width — at that scale you'd stream/chunk the computation or use
//   a Uint8Array (popcount of a 32-bit int fits in a byte) to cut memory 4x.
// - Distributed systems: each shard can compute popcounts for its own range
//   independently since dp[i] only depends on dp[i >> 1] within monotonic
//   ranges spanning power-of-two boundaries; ranges must be chunked at
//   power-of-two boundaries to stay self-contained per shard.
// - Real-world analog: precomputing bit-density lookup tables for Bloom
//   filters, feature bitmasks, or permission-flag popularity analytics.

module.exports = countBits;
