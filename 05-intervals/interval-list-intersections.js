/**
 * Problem: Interval List Intersections
 * Difficulty: Medium
 * Pattern: Two Pointers
 * Time Complexity: O(m + n)
 * Space Complexity: O(m + n) for the output
 * Backend Relevance: Merging two sorted lists of availability windows to find common
 * overlap is exactly how you compute "when are both parties free" for scheduling.
 */

function intervalIntersection(firstList, secondList) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < firstList.length && j < secondList.length) {
    const [aStart, aEnd] = firstList[i];
    const [bStart, bEnd] = secondList[j];

    const start = Math.max(aStart, bStart);
    const end = Math.min(aEnd, bEnd);

    if (start <= end) {
      result.push([start, end]);
    }

    // move past whichever interval ends first
    if (aEnd < bEnd) {
      i++;
    } else {
      j++;
    }
  }

  return result;
}

// ---- Tests ----
console.log(
  JSON.stringify(
    intervalIntersection(
      [[0, 2], [5, 10], [13, 23], [24, 25]],
      [[1, 5], [8, 12], [15, 24], [25, 26]]
    )
  ),
  '// expected:',
  '[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]'
);
console.log(JSON.stringify(intervalIntersection([], [[1, 5]])), '// expected:', '[]');
console.log(JSON.stringify(intervalIntersection([[1, 7]], [[3, 10]])), '// expected:', '[[3,7]]');

// SENIOR NOTES:
// - At 1B+ elements: two-pointer merge is O(m+n) streaming, ideal for external/lazy
//   iteration over two huge pre-sorted availability lists without loading both fully.
// - Distributed systems: mirrors merging two sorted availability streams from separate
//   services (e.g. two calendar providers) without a centralized full-data join.
// - Real-world analog: finding overlapping free/busy windows between two calendars,
//   or common valid time ranges between a feature flag rollout and a user's session.

module.exports = intervalIntersection;
