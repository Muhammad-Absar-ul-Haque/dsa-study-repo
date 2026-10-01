/**
 * Problem: Move Zeroes
 * Difficulty: Easy
 * Pattern: Two Pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: In-place compaction, like moving "null"/tombstone records to
 *   the end of a buffer before a batch write, preserving order of live records.
 */

function moveZeroes(nums) {
  let insertPos = 0; // next slot for a non-zero value

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[insertPos], nums[i]] = [nums[i], nums[insertPos]];
      insertPos++;
    }
  }
  return nums;
}

// ---- Tests ----
console.log(moveZeroes([0, 1, 0, 3, 12]), '// expected: [1,3,12,0,0]');
console.log(moveZeroes([0]), '// expected: [0]');
console.log(moveZeroes([1, 2, 3]), '// expected: [1,2,3]');

// SENIOR NOTES:
// - At 1B+ elements: O(1) extra space and a single pass keep this scalable; a
//   naive filter+concat approach would double memory usage temporarily.
// - Distributed systems: per-shard compaction is easy, but preserving GLOBAL
//   relative order of non-zero elements requires a final merge/reindex pass.
// - Real-world analog: garbage collection compaction (moving live objects to one
//   end of a heap segment, freeing contiguous space at the other end).

module.exports = moveZeroes;
