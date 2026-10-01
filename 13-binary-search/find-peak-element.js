/**
 * Problem: Find Peak Element
 * Difficulty: Medium
 * Pattern: Binary Search (on the slope of an unsorted-but-locally-monotonic array)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Backend Relevance: Same shape as hill-climbing to a local optimum in monitoring metrics (finding a local traffic/load spike quickly).
 */

function findPeakElement(nums) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] > nums[mid + 1]) {
      hi = mid; // descending here -> a peak is at mid or to the left
    } else {
      lo = mid + 1; // ascending here -> a peak is to the right
    }
  }
  return lo;
}

// ---- Tests ----
console.log(findPeakElement([1, 2, 3, 1]), '// expected:', 2);
const peakIdx = findPeakElement([1, 2, 1, 3, 5, 6, 4]);
console.log(peakIdx, '// expected: 1 or 5 (any index where neighbors are smaller)');
console.log([1, 2, 1, 3, 5, 6, 4][peakIdx] > ([1, 2, 1, 3, 5, 6, 4][peakIdx - 1] ?? -Infinity)
  && [1, 2, 1, 3, 5, 6, 4][peakIdx] > ([1, 2, 1, 3, 5, 6, 4][peakIdx + 1] ?? -Infinity), '// expected:', true);

// SENIOR NOTES:
// - At 1B+ elements: still O(log n), but "peak" definitions in real metrics data are noisy, so production monitoring uses smoothing/windowing before applying this kind of search.
// - Distributed systems: finding a local maximum across sharded time-series data requires merging candidate peaks from each shard, since no single node sees the whole sequence.
// - Real-world analog: anomaly/spike detection in metrics dashboards, gradient-ascent-style hyperparameter search.

module.exports = findPeakElement;
