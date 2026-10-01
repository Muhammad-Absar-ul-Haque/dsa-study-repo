/**
 * Problem: Container With Most Water
 * Difficulty: Medium
 * Pattern: Two Pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: Resource allocation trade-off (max throughput bounded by the
 *   smaller of two capacity limits) similar to matching buffer sizes in a pipeline.
 */

function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let best = 0;

  while (left < right) {
    const width = right - left;
    const boundedHeight = Math.min(height[left], height[right]);
    best = Math.max(best, width * boundedHeight);

    // always move the shorter wall inward; moving the taller one can never help
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return best;
}

// ---- Tests ----
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), '// expected: 49');
console.log(maxArea([1, 1]), '// expected: 1');
console.log(maxArea([4, 3, 2, 1, 4]), '// expected: 16');

// SENIOR NOTES:
// - At 1B+ elements: still O(n) and O(1) space, so it scales linearly; the real
//   constraint becomes I/O throughput of streaming the array from disk/network.
// - Distributed systems: hard to shard cleanly because the optimal pair can span
//   shard boundaries; you'd need to keep global min/max candidates per shard and
//   merge boundary candidates centrally.
// - Real-world analog: capacity planning where throughput between two nodes is
//   capped by the weaker link (bandwidth = min(nodeA, nodeB) * distance factor).

module.exports = maxArea;
