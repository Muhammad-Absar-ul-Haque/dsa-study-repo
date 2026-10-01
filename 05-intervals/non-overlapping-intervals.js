/**
 * Problem: Non-overlapping Intervals
 * Difficulty: Medium
 * Pattern: Greedy (sort by end time)
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) extra (excluding sort)
 * Backend Relevance: Minimizing removals to make ranges non-overlapping is the same
 * greedy logic used in job/CPU scheduling to maximize the number of tasks that fit.
 */

function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) return 0;

  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
  let removals = 0;
  let lastEnd = sorted[0][1];

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    if (start < lastEnd) {
      // overlap: remove this interval, keep the one with the smaller end
      removals++;
    } else {
      lastEnd = end;
    }
  }

  return removals;
}

// ---- Tests ----
console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]), '// expected:', 1);
console.log(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]), '// expected:', 2);
console.log(eraseOverlapIntervals([[1, 2], [2, 3]]), '// expected:', 0);

// SENIOR NOTES:
// - At 1B+ elements: sort cost dominates; the greedy sweep itself is a single O(n) pass
//   with O(1) state, so it streams well after an external sort.
// - Distributed systems: sort-by-end-time is a classic greedy schedulability check;
//   per-shard candidates can be pre-filtered before a final centralized greedy pass.
// - Real-world analog: scheduling the maximum number of non-conflicting meetings/jobs
//   on a single resource (CPU core, conference room) by always keeping earliest deadline.

module.exports = eraseOverlapIntervals;
