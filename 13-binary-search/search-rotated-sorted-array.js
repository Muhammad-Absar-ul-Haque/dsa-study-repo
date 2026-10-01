/**
 * Problem: Search in Rotated Sorted Array
 * Difficulty: Medium
 * Pattern: Binary Search (modified — one half is always sorted)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Backend Relevance: Models searching over sorted-but-wrapped data, e.g. circular log buffers or ring-indexed queues.
 */

function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] === target) return mid;

    if (nums[lo] <= nums[mid]) {
      // left half [lo..mid] is sorted
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      // right half [mid..hi] is sorted
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}

// ---- Tests ----
console.log(search([4, 5, 6, 7, 0, 1, 2], 0), '// expected:', 4);
console.log(search([4, 5, 6, 7, 0, 1, 2], 3), '// expected:', -1);
console.log(search([1], 0), '// expected:', -1);

// SENIOR NOTES:
// - At 1B+ elements: this trick still requires the array to fit a single logical order; real rotated/wrapped datasets (ring buffers) usually track the rotation offset explicitly instead of re-deriving it each search.
// - Distributed systems: rotation is analogous to a leader/offset shift in a distributed ring buffer (Kafka partition wraparound); consumers track offsets rather than searching for the "rotation point".
// - Real-world analog: circular log buffer search, Kafka partition offset lookups, rotated version-controlled backup indices.

module.exports = search;
