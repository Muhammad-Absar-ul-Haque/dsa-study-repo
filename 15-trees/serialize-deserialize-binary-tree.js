/**
 * Problem: Serialize and Deserialize Binary Tree
 * Difficulty: Hard
 * Pattern: Binary Tree DFS (pre-order with null markers)
 * Time Complexity: O(n) for both serialize and deserialize
 * Space Complexity: O(n)
 * Backend Relevance: This is exactly how you'd persist/transmit a hierarchical
 *   structure (e.g. an AST, a nested category tree) over the wire or to disk
 *   and reconstruct it byte-for-byte on the other end.
 */

const { TreeNode, treeToArray } = require('../_helpers/tree');

const NULL_MARKER = '#';

function serialize(root) {
  const parts = [];

  function dfs(node) {
    if (!node) {
      parts.push(NULL_MARKER);
      return;
    }
    parts.push(String(node.val));
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);
  return parts.join(',');
}

function deserialize(data) {
  const values = data.split(',');
  let i = 0;

  function dfs() {
    const val = values[i++];
    if (val === NULL_MARKER) return null;
    const node = new TreeNode(Number(val));
    node.left = dfs();
    node.right = dfs();
    return node;
  }

  return dfs();
}

// ---- Tests ----
const tree1 = new TreeNode(1, new TreeNode(2), new TreeNode(3, new TreeNode(4), new TreeNode(5)));
console.log(
  treeToArray(deserialize(serialize(tree1))),
  '// expected: [1,2,3,null,null,4,5]'
);
console.log(treeToArray(deserialize(serialize(null))), '// expected: []');
console.log(treeToArray(deserialize(serialize(new TreeNode(1)))), '// expected: [1]');

// SENIOR NOTES:
// - At 1B+ elements: recursive pre-order serialize/deserialize overflows the
//   stack on a skewed tree; an iterative version using an explicit stack (and
//   streaming output instead of building one giant string) is required.
// - Distributed systems: serializing a tree that spans multiple shards
//   requires stitching together per-shard serialized fragments plus pointers
//   (shard id + node id) at the boundaries instead of one contiguous string.
// - Real-world analog: persisting an AST to disk for a compiler cache, or
//   sending a nested category/menu tree over an API as JSON and rebuilding
//   the exact same structure on the client.

module.exports = { serialize, deserialize };
