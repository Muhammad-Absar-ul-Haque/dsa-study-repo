/**
 * Problem: Maximum XOR of Two Numbers in an Array
 * Difficulty: Medium
 * Pattern: Bit Manipulation (greedy prefix building, bit-trie style)
 * Time Complexity: O(n * L) where L is the bit-length (32) — effectively O(n)
 * Space Complexity: O(n) for the prefix set per bit level
 * Backend Relevance: Maximizing XOR distance resembles nearest-neighbor /
 * maximum-dissimilarity search over bit-packed keys, used in IP routing
 * tables, hashing schemes, and similarity search over binary embeddings.
 */

function findMaximumXOR(nums) {
  const maxNum = Math.max(...nums);
  const L = maxNum === 0 ? 1 : Math.floor(Math.log2(maxNum)) + 1;

  let max = 0;
  let mask = 0;
  for (let i = L - 1; i >= 0; i--) {
    mask |= (1 << i);
    const prefixes = new Set();
    for (const n of nums) prefixes.add(n & mask);

    const candidate = max | (1 << i);
    for (const p of prefixes) {
      if (prefixes.has(candidate ^ p)) {
        max = candidate;
        break;
      }
    }
  }
  return max;
}

// ---- Tests ----
console.log(findMaximumXOR([3, 10, 5, 25, 2, 8]), '// expected:', 28);
console.log(findMaximumXOR([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70]), '// expected:', 127);
console.log(findMaximumXOR([0, 0]), '// expected:', 0);

// SENIOR NOTES:
// - At 1B+ elements: the O(n * 32) scan across bit levels is linear and
//   fine, but building a real binary trie of all numbers (alternative
//   approach) would need careful memory pooling to avoid GC pressure at
//   this scale; the prefix-set approach here avoids explicit trie nodes.
// - Distributed systems: candidate prefixes can be computed per-shard and
//   merged (union of prefix sets) before the existence check, enabling a
//   map-reduce style maximum-XOR search across partitioned data.
// - Real-world analog: finding the most dissimilar pair of feature vectors
//   (bit-packed) for diversity sampling, or worst-case IP/subnet distance
//   analysis in network routing.

module.exports = findMaximumXOR;
