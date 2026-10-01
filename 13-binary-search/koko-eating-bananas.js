/**
 * Problem: Koko Eating Bananas
 * Difficulty: Medium
 * Pattern: Binary Search on the Answer
 * Time Complexity: O(n log m) where n = number of piles, m = max pile size
 * Space Complexity: O(1)
 * Backend Relevance: "Binary search on the answer" is exactly how you'd size a worker pool's throughput (min speed/capacity to meet an SLA deadline).
 */

function minEatingSpeed(piles, h) {
  const hoursNeeded = (speed) => piles.reduce((sum, p) => sum + Math.ceil(p / speed), 0);

  let lo = 1, hi = Math.max(...piles);
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (hoursNeeded(mid) <= h) hi = mid; // fast enough -> try slower
    else lo = mid + 1; // too slow -> need more speed
  }
  return lo;
}

// ---- Tests ----
console.log(minEatingSpeed([3, 6, 7, 11], 8), '// expected:', 4);
console.log(minEatingSpeed([30, 11, 23, 4, 20], 5), '// expected:', 30);
console.log(minEatingSpeed([30, 11, 23, 4, 20], 6), '// expected:', 23);

// SENIOR NOTES:
// - At 1B+ elements: with a billion piles, each hoursNeeded() check becomes O(n), so total cost is O(n log m); parallelize the per-check reduction (map-reduce over piles) to keep it fast.
// - Distributed systems: this is the same technique as capacity planning — binary search the minimum throughput/instance count that satisfies a deadline SLA, checked via a distributed aggregation of per-worker load.
// - Real-world analog: autoscaler sizing (minimum worker throughput to drain a queue by deadline), batch job resource allocation.

module.exports = minEatingSpeed;
