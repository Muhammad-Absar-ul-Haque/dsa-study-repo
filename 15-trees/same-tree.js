/**
 * Problem: Same Tree
 * Difficulty: Easy
 * Pattern: Binary Tree DFS
 * Time Complexity: O(n)
 * Space Complexity: O(h) recursion stack
 * Backend Relevance: Structural equality checks like this underpin diffing two
 *   versions of a nested config/schema to detect drift between environments.
 */

const { arrayToTree } = require('../_helpers/tree');

function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// ---- Tests ----
console.log(isSameTree(arrayToTree([1, 2, 3]), arrayToTree([1, 2, 3])), '// expected: true');
console.log(isSameTree(arrayToTree([1, 2]), arrayToTree([1, null, 2])), '// expected: false');
console.log(isSameTree(arrayToTree([1, 2, 1]), arrayToTree([1, 1, 2])), '// expected: false');

// SENIOR NOTES:
// - At 1B+ elements: deep recursion on two large skewed trees doubles the
//   stack-overflow risk; an iterative paired-stack traversal comparing nodes
//   in lockstep avoids that and can short-circuit on the first mismatch.
// - Distributed systems: comparing two sharded trees for equality requires a
//   Merkle-tree-style hash comparison per subtree so shards can prove equality
//   without shipping the full structure across the network.
// - Real-world analog: diffing two versions of a nested JSON config or DOM
//   tree to detect drift (e.g. config-as-code validation between staging and
//   production).

module.exports = isSameTree;
