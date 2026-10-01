/**
 * Problem: Two Sum Less Than K
 * Difficulty: Easy
 * Pattern: Sort + two pointers, maximize sum under a ceiling
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) extra (excluding sort space)
 * Backend Relevance: Maximizing a pair sum under a hard ceiling is the same shape
 *   as pairing two resource requests to maximize utilization without exceeding a
 *   capacity limit (e.g. bin-packing two jobs onto a machine under a CPU cap).
 */

function twoSumLessThanK(nums, k) {
  const sorted = [...nums].sort((a, b) => a - b);
  let left = 0;
  let right = sorted.length - 1;
  let best = -1;

  while (left < right) {
    const sum = sorted[left] + sorted[right];
    if (sum < k) {
      best = Math.max(best, sum);
      left++;
    } else {
      right--;
    }
  }

  return best;
}

// ---- Tests ----
console.log(twoSumLessThanK([34, 23, 1, 24, 75, 33, 54, 8], 60), '// expected: 58');
console.log(twoSumLessThanK([10, 20, 30], 15), '// expected: -1');
console.log(twoSumLessThanK([1, 2, 3, 4], 100), '// expected: 7');

// SENIOR NOTES:
// - At 1B+ elements: O(n log n) sort dominates; for huge datasets you'd use an
//   external merge sort or maintain a sorted structure incrementally rather than
//   re-sorting from scratch on every query.
// - Distributed systems: after a distributed sort (or with pre-sorted shards),
//   the two-pointer scan needs global left/right pointers coordinated across
//   shard boundaries, similar to a distributed merge-join with a ceiling filter.
// - Real-world analog: capacity-constrained pairing (e.g. matching two shipment
//   weights to maximize truck load without exceeding a legal weight limit).

module.exports = twoSumLessThanK;
