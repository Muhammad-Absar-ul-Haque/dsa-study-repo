/**
 * Problem: Contiguous Array
 * Difficulty: Medium
 * Pattern: Prefix Sum + HashMap
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Backend Relevance: Finding the longest balanced span between two event types
 *   (e.g. equal reads/writes) — useful for detecting balanced transaction windows.
 */

function findMaxLength(nums) {
  // treat 0 as -1 so "equal count of 0s and 1s" becomes "prefix sum == 0"
  const firstSeenAt = new Map();
  firstSeenAt.set(0, -1); // sum of 0 before any elements, at virtual index -1

  let sum = 0;
  let best = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i] === 1 ? 1 : -1;

    if (firstSeenAt.has(sum)) {
      best = Math.max(best, i - firstSeenAt.get(sum));
    } else {
      firstSeenAt.set(sum, i);
    }
  }
  return best;
}

// ---- Tests ----
console.log(findMaxLength([0, 1]), '// expected: 2');
console.log(findMaxLength([0, 1, 0]), '// expected: 2');
console.log(findMaxLength([0, 0, 1, 0, 1, 1]), '// expected: 6');

// SENIOR NOTES:
// - At 1B+ elements: the firstSeenAt map can hold up to O(n) distinct running
//   sums; if sums are bounded (e.g. capped drift), memory stays much smaller.
// - Distributed systems: like subarray-sum-equals-k, this needs a running
//   "carry" prefix value passed between shards, plus reconciliation of matches
//   that span shard boundaries.
// - Real-world analog: finding the longest window in an access log where reads
//   and writes are perfectly balanced, useful for detecting steady-state periods.

module.exports = findMaxLength;
