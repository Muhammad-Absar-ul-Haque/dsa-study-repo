/**
 * Problem: Find the Duplicate Number
 * Difficulty: Medium
 * Pattern: Floyd's Cycle Detection (treat array as a linked list via index-hopping)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: Detecting a cycle without extra memory mirrors cycle detection in
 *   dependency graphs or linked resource chains where allocating a visited-set isn't viable.
 */

function findDuplicate(nums) {
  let slow = nums[0];
  let fast = nums[0];

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return fast;
}

// ---- Tests ----
console.log(findDuplicate([1, 3, 4, 2, 2]), '// expected:', 2);
console.log(findDuplicate([3, 1, 3, 4, 2]), '// expected:', 3);
console.log(findDuplicate([1, 1]), '// expected:', 1);

// SENIOR NOTES:
// - At 1B+ elements: O(1) space is essential — a hash-set approach would need gigabytes of
//   memory to track billions of visited values.
// - Distributed systems: this algorithm fundamentally requires sequential pointer-chasing on
//   a single array, so it does not parallelize; distributed dedup would instead use sharded
//   hash sets merged via a reduce step.
// - Real-world analog: detecting a cycle in a symlink chain or a circular reference in a
//   service dependency graph using constant extra memory.

module.exports = findDuplicate;
