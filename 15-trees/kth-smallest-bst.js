/**
 * Problem: Kth Smallest Element in a BST
 * Difficulty: Medium
 * Pattern: Binary Search Tree DFS (in-order traversal)
 * Time Complexity: O(h + k), h = tree height (using an iterative stack, stops early)
 * Space Complexity: O(h)
 * Backend Relevance: In-order traversal of a BST yields sorted order for free —
 *   this is how a database walks a B-tree index to serve an ordered range/rank
 *   query like "give me the 10th cheapest item."
 */

const { arrayToTree } = require('../_helpers/tree');

function kthSmallest(root, k) {
  const stack = [];
  let node = root;

  while (node || stack.length > 0) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    k--;
    if (k === 0) return node.val;
    node = node.right;
  }

  return -1; // k out of range
}

// ---- Tests ----
console.log(kthSmallest(arrayToTree([3, 1, 4, null, 2]), 1), '// expected: 1');
console.log(kthSmallest(arrayToTree([5, 3, 6, 2, 4, null, null, 1]), 3), '// expected: 3');
console.log(kthSmallest(arrayToTree([2, 1, 3]), 2), '// expected: 2');

// SENIOR NOTES:
// - At 1B+ elements: this iterative in-order walk stops as soon as it finds
//   the kth node, so it's O(h + k), not O(n) — critical for small k on a huge
//   tree; a naive full traversal-then-index would waste massive time/memory.
// - Distributed systems: rank queries on a sharded BST/B-tree index require
//   each shard to report subtree sizes so a coordinator can route directly to
//   the shard holding the kth element instead of merging full sorted output.
// - Real-world analog: database "OFFSET/LIMIT"-style rank queries served
//   efficiently via B-tree index order statistics rather than a full sort.

module.exports = kthSmallest;
