/**
 * Problem: Missing Number
 * Difficulty: Easy
 * Pattern: Bit Manipulation (XOR cancellation)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: XOR-based checksum/reconciliation is used to detect a
 * single missing record ID in a sequence (e.g. verifying no gaps in an
 * auto-increment primary key range or a sequential message queue offset).
 */

function missingNumber(nums) {
  let missing = nums.length;
  for (let i = 0; i < nums.length; i++) {
    missing ^= i ^ nums[i];
  }
  return missing;
}

// ---- Tests ----
console.log(missingNumber([3, 0, 1]), '// expected:', 2);
console.log(missingNumber([0, 1]), '// expected:', 2);
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]), '// expected:', 8);

// SENIOR NOTES:
// - At 1B+ elements: still O(n) time, O(1) space, and immune to the integer
//   overflow risk that a sum-formula approach (n*(n+1)/2 - sum) would hit in
//   languages with fixed-width ints; JS numbers add their own precision caps
//   past 2^53 so XOR is the safer choice at extreme scale.
// - Distributed systems: XOR is associative/commutative, so each shard can
//   XOR its local range and indices, and a final reduce XORs the partials —
//   trivially parallelizable missing-ID detection across partitions.
// - Real-world analog: detecting a single dropped message offset in a
//   Kafka partition or a gap in an auto-increment ID sequence during audit.

module.exports = missingNumber;
