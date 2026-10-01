/**
 * Problem: Corporate Flight Bookings
 * Difficulty: Medium
 * Pattern: Difference Array (Prefix Sum trick)
 * Time Complexity: O(n + bookings.length)
 * Space Complexity: O(n)
 * Backend Relevance: Aggregating overlapping range-based reservations into
 *   per-slot totals — the same shape as computing per-day seat/inventory counts.
 */

function corpFlightBookings(bookings, n) {
  const diff = new Array(n + 1).fill(0);

  for (const [first, last, seats] of bookings) {
    // flights are 1-indexed in the problem statement
    diff[first - 1] += seats;
    diff[last] -= seats;
  }

  const result = new Array(n).fill(0);
  let running = 0;
  for (let i = 0; i < n; i++) {
    running += diff[i];
    result[i] = running;
  }
  return result;
}

// ---- Tests ----
console.log(
  corpFlightBookings([[1, 2, 10], [2, 3, 20], [2, 5, 25]], 5),
  '// expected: [10, 55, 45, 25, 25]'
);
console.log(corpFlightBookings([[1, 2, 10], [2, 2, 15]], 2), '// expected: [10, 25]');
console.log(corpFlightBookings([[1, 1, 5]], 1), '// expected: [5]');

// SENIOR NOTES:
// - At 1B+ elements: same difference-array trick as Range Addition — turns m
//   range updates into O(m + n) instead of O(m * n) naive per-flight loops.
// - Distributed systems: partition flight numbers into ranges/shards, apply each
//   booking's diff only to shards it overlaps, and carry a running total between
//   adjacent shards to reconstruct the global per-flight totals.
// - Real-world analog: computing daily seat-booking totals across overlapping
//   reservation ranges for an airline or hotel inventory system.

module.exports = corpFlightBookings;
