/**
 * Problem: Median of Two Sorted Arrays
 * Difficulty: Hard
 * Pattern: Binary Search (partition search across two arrays)
 * Time Complexity: O(log(min(m, n)))
 * Space Complexity: O(1)
 * Backend Relevance: Same partitioning idea as merging two sorted result sets (e.g. two sharded/paginated query results) without fully merging them.
 */

function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1]; // binary search on the smaller array
  const m = nums1.length, n = nums2.length;
  const half = Math.floor((m + n + 1) / 2);

  let lo = 0, hi = m;
  while (lo <= hi) {
    const i = lo + ((hi - lo) >> 1); // partition index in nums1
    const j = half - i; // partition index in nums2

    const left1 = i === 0 ? -Infinity : nums1[i - 1];
    const right1 = i === m ? Infinity : nums1[i];
    const left2 = j === 0 ? -Infinity : nums2[j - 1];
    const right2 = j === n ? Infinity : nums2[j];

    if (left1 <= right2 && left2 <= right1) {
      if ((m + n) % 2 === 0) {
        return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
      }
      return Math.max(left1, left2);
    } else if (left1 > right2) {
      hi = i - 1; // i too large, move left
    } else {
      lo = i + 1; // i too small, move right
    }
  }
  throw new Error('Input arrays must be sorted');
}

// ---- Tests ----
console.log(findMedianSortedArrays([1, 3], [2]), '// expected:', 2);
console.log(findMedianSortedArrays([1, 2], [3, 4]), '// expected:', 2.5);
console.log(findMedianSortedArrays([], [1]), '// expected:', 1);
console.log(findMedianSortedArrays([2], []), '// expected:', 2);

// SENIOR NOTES:
// - At 1B+ elements: this avoids the O(m+n) full merge, which matters enormously at scale; but real systems rarely need an exact median of two huge sorted sets in one call — they approximate.
// - Distributed systems: computing an exact median across sharded, sorted partitions is a hard distributed problem; production systems use approximate quantile sketches (t-digest, HDR histogram) instead of exact partition search.
// - Real-world analog: merging two paginated/sorted API result sets without materializing the full merge, approximate percentile monitoring (p50 latency dashboards).

module.exports = findMedianSortedArrays;
