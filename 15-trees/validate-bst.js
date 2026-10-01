/**
 * Problem: Validate Binary Search Tree
 * Difficulty: Medium
 * Pattern: Binary Tree DFS (range validation)
 * Time Complexity: O(n)
 * Space Complexity: O(h) recursion stack
 * Backend Relevance: This is the exact invariant check a B-tree/BST-backed
 *   database index must maintain to guarantee correct ordered range scans.
 */

const { arrayToTree } = require('../_helpers/tree');

function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}

// ---- Tests ----
console.log(isValidBST(arrayToTree([2, 1, 3])), '// expected: true');
console.log(isValidBST(arrayToTree([5, 1, 4, null, null, 3, 6])), '// expected: false');
console.log(isValidBST(arrayToTree([5, 4, 6, null, null, 3, 7])), '// expected: false');

// SENIOR NOTES:
// - At 1B+ elements: recursive range-checking on a skewed BST overflows the
//   stack; an iterative in-order traversal comparing each value to the
//   previous one avoids recursion and detects violations in a single pass.
// - Distributed systems: validating a sharded BST/B-tree index requires each
//   shard to prove its local ordering plus boundary handoff (the max of shard
//   i must be less than the min of shard i+1) rather than a single walk.
// - Real-world analog: integrity checks on a database B-tree index after a
//   crash or corruption, ensuring range scans return correctly ordered results.

module.exports = isValidBST;
