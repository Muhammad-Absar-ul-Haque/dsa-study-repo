/**
 * Problem: Insert Interval
 * Difficulty: Medium
 * Pattern: Sweep / Single Pass (intervals already sorted)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Backend Relevance: Inserting-and-merging a new range into an already-sorted set of
 * ranges is how you apply a single new booking/reservation without re-sorting everything.
 */

function insert(intervals, newInterval) {
  const result = [];
  let [newStart, newEnd] = newInterval;
  let i = 0;
  const n = intervals.length;

  // 1. Add all intervals ending before newInterval starts
  while (i < n && intervals[i][1] < newStart) {
    result.push(intervals[i]);
    i++;
  }

  // 2. Merge all overlapping intervals into newInterval
  while (i < n && intervals[i][0] <= newEnd) {
    newStart = Math.min(newStart, intervals[i][0]);
    newEnd = Math.max(newEnd, intervals[i][1]);
    i++;
  }
  result.push([newStart, newEnd]);

  // 3. Add the rest
  while (i < n) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}

// ---- Tests ----
console.log(JSON.stringify(insert([[1, 3], [6, 9]], [2, 5])), '// expected:', '[[1,5],[6,9]]');
console.log(
  JSON.stringify(insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8])),
  '// expected:',
  '[[1,2],[3,10],[12,16]]'
);
console.log(JSON.stringify(insert([], [5, 7])), '// expected:', '[[5,7]]');

// SENIOR NOTES:
// - At 1B+ elements: this is O(n) since input is pre-sorted, but binary search could
//   locate the overlap window faster (O(log n) + O(k) for k overlapping intervals).
// - Distributed systems: a new booking often needs a single-shard lock/CAS on the
//   affected time range rather than touching the whole sorted structure globally.
// - Real-world analog: inserting a new reservation into a resource's sorted booking
//   calendar (rooms, VMs, licenses) and auto-merging adjacent/overlapping slots.

module.exports = insert;
