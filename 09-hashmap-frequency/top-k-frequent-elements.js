/**
 * Problem: Top K Frequent Elements
 * Difficulty: Medium
 * Pattern: Hashmap Frequency Count + Bucket Sort
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Backend Relevance: Same shape as "top N trending products/endpoints" queries over a
 *   request-count histogram — bucket sort avoids an O(n log n) sort when counts are bounded by n.
 */

function topKFrequent(nums, k) {
  const freqMap = new Map();
  for (const n of nums) freqMap.set(n, (freqMap.get(n) || 0) + 1);

  // buckets[freq] = list of numbers that occur exactly `freq` times
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of freqMap) buckets[freq].push(num);

  const result = [];
  for (let freq = buckets.length - 1; freq >= 0 && result.length < k; freq--) {
    for (const num of buckets[freq]) {
      result.push(num);
      if (result.length === k) break;
    }
  }
  return result;
}

// ---- Tests ----
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2), '// expected:', [1, 2]);
console.log(topKFrequent([1], 1), '// expected:', [1]);
console.log(topKFrequent([4, 4, 4, 6, 6, 6, 6, 1, 1, 2], 2), '// expected:', [6, 4]);

// SENIOR NOTES:
// - At 1B+ elements: bucket array sized nums.length+1 explodes in memory; switch to a
//   min-heap of size k (O(n log k)) so memory stays bounded by k, not by n.
// - Distributed systems: compute partial frequency maps per shard, merge counts centrally
//   (or via a combiner step like MapReduce), then run top-k selection on the merged totals.
// - Real-world analog: "trending hashtags" or "top N slow queries" dashboards built on
//   streaming count-min sketches / approximate heavy-hitter algorithms.

module.exports = topKFrequent;
