/**
 * Problem: Path Sum
 * Difficulty: Easy
 * Pattern: Binary Tree DFS (root-to-leaf accumulation)
 * Time Complexity: O(n)
 * Space Complexity: O(h) recursion stack
 * Backend Relevance: Root-to-leaf accumulation checks are the same primitive
 *   used to validate that a chain of budget allocations down an org hierarchy
 *   sums to an approved total.
 */

const { arrayToTree } = require('../_helpers/tree');

function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum;

  const remaining = targetSum - root.val;
  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}

// ---- Tests ----
console.log(
  hasPathSum(arrayToTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]), 22),
  '// expected: true'
);
console.log(hasPathSum(arrayToTree([1, 2, 3]), 5), '// expected: false');
console.log(hasPathSum(arrayToTree([]), 0), '// expected: false');

// SENIOR NOTES:
// - At 1B+ elements: recursive accumulation on a skewed tree risks stack
//   overflow; an iterative DFS with an explicit stack carrying running sums
//   avoids that while preserving early-exit behavior.
// - Distributed systems: verifying root-to-leaf sums in a sharded tree needs
//   each shard to pass down the accumulated sum-so-far to child shards rather
//   than relying on a single call stack spanning the whole structure.
// - Real-world analog: validating that a chain of nested budget/permission
//   allocations (parent grants child a sub-allowance) sums correctly down to
//   leaf-level approved spend.

module.exports = hasPathSum;
