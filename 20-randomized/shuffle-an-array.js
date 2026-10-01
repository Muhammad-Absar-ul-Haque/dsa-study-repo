/**
 * Problem: Shuffle an Array
 * Difficulty: Medium
 * Pattern: Randomized / Fisher-Yates Shuffle
 * Time Complexity: O(n) per shuffle(), O(1) reset()
 * Space Complexity: O(n)
 * Backend Relevance: Uniform random shuffling underlies fair randomized
 * queue/task ordering, shuffled playlist/feed generation, and randomized
 * A/B test bucket assignment without bias toward any position.
 */

class Solution {
  constructor(nums) {
    this.original = [...nums];
    this.array = [...nums];
  }

  reset() {
    this.array = [...this.original];
    return this.array;
  }

  shuffle() {
    const arr = this.array;
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

// ---- Tests ----
const sol = new Solution([1, 2, 3, 4, 5]);
const shuffled = sol.shuffle();
console.log(shuffled, '// expected: some permutation of [1,2,3,4,5]');
const sortedShuffled = [...shuffled].sort((a, b) => a - b);
console.log(
  JSON.stringify(sortedShuffled) === JSON.stringify([1, 2, 3, 4, 5]),
  '// sanity check: shuffled array is still a permutation of the original, expected:',
  true
);

const reset = sol.reset();
console.log(reset, '// expected:', [1, 2, 3, 4, 5]);

// SENIOR NOTES:
// - At 1B+ elements: Fisher-Yates is already optimal O(n) time / O(1) extra
//   space (in-place); the real bottleneck becomes generating enough high
//   quality random bits fast enough and cache locality of huge arrays.
// - Distributed systems: shuffling a dataset partitioned across nodes needs
//   a distributed shuffle (as in MapReduce/Spark) — records are redistributed
//   across partitions via a random or hashed key, not swapped in place.
// - Real-world analog: shuffling a playlist, randomizing quiz question order,
//   or de-biasing display order in a feed/recommendation system.

module.exports = Solution;
