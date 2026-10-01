/**
 * Problem: Lowest Common Ancestor of a BST
 * Difficulty: Medium
 * Pattern: Binary Search Tree DFS (use ordering to prune)
 * Time Complexity: O(h), h = tree height
 * Space Complexity: O(1) iterative (or O(h) if implemented recursively)
 * Backend Relevance: Finding the LCA is analogous to finding the nearest common
 *   ancestor commit in a version-control history graph or the shared parent
 *   directory of two file paths.
 */

const { arrayToTree } = require('../_helpers/tree');

function lowestCommonAncestor(root, p, q) {
  let node = root;

  while (node) {
    if (p.val < node.val && q.val < node.val) {
      node = node.left;
    } else if (p.val > node.val && q.val > node.val) {
      node = node.right;
    } else {
      return node; // split point (or one of p/q equals node) — this is the LCA
    }
  }

  return null;
}

// ---- Tests ----
const bst = arrayToTree([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]);
console.log(lowestCommonAncestor(bst, bst.left, bst.right).val, '// expected: 6');
console.log(lowestCommonAncestor(bst, bst.left, bst.left.right).val, '// expected: 2');
console.log(
  lowestCommonAncestor(bst, bst.left.right.left, bst.left.right.right).val,
  '// expected: 4'
);

// SENIOR NOTES:
// - At 1B+ elements: the BST-ordering trick keeps this O(h) instead of O(n),
//   but a badly skewed (unbalanced) tree degrades h toward n — production
//   BSTs need self-balancing (AVL/red-black) to keep h ~ log n.
// - Distributed systems: for a sharded hierarchy, LCA queries require either
//   replicating the ancestor path chain or routing through a metadata service
//   that tracks parent pointers, since no single shard sees the full path.
// - Real-world analog: finding the common ancestor commit between two git
//   branches, or the shared parent folder of two file paths in a file system.

module.exports = lowestCommonAncestor;
