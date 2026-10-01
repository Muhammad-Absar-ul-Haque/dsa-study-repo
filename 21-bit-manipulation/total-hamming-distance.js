/**
 * Problem: Total Hamming Distance
 * Difficulty: Medium
 * Pattern: Bit Manipulation (per-bit combinatorics)
 * Time Complexity: O(n * 32) = O(n)
 * Space Complexity: O(1)
 * Backend Relevance: Per-bit-position counting like this is the core of
 * computing pairwise diff metrics at scale without materializing all pairs
 * (e.g. estimating total edit/diff cost across a fleet of config bitmasks).
 */

function totalHammingDistance(nums) {
  const n = nums.length;
  let total = 0;
  for (let bit = 0; bit < 32; bit++) {
    let countSet = 0;
    for (const num of nums) {
      if ((num >> bit) & 1) countSet++;
    }
    // For this bit position, every pair (one with bit set, one without)
    // contributes 1 to the total hamming distance.
    total += countSet * (n - countSet);
  }
  return total;
}

// ---- Tests ----
console.log(totalHammingDistance([4, 14, 2]), '// expected:', 6);
console.log(totalHammingDistance([4, 14, 4]), '// expected:', 4);
console.log(totalHammingDistance([1]), '// expected:', 0);

// SENIOR NOTES:
// - At 1B+ elements: O(32n) is linear and fine, but naive pairwise O(n^2)
//   hamming distance would be catastrophic (10^18 ops) — this per-bit
//   counting trick is exactly what avoids that blowup at scale.
// - Distributed systems: countSet per bit is a simple sum, so each shard
//   computes its local per-bit set-counts, and a reducer sums them across
//   shards before computing count*(n-count) globally — classic map-reduce.
// - Real-world analog: measuring aggregate divergence across a fleet of
//   feature-flag bitmasks or permission bitsets without comparing every pair.

module.exports = totalHammingDistance;
