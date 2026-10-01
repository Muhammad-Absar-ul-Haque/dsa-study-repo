/**
 * Problem: Invert Binary Tree
 * Difficulty: Easy
 * Pattern: Binary Tree DFS
 * Time Complexity: O(n)
 * Space Complexity: O(h) recursion stack
 * Backend Relevance: Structural mirroring shows up in reversing hierarchical
 *   config trees or flipping a rendered UI tree for RTL (right-to-left) locales.
 */

const { arrayToTree, treeToArray } = require('../_helpers/tree');

function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}

// ---- Tests ----
console.log(
  treeToArray(invertTree(arrayToTree([4, 2, 7, 1, 3, 6, 9]))),
  '// expected: [4,7,2,9,6,3,1]'
);
console.log(treeToArray(invertTree(arrayToTree([2, 1, 3]))), '// expected: [2,3,1]');
console.log(treeToArray(invertTree(arrayToTree([]))), '// expected: []');

// SENIOR NOTES:
// - At 1B+ elements: recursive inversion risks stack overflow on skewed trees;
//   an iterative version using an explicit stack/queue swaps children without
//   growing the call stack.
// - Distributed systems: inverting a sharded tree requires each shard to
//   invert its local subtree and also swap which shard owns "left" vs "right"
//   pointers — a coordination step beyond a single-machine in-place swap.
// - Real-world analog: mirroring a UI component tree for right-to-left locale
//   rendering, or flipping a decision tree for a "what changes if we reverse
//   this policy" simulation.

module.exports = invertTree;
