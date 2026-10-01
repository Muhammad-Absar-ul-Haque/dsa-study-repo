/**
 * Problem: Meeting Rooms II (min rooms needed)
 * Difficulty: Medium
 * Pattern: Sort + Min-Heap of end times
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * Backend Relevance: This is literally connection-pool / worker-pool sizing: the peak
 * concurrent overlap count tells you the minimum number of resources needed simultaneously.
 */

const { MinHeap } = require('../_helpers/heap');

function minMeetingRooms(intervals) {
  if (intervals.length === 0) return 0;

  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const endTimesHeap = new MinHeap((a, b) => a - b);

  for (const [start, end] of sorted) {
    // If the earliest-ending meeting already finished by the time this one starts,
    // reuse that room instead of allocating a new one.
    if (!endTimesHeap.isEmpty() && endTimesHeap.peek() <= start) {
      endTimesHeap.pop();
    }
    endTimesHeap.push(end);
  }

  return endTimesHeap.size();
}

// ---- Tests ----
console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20]]), '// expected:', 2);
console.log(minMeetingRooms([[7, 10], [2, 4]]), '// expected:', 1);
console.log(minMeetingRooms([[1, 5], [8, 9], [8, 9]]), '// expected:', 2);

// SENIOR NOTES:
// - At 1B+ elements: heap size stays bounded by peak concurrency, not total n, so
//   memory usage tracks "how much overlaps at once," which is usually small.
// - Distributed systems: this is exactly how you size a connection pool or worker
//   fleet — peak concurrent demand, not total request count, determines capacity.
// - Real-world analog: autoscaling worker/thread pools, database connection pool
//   sizing, or physical meeting room allocation for a company calendar.

module.exports = minMeetingRooms;
