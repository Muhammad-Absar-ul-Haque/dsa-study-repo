/**
 * Problem: Car Pooling
 * Difficulty: Medium
 * Pattern: Difference Array (Prefix Sum trick)
 * Time Complexity: O(n + maxDistance)
 * Space Complexity: O(maxDistance)
 * Backend Relevance: Checking capacity limits over overlapping time ranges, like
 *   verifying a connection pool never exceeds max concurrent connections.
 */

function carPooling(trips, capacity) {
  // find the max "to" location to size the difference array
  let maxDistance = 0;
  for (const [, , to] of trips) maxDistance = Math.max(maxDistance, to);

  const diff = new Array(maxDistance + 1).fill(0);

  for (const [passengers, from, to] of trips) {
    diff[from] += passengers;
    diff[to] -= passengers; // passengers leave exactly at `to`, so no overlap there
  }

  let current = 0;
  for (const delta of diff) {
    current += delta;
    if (current > capacity) return false;
  }
  return true;
}

// ---- Tests ----
console.log(carPooling([[2, 1, 5], [3, 3, 7]], 4), '// expected: false');
console.log(carPooling([[2, 1, 5], [3, 3, 7]], 5), '// expected: true');
console.log(carPooling([[2, 1, 5], [3, 5, 7]], 3), '// expected: true');

// SENIOR NOTES:
// - At 1B+ elements: if distances span a huge range, a plain array diff is
//   wasteful; use a sorted-events approach (sort start/end deltas) for O(n log n)
//   time and O(n) space instead of O(maxDistance) space.
// - Distributed systems: this is a capacity-check problem — shard by time range,
//   compute local occupancy deltas, then merge boundary-crossing trips centrally
//   before validating the global capacity constraint.
// - Real-world analog: validating that a shared resource pool (DB connections,
//   elevator capacity, meeting room seats) never exceeds capacity across all
//   overlapping reservation intervals.

module.exports = carPooling;
