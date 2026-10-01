/**
 * Problem: Binary Search
 * Difficulty: Easy
 * Pattern: Binary Search
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Backend Relevance: The foundational lookup pattern behind sorted index scans in databases and B-tree page navigation.
 */

function binarySearch(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

// ---- Tests ----
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9), '// expected:', 4);
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 2), '// expected:', -1);
console.log(binarySearch([5], 5), '// expected:', 0);

// SENIOR NOTES:
// - At 1B+ elements: binary search on an array in RAM is still O(log n) ~ 30 comparisons, but cache-unfriendly random access hurts; B-trees group comparisons per disk/cache page to reduce page faults.
// - Distributed systems: searching across a billion sorted items usually means routing to the right shard first (via a range/hash index), then binary-searching within that shard.
// - Real-world analog: database B-tree index lookups, binary search in sorted log files, `bisect` module use cases.

module.exports = binarySearch;
