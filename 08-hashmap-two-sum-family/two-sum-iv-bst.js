/**
 * Problem: Two Sum IV - Input is a BST
 * Difficulty: Easy
 * Pattern: Tree traversal + hashmap complement lookup
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Backend Relevance: Traversing a hierarchical structure while tracking seen
 *   values mirrors walking an org-chart/category tree to find two nodes whose
 *   attributes satisfy a constraint (e.g. budget pairing across departments).
 */

const { arrayToTree } = require('../_helpers/tree');

function findTarget(root, k) {
  const seen = new Set();

  function dfs(node) {
    if (!node) return false;
    if (seen.has(k - node.val)) return true;
    seen.add(node.val);
    return dfs(node.left) || dfs(node.right);
  }

  return dfs(root);
}

// ---- Tests ----
const tree1 = arrayToTree([5, 3, 6, 2, 4, null, 7]);
console.log(findTarget(tree1, 9), '// expected: true');
console.log(findTarget(tree1, 28), '// expected: false');

const tree2 = arrayToTree([5, 3, 6, 2, 4, null, 7]);
console.log(findTarget(tree2, 5), '// expected: true (2 + 3)');

// SENIOR NOTES:
// - At 1B+ elements: recursive DFS risks stack overflow on deep/unbalanced trees;
//   an iterative stack-based traversal would be required, and the Set of seen
//   values would need to spill to disk for huge trees.
// - Distributed systems: a tree sharded across nodes (e.g. a distributed B-tree
//   index) would need each shard to broadcast its local value set or query a
//   shared complement index rather than relying on one in-memory Set.
// - Real-world analog: searching an org hierarchy or category tree for two nodes
//   whose combined metric (budget, inventory) hits a target value.

module.exports = findTarget;
