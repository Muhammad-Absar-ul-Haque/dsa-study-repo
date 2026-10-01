/**
 * Problem: Meeting Rooms (can attend all?)
 * Difficulty: Easy
 * Pattern: Sort + Adjacent Comparison
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) extra (excluding sort)
 * Backend Relevance: A quick feasibility check for whether a single worker/resource
 * can service a sequence of jobs without any time conflicts.
 */

function canAttendMeetings(intervals) {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i][0] < sorted[i - 1][1]) {
      return false;
    }
  }

  return true;
}

// ---- Tests ----
console.log(canAttendMeetings([[0, 30], [5, 10], [15, 20]]), '// expected:', false);
console.log(canAttendMeetings([[7, 10], [2, 4]]), '// expected:', true);
console.log(canAttendMeetings([]), '// expected:', true);

// SENIOR NOTES:
// - At 1B+ elements: only a single sorted pass is needed, so once sorted this streams
//   through in O(1) memory; the bottleneck is entirely the sort step.
// - Distributed systems: a single-resource conflict check maps to verifying a single
//   lock/queue has no double-booked time slots before granting a new reservation.
// - Real-world analog: validating a single agent's/engineer's on-call calendar or a
//   single machine's job schedule has no double-bookings before accepting a new one.

module.exports = canAttendMeetings;
