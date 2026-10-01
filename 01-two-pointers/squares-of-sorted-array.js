/**
 * Problem: Squares of a Sorted Array
 * Difficulty: Easy
 * Pattern: Two Pointers
 * Time Complexity: O(n)
 * Space Complexity: O(n) (for the output array)
 * Backend Relevance: Merging two "sorted-by-magnitude" halves (negatives reversed,
 *   positives forward) in one pass — a common trick in sorted-stream reconciliation.
 */

function sortedSquares(nums) {
  const n = nums.length;
  const result = new Array(n);
  let left = 0;
  let right = n - 1;

  // fill result from the largest square down to the smallest
  for (let k = n - 1; k >= 0; k--) {
    const leftSq = nums[left] * nums[left];
    const rightSq = nums[right] * nums[right];
    if (leftSq > rightSq) {
      result[k] = leftSq;
      left++;
    } else {
      result[k] = rightSq;
      right--;
    }
  }
  return result;
}

// ---- Tests ----
console.log(sortedSquares([-4, -1, 0, 3, 10]), '// expected: [0,1,9,16,100]');
console.log(sortedSquares([-7, -3, 2, 3, 11]), '// expected: [4,9,9,49,121]');
console.log(sortedSquares([-5, -3, -2, -1]), '// expected: [1,4,9,25]');

// SENIOR NOTES:
// - At 1B+ elements: avoids the O(n log n) of "square then sort"; still needs an
//   O(n) output buffer, which is the real memory bottleneck at huge scale.
// - Distributed systems: each shard can produce its own sorted-squares output;
//   the global result then requires a k-way merge across shard outputs.
// - Real-world analog: computing sorted distance-from-baseline metrics (e.g.
//   deviation magnitude) from a sorted set of signed offsets in monitoring data.

module.exports = sortedSquares;
