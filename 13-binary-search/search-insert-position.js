/**
 * Problem: Search Insert Position
 * Difficulty: Easy
 * Pattern: Binary Search (lower bound)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Backend Relevance: The "lower bound" pattern used to find the correct insertion index to keep a sorted index/array intact.
 */

function searchInsert(nums, target) {
  let lo = 0, hi = nums.length; // hi is exclusive upper bound to allow inserting past the end
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

// ---- Tests ----
console.log(searchInsert([1, 3, 5, 6], 5), '// expected:', 2);
console.log(searchInsert([1, 3, 5, 6], 2), '// expected:', 1);
console.log(searchInsert([1, 3, 5, 6], 7), '// expected:', 4);
console.log(searchInsert([1, 3, 5, 6], 0), '// expected:', 0);

// SENIOR NOTES:
// - At 1B+ elements: this "lower bound" search is exactly what sorted-array/B-tree insert operations use to find the correct slot before shifting/splitting nodes.
// - Distributed systems: inserting into a distributed sorted index (e.g. a range-partitioned table) uses this same lower-bound logic to pick which shard/range owns the new key.
// - Real-world analog: `Array.prototype` sorted insertion, database B-tree leaf insertion point lookup, Python's `bisect.insort`.

module.exports = searchInsert;
