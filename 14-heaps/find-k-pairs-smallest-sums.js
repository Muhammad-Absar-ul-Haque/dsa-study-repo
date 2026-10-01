/**
 * Problem: Find K Pairs with Smallest Sums
 * Difficulty: Medium
 * Pattern: Heap / Priority Queue (lazy k-way merge over two sorted arrays)
 * Time Complexity: O(k log k)
 * Space Complexity: O(k)
 * Backend Relevance: Same "generate candidates lazily, expand best-first" shape
 *   as join-order optimization or top-k recommendation blending from two
 *   ranked sources without computing the full cartesian product.
 */

const { MinHeap } = require('../_helpers/heap');

function kSmallestPairs(nums1, nums2, k) {
  const result = [];
  if (nums1.length === 0 || nums2.length === 0 || k <= 0) return result;

  // heap entries: [sum, i, j] meaning pair (nums1[i], nums2[j])
  const heap = new MinHeap((a, b) => a[0] - b[0]);

  // seed with pairing nums1[i] with nums2[0] for the first min(k, nums1.length) values;
  // this is enough to guarantee correctness without pushing the full cartesian product
  for (let i = 0; i < Math.min(nums1.length, k); i++) {
    heap.push([nums1[i] + nums2[0], i, 0]);
  }

  while (!heap.isEmpty() && result.length < k) {
    const [, i, j] = heap.pop();
    result.push([nums1[i], nums2[j]]);

    if (j + 1 < nums2.length) {
      heap.push([nums1[i] + nums2[j + 1], i, j + 1]);
    }
  }

  return result;
}

// ---- Tests ----
console.log(
  kSmallestPairs([1, 7, 11], [2, 4, 6], 3),
  '// expected: [[1,2],[1,4],[1,6]]'
);
console.log(kSmallestPairs([1, 1, 2], [1, 2, 3], 2), '// expected: [[1,1],[1,1]]');
console.log(kSmallestPairs([1, 2], [3], 3), '// expected: [[1,3],[2,3]]');

// SENIOR NOTES:
// - At 1B+ elements: never materialize nums1 x nums2; this lazy-expansion heap
//   approach only ever holds O(k) candidate pairs at a time, which is what
//   makes it viable when both inputs are huge sorted streams.
// - Distributed systems: this mirrors how a federated search or recommendation
//   blender merges two independently ranked result streams (e.g. sponsored +
//   organic results) into a single top-k without full cross-joining them.
// - Real-world analog: merging two sorted price/availability feeds to find the
//   k cheapest combined (flight, hotel) pairs without enumerating every pair.

module.exports = kSmallestPairs;
