/**
 * Problem: Symmetric Tree
 * Difficulty: Easy
 * Pattern: Binary Tree DFS (mirror comparison)
 * Time Complexity: O(n)
 * Space Complexity: O(h) recursion stack
 * Backend Relevance: Mirror-symmetry checks generalize to validating that two
 *   halves of a replicated/mirrored data structure (e.g. active-active DB
 *   schemas) stay structurally consistent.
 */

const { arrayToTree } = require('../_helpers/tree');

function isSymmetric(root) {
  if (!root) return true;
  return isMirror(root.left, root.right);
}

function isMirror(a, b) {
  if (!a && !b) return true;
  if (!a || !b || a.val !== b.val) return false;
  return isMirror(a.left, b.right) && isMirror(a.right, b.left);
}

// ---- Tests ----
console.log(isSymmetric(arrayToTree([1, 2, 2, 3, 4, 4, 3])), '// expected: true');
console.log(isSymmetric(arrayToTree([1, 2, 2, null, 3, null, 3])), '// expected: false');
console.log(isSymmetric(arrayToTree([1])), '// expected: true');

// SENIOR NOTES:
// - At 1B+ elements: recursive mirror comparison on a huge tree risks stack
//   overflow; an iterative version using a queue of node pairs avoids growing
//   the call stack and can bail out immediately on the first asymmetry.
// - Distributed systems: verifying symmetry across a sharded/replicated tree
//   would require exchanging subtree hashes (Merkle proofs) between the nodes
//   holding mirrored halves rather than direct pointer comparisons.
// - Real-world analog: validating that a mirrored UI layout (LTR vs RTL) or a
//   symmetric network topology (e.g. redundant routing paths) stays balanced.

module.exports = isSymmetric;
