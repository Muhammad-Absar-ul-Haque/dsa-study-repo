/**
 * Problem: Merge Sorted Array (in-place)
 * Difficulty: Easy
 * Pattern: Two Pointers (merge from the back)
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 * Backend Relevance: Merging two sorted result pages in-place without allocating
 *   a new buffer, similar to merging incoming sorted deltas into a base dataset.
 */

function merge(nums1, m, nums2, n) {
  let i = m - 1;       // last real element in nums1
  let j = n - 1;       // last element in nums2
  let write = m + n - 1; // last writable slot in nums1

  // fill from the back so we never overwrite unread nums1 elements
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[write] = nums1[i];
      i--;
    } else {
      nums1[write] = nums2[j];
      j--;
    }
    write--;
  }
  return nums1;
}

// ---- Tests ----
console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3), '// expected: [1,2,2,3,5,6]');
console.log(merge([1], 1, [], 0), '// expected: [1]');
console.log(merge([0], 0, [1], 1), '// expected: [1]');

// SENIOR NOTES:
// - At 1B+ elements: merging from the back avoids an O(m+n) auxiliary array,
//   critical when nums1's backing store is a fixed-size mmap'd buffer.
// - Distributed systems: this is exactly one step of external merge sort used
//   to combine sorted runs that are too large to fit in memory.
// - Real-world analog: merging a sorted "new writes" batch into a sorted SSTable
//   segment during LSM-tree compaction, or merging paginated sorted API results.

module.exports = merge;
