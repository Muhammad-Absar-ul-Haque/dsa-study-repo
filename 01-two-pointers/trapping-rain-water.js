/**
 * Problem: Trapping Rain Water
 * Difficulty: Hard
 * Pattern: Two Pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: Buffer/queue fill-level analysis — how much "slack capacity"
 *   accumulates between peaks in a bounded resource timeline.
 */

function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      // the right side guarantees a wall at least height[right] tall,
      // so water level at `left` is bounded by leftMax
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}

// ---- Tests ----
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), '// expected: 6');
console.log(trap([4, 2, 0, 3, 2, 5]), '// expected: 9');
console.log(trap([]), '// expected: 0');

// SENIOR NOTES:
// - At 1B+ elements: O(n)/O(1) is already optimal; watch for integer overflow in
//   languages with fixed-width ints when heights and counts are both huge (JS
//   numbers are safe up to 2^53).
// - Distributed systems: split into contiguous ranges, compute per-range prefix
//   max/suffix max, then merge boundary walls to reconcile trapped water across
//   shard edges — classic map-reduce with a boundary-correction pass.
// - Real-world analog: elevation/terrain flood simulation, or tracking idle
//   capacity trapped between load spikes in a time-series of server utilization.

module.exports = trap;
