/**
 * Problem: Random Pick Index
 * Difficulty: Medium
 * Pattern: Randomized / Reservoir Sampling
 * Time Complexity: O(n) per pick() call, O(1) construction
 * Space Complexity: O(n) to store nums, O(1) extra for sampling
 * Backend Relevance: Reservoir sampling is used to pick a uniformly random
 * item from a stream of unknown/unbounded length, e.g. sampling log lines
 * or events for observability without buffering the whole stream.
 */

class Solution {
  constructor(nums) {
    this.nums = nums;
  }

  pick(target) {
    let count = 0;
    let result = -1;
    for (let i = 0; i < this.nums.length; i++) {
      if (this.nums[i] === target) {
        count++;
        // Replace the chosen result with probability 1/count so every
        // matching index ends up equally likely (reservoir sampling).
        if (Math.floor(Math.random() * count) === 0) result = i;
      }
    }
    return result;
  }
}

// ---- Tests ----
const sol = new Solution([1, 2, 3, 3, 3]);
for (let i = 0; i < 5; i++) {
  const idx = sol.pick(3);
  console.log(idx, '// expected: index in {2,3,4} (nums[idx] === 3)', sol.nums[idx] === 3);
}
const idx2 = sol.pick(1);
console.log(idx2, '// expected:', 0);

// SENIOR NOTES:
// - At 1B+ elements: O(n) per pick() is too slow if pick() is called often;
//   pre-building a value -> list-of-indices map trades O(n) space for O(1)
//   (well, O(1) random) pick, which is the practical production choice.
// - Distributed systems: true reservoir sampling shines when data streams
//   through multiple nodes (e.g. Kafka consumers) and no node can hold the
//   full dataset — each node maintains its own reservoir, merged via weighted
//   probability at aggregation time.
// - Real-world analog: sampling random log lines/events matching a filter
//   from an infinite stream without buffering everything in memory.

module.exports = Solution;
