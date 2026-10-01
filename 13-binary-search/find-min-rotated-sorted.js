/**
 * Problem: Find Minimum in Rotated Sorted Array
 * Difficulty: Medium
 * Pattern: Binary Search (find rotation pivot)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Backend Relevance: Finding the "oldest"/wrap point in a rotated log or ring buffer without scanning it all.
 */

function findMin(nums) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] > nums[hi]) {
      lo = mid + 1; // pivot is to the right of mid
    } else {
      hi = mid; // pivot is at mid or to the left
    }
  }
  return nums[lo];
}

// ---- Tests ----
console.log(findMin([3, 4, 5, 1, 2]), '// expected:', 1);
console.log(findMin([4, 5, 6, 7, 0, 1, 2]), '// expected:', 0);
console.log(findMin([11, 13, 15, 17]), '// expected:', 11); // not rotated

// SENIOR NOTES:
// - At 1B+ elements: still O(log n) in RAM, but on distributed/paged storage each comparison may be a network/disk hop, so minimizing round trips (not just comparisons) matters more than raw log n.
// - Distributed systems: finding the rotation point is like finding the current "head" offset in a distributed ring/append log after a wraparound or leader failover.
// - Real-world analog: circular buffer wraparound detection, finding the oldest entry in a fixed-capacity ring log.

module.exports = findMin;
