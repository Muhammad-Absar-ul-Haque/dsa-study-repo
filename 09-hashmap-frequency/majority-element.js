/**
 * Problem: Majority Element
 * Difficulty: Easy
 * Pattern: Boyer-Moore Voting Algorithm
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: Detecting a dominant value (e.g. a single misbehaving client responsible
 *   for >50% of requests) without allocating a frequency table.
 */

function majorityElement(nums) {
  let candidate = null;
  let count = 0;

  for (const n of nums) {
    if (count === 0) candidate = n;
    count += n === candidate ? 1 : -1;
  }

  return candidate;
}

// ---- Tests ----
console.log(majorityElement([3, 2, 3]), '// expected:', 3);
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]), '// expected:', 2);
console.log(majorityElement([1]), '// expected:', 1);

// SENIOR NOTES:
// - At 1B+ elements: still O(1) extra space, which is exactly why Boyer-Moore beats a
//   hashmap-based frequency count at massive scale — no memory growth with input size.
// - Distributed systems: candidate/count pairs from each shard can be combined pairwise
//   (a generalized voting merge), then a final verification pass confirms true majority.
// - Real-world analog: leader/quorum detection in consensus protocols, or flagging a single
//   IP responsible for the majority of traffic in a DDoS mitigation pipeline.

module.exports = majorityElement;
