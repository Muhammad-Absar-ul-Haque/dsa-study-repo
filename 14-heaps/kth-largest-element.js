/**
 * Problem: Kth Largest Element in an Array
 * Difficulty: Medium
 * Pattern: Heap / Priority Queue (fixed-size min-heap)
 * Time Complexity: O(n log k)
 * Space Complexity: O(k)
 * Backend Relevance: Same shape as "top-k slowest queries" or "k-th percentile
 *   latency" dashboards that must scan a stream without holding it all in memory.
 */

const { MinHeap } = require('../_helpers/heap');

function findKthLargest(nums, k) {
  const heap = new MinHeap();

  for (const num of nums) {
    heap.push(num);
    if (heap.size() > k) heap.pop(); // drop the smallest, keep k largest seen so far
  }

  return heap.peek();
}

// ---- Tests ----
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2), '// expected: 5');
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), '// expected: 4');
console.log(findKthLargest([1], 1), '// expected: 1');

// SENIOR NOTES:
// - At 1B+ elements: quickselect gives O(n) average but O(n^2) worst case and
//   mutates the input; the heap approach here is O(n log k) and streams cleanly,
//   which matters when nums arrives as an unbounded feed rather than an array.
// - Distributed systems: each shard maintains its own top-k min-heap, then a
//   coordinator merges the shard-local top-k lists (size k * numShards) to find
//   the global kth largest — classic map-reduce top-k pattern.
// - Real-world analog: maintaining a live leaderboard or top-k slowest endpoints
//   in an APM system without buffering the entire request stream.

module.exports = findKthLargest;
