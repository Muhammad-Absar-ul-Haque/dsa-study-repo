/**
 * Problem: Continuous Subarray Sum
 * Difficulty: Medium
 * Pattern: Prefix Sum + Modulo
 * Time Complexity: O(n)
 * Space Complexity: O(min(n, k))
 * Backend Relevance: Detecting a length->=2 span whose sum is a multiple of a
 *   cycle length — analogous to detecting periodicity in a metrics stream.
 */

function checkSubarraySum(nums, k) {
  // remainder -> earliest index where that prefix-sum-mod-k was seen
  const remainderIndex = new Map();
  remainderIndex.set(0, -1);

  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    const remainder = k === 0 ? sum : sum % k;

    if (remainderIndex.has(remainder)) {
      // need length >= 2
      if (i - remainderIndex.get(remainder) >= 2) return true;
    } else {
      remainderIndex.set(remainder, i);
    }
  }
  return false;
}

// ---- Tests ----
console.log(checkSubarraySum([23, 2, 4, 6, 7], 6), '// expected: true');
console.log(checkSubarraySum([23, 2, 6, 4, 7], 6), '// expected: true');
console.log(checkSubarraySum([23, 2, 6, 4, 7], 13), '// expected: false');

// SENIOR NOTES:
// - At 1B+ elements: remainder map is bounded by min(n, k) distinct remainders,
//   so memory stays small even for huge inputs as long as k is modest.
// - Distributed systems: modular prefix sums still need a running carry between
//   shards; the remainder-index map can be checkpointed and merged, keeping only
//   the earliest occurrence per remainder across shards.
// - Real-world analog: detecting a repeating billing cycle (e.g. a span of
//   charges that nets to a multiple of a monthly quota) in a transaction stream.

module.exports = checkSubarraySum;
