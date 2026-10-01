/**
 * Problem: Top K Frequent Elements (heap-based)
 * Difficulty: Medium
 * Pattern: Heap / Priority Queue (frequency count + min-heap of size k)
 * Time Complexity: O(n log k)
 * Space Complexity: O(n) for the frequency map + O(k) for the heap
 * Backend Relevance: Directly mirrors "top k most requested endpoints" or
 *   "most frequent error codes" analytics computed from log/event streams.
 */

const { MinHeap } = require('../_helpers/heap');

function topKFrequent(nums, k) {
  const freq = new Map();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  // min-heap ordered by frequency, keeps only the k most frequent seen so far
  const heap = new MinHeap((a, b) => a.count - b.count);

  for (const [value, count] of freq) {
    heap.push({ value, count });
    if (heap.size() > k) heap.pop();
  }

  return heap.toArray()
    .sort((a, b) => b.count - a.count)
    .map((entry) => entry.value);
}

// ---- Tests ----
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2), '// expected: [1,2]');
console.log(topKFrequent([1], 1), '// expected: [1]');
console.log(topKFrequent([4, 4, 4, 6, 6, 1, 1, 1, 1], 2), '// expected: [1,4]');

// SENIOR NOTES:
// - At 1B+ elements: the frequency map itself can outgrow memory (unbounded
//   cardinality); you'd need an approximate counter like Count-Min Sketch plus
//   a Space-Saving algorithm to bound memory while tracking heavy hitters.
// - Distributed systems: each node computes local top-k with local frequencies,
//   ships them to a reducer that sums counts per key and re-selects the global
//   top-k — same pattern as distributed word-count + top-k pipelines.
// - Real-world analog: "trending hashtags" or "most frequent 5xx error routes"
//   panels computed on a rolling window of log events.

module.exports = topKFrequent;
