/**
 * Problem: Single Number III
 * Difficulty: Medium
 * Pattern: Bit Manipulation (XOR + partitioning by lowest set bit)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: Partitioning a set via a discriminating bit is the same
 * idea behind bucketing/sharding keys by a hash bit, or splitting a dataset
 * into two disjoint groups without extra storage.
 */

function singleNumberIII(nums) {
  let xorAll = 0;
  for (const n of nums) xorAll ^= n;

  // Any set bit in xorAll differs between the two unique numbers; isolate
  // the lowest such bit to partition nums into two groups.
  const diff = xorAll & (-xorAll);

  let a = 0;
  for (const n of nums) {
    if (n & diff) a ^= n;
  }
  const b = xorAll ^ a;
  return [a, b];
}

// ---- Tests ----
function normalize(pair) {
  return [...pair].sort((x, y) => x - y);
}
console.log(normalize(singleNumberIII([1, 2, 1, 3, 2, 5])), '// expected:', [3, 5]);
console.log(normalize(singleNumberIII([-1, 0])), '// expected:', [-1, 0]);
console.log(normalize(singleNumberIII([0, 1])), '// expected:', [0, 1]);

// SENIOR NOTES:
// - At 1B+ elements: still a single O(n) pass with O(1) space; the only risk
//   is 32-bit bitwise operator overflow in JS for numbers outside the signed
//   32-bit range, which would require BigInt bitwise ops instead.
// - Distributed systems: the XOR-of-all step is associative and commutative,
//   so it parallelizes trivially across shards (each shard XORs its subset,
//   then XOR the partial results); the partition-and-rescan step needs a
//   second pass, i.e. two map-reduce rounds.
// - Real-world analog: finding two corrupted/duplicated record IDs in a
//   otherwise perfectly paired dataset (e.g. reconciling two ledgers).

module.exports = singleNumberIII;
