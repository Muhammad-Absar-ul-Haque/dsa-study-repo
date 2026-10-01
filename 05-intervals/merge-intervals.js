/**
 * Problem: Merge Intervals
 * Difficulty: Medium
 * Pattern: Sort + Sweep
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * Backend Relevance: Merging overlapping time ranges is exactly how you collapse
 * overlapping maintenance windows, booking slots, or rate-limit windows into a clean set.
 */

function merge(intervals) {
  if (intervals.length <= 1) return intervals.slice();

  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const result = [sorted[0].slice()];

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    const last = result[result.length - 1];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      result.push([start, end]);
    }
  }

  return result;
}

// ---- Tests ----
console.log(JSON.stringify(merge([[1, 3], [2, 6], [8, 10], [15, 18]])), '// expected:', '[[1,6],[8,10],[15,18]]');
console.log(JSON.stringify(merge([[1, 4], [4, 5]])), '// expected:', '[[1,5]]');
console.log(JSON.stringify(merge([[1, 4], [0, 4]])), '// expected:', '[[0,4]]');

// SENIOR NOTES:
// - At 1B+ elements: sort dominates cost (O(n log n)); an external merge sort is needed
//   once intervals don't fit in memory, followed by a single streaming sweep.
// - Distributed systems: each shard can sort+merge locally, then a final reducer merges
//   the sorted boundary intervals across shards (classic map-reduce merge-sort pattern).
// - Real-world analog: collapsing overlapping calendar bookings, deployment freeze
//   windows, or IP/CIDR range consolidation in firewall rule tables.

module.exports = merge;
