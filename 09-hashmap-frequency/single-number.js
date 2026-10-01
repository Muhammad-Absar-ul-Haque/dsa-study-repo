/**
 * Problem: Single Number
 * Difficulty: Easy
 * Pattern: Bit Manipulation (XOR)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: XOR-based checksum tricks are used to find a missing/mismatched record
 *   between two otherwise-identical datasets without hashing.
 */

function singleNumber(nums) {
  return nums.reduce((acc, n) => acc ^ n, 0);
}

// ---- Tests ----
console.log(singleNumber([2, 2, 1]), '// expected:', 1);
console.log(singleNumber([4, 1, 2, 1, 2]), '// expected:', 4);
console.log(singleNumber([1]), '// expected:', 1);

// SENIOR NOTES:
// - At 1B+ elements: XOR reduction is O(1) space and streams perfectly — no allocation grows
//   with input size, unlike a frequency map.
// - Distributed systems: XOR is associative and commutative, so each shard can compute a
//   partial XOR and the final result is just the XOR of all partial results.
// - Real-world analog: parity/checksum computation in RAID and network protocols, and
//   reconciliation of two logs where every entry pairs up except one anomaly.

module.exports = singleNumber;
