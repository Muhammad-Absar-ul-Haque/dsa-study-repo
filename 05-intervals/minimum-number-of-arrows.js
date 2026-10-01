/**
 * Problem: Minimum Number of Arrows to Burst Balloons
 * Difficulty: Medium
 * Pattern: Greedy (sort by end coordinate)
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) extra (excluding sort)
 * Backend Relevance: Same "minimum number of broadcast points" logic used to batch
 * overlapping notification windows or cache invalidations into the fewest possible events.
 */

function findMinArrowShots(points) {
  if (points.length === 0) return 0;

  const sorted = [...points].sort((a, b) => a[1] - b[1]);
  let arrows = 1;
  let arrowPos = sorted[0][1];

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    if (start > arrowPos) {
      // current arrow can't reach this balloon; need a new one
      arrows++;
      arrowPos = end;
    }
    // else: this balloon is already burst by the current arrow
  }

  return arrows;
}

// ---- Tests ----
console.log(findMinArrowShots([[10, 16], [2, 8], [1, 6], [7, 12]]), '// expected:', 2);
console.log(findMinArrowShots([[1, 2], [3, 4], [5, 6], [7, 8]]), '// expected:', 4);
console.log(findMinArrowShots([[1, 2], [2, 3], [3, 4], [4, 5]]), '// expected:', 2);

// SENIOR NOTES:
// - At 1B+ elements: sort dominates; the greedy sweep afterward is O(n) with O(1) state,
//   so it's streaming-friendly once sorted externally.
// - Distributed systems: this is a set-cover-style batching problem — minimizing the
//   number of "broadcast" points that collectively cover all overlapping ranges.
// - Real-world analog: batching cache-invalidation or push-notification events so the
//   fewest number of broadcasts still covers every affected client's active window.

module.exports = findMinArrowShots;
