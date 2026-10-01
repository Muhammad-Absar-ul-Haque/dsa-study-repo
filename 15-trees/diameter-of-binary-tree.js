/**
 * Problem: Diameter of Binary Tree
 * Difficulty: Easy
 * Pattern: Binary Tree DFS (post-order, track height + update global max)
 * Time Complexity: O(n)
 * Space Complexity: O(h) recursion stack
 * Backend Relevance: Computing the longest path in a tree mirrors finding the
 *   longest dependency chain in a build graph or the critical path in a task
 *   scheduling DAG.
 */

const { arrayToTree } = require('../_helpers/tree');

function diameterOfBinaryTree(root) {
  let diameter = 0;

  function height(node) {
    if (!node) return 0;
    const left = height(node.left);
    const right = height(node.right);
    diameter = Math.max(diameter, left + right); // path through this node
    return 1 + Math.max(left, right);
  }

  height(root);
  return diameter;
}

// ---- Tests ----
console.log(diameterOfBinaryTree(arrayToTree([1, 2, 3, 4, 5])), '// expected: 3');
console.log(diameterOfBinaryTree(arrayToTree([1, 2])), '// expected: 1');
console.log(diameterOfBinaryTree(arrayToTree([1])), '// expected: 0');

// SENIOR NOTES:
// - At 1B+ elements: the single-pass post-order approach avoids the O(n^2)
//   trap of recomputing height at every node; still, a skewed tree can blow
//   the recursion stack, so production code needs an iterative post-order walk.
// - Distributed systems: for a sharded tree, computing diameter requires each
//   shard to report (height, local diameter) for its subtree so a coordinator
//   can combine cross-shard paths — a classic map-reduce tree-aggregation.
// - Real-world analog: finding the critical path (longest chain of dependent
//   tasks) in a CI/CD build graph or project schedule (PERT/CPM analysis).

module.exports = diameterOfBinaryTree;
