/**
 * Problem: Maximum Depth of Binary Tree
 * Difficulty: Easy
 * Pattern: Binary Tree DFS
 * Time Complexity: O(n)
 * Space Complexity: O(h), h = tree height (recursion stack); O(n) worst case for a skewed tree
 * Backend Relevance: Same shape as measuring the deepest nesting level of a
 *   JSON document or an org-chart hierarchy before recursively processing it.
 */

const { arrayToTree } = require('../_helpers/tree');

function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// ---- Tests ----
console.log(maxDepth(arrayToTree([3, 9, 20, null, null, 15, 7])), '// expected: 3');
console.log(maxDepth(arrayToTree([1, null, 2])), '// expected: 2');
console.log(maxDepth(arrayToTree([])), '// expected: 0');

// SENIOR NOTES:
// - At 1B+ elements: recursive DFS blows the call stack on a skewed tree
//   (essentially a linked list); an iterative BFS/level-count or an explicit
//   stack is required for production-grade depth calculation.
// - Distributed systems: for a sharded tree (e.g. a distributed file system
//   directory tree), depth is computed per-subtree by the owning shard and
//   combined by a coordinator, since no single node holds the whole structure.
// - Real-world analog: computing the max nesting depth of a JSON/XML document
//   to guard against stack-overflow attacks from deeply nested payloads.

module.exports = maxDepth;
