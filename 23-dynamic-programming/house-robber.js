/**
 * Problem: House Robber
 * Difficulty: Medium
 * Pattern: Dynamic Programming (rolling max with no-adjacent constraint)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: The "pick non-adjacent items to maximize value" shape
 * models scheduling non-overlapping high-value jobs on a single resource,
 * or selecting maximum-reward slots subject to a cooldown constraint.
 */

function rob(nums) {
  let prev = 0; // best up to i-2
  let curr = 0; // best up to i-1
  for (const n of nums) {
    [prev, curr] = [curr, Math.max(curr, prev + n)];
  }
  return curr;
}

// ---- Tests ----
console.log(rob([1, 2, 3, 1]), '// expected:', 4);
console.log(rob([2, 7, 9, 3, 1]), '// expected:', 12);
console.log(rob([]), '// expected:', 0);

// SENIOR NOTES:
// - At 1B+ elements: O(n) time and O(1) space already scale linearly and
//   fit memory constraints; the practical limit becomes single-pass I/O
//   throughput if values are streamed rather than held in an array.
// - Distributed systems: the strict sequential dependency (each decision
//   depends on the prior one) resists naive parallelism, but the array can
//   be split into chunks with DP recomputed at chunk boundaries using the
//   last two states passed forward (classic prefix-scan parallelization).
// - Real-world analog: maximizing revenue from non-overlapping ad slots or
//   job bookings on a single timeline where adjacent slots conflict.

module.exports = rob;
