/**
 * Problem: Binary Tree Level Order Traversal
 * Difficulty: Medium
 * Pattern: Binary Tree BFS
 * Time Complexity: O(n)
 * Space Complexity: O(n) for the queue and output
 * Backend Relevance: BFS-by-level is exactly how you'd process an org chart or
 *   dependency graph tier-by-tier (e.g. running all jobs whose dependencies at
 *   depth d have already completed before moving to depth d+1).
 */

const { arrayToTree } = require('../_helpers/tree');

function levelOrder(root) {
  if (!root) return [];

  const result = [];
  let queue = [root];

  while (queue.length > 0) {
    const level = [];
    const next = [];

    for (const node of queue) {
      level.push(node.val);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }

    result.push(level);
    queue = next;
  }

  return result;
}

// ---- Tests ----
console.log(
  levelOrder(arrayToTree([3, 9, 20, null, null, 15, 7])),
  '// expected: [[3],[9,20],[15,7]]'
);
console.log(levelOrder(arrayToTree([1])), '// expected: [[1]]');
console.log(levelOrder(arrayToTree([])), '// expected: []');

// SENIOR NOTES:
// - At 1B+ elements: the queue can hold an entire level in memory at once; for
//   a very wide tree that's still O(width), which can dwarf O(depth) memory
//   used by DFS — width vs. depth is the key tradeoff to watch.
// - Distributed systems: this is the blueprint for barrier-synchronized graph
//   processing (e.g. Pregel/BSP-style systems) where all nodes at superstep d
//   finish before any node advances to superstep d+1.
// - Real-world analog: topological/tiered execution of a build or CI dependency
//   graph, or broadcasting a message down an org hierarchy level by level.

module.exports = levelOrder;
