/**
 * Binary tree node + conversion helpers, shared across tree/trie problems.
 * Level-order array format uses `null` for missing children, matching
 * the LeetCode convention, e.g. [3,9,20,null,null,15,7].
 */

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Build a binary tree from a level-order array (LeetCode style)
function arrayToTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null) return null;

  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;

  while (i < arr.length && queue.length > 0) {
    const node = queue.shift();

    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = new TreeNode(leftVal);
        queue.push(node.left);
      }
    }
    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = new TreeNode(rightVal);
        queue.push(node.right);
      }
    }
  }

  return root;
}

// Flatten a binary tree back into a level-order array (trims trailing nulls)
function treeToArray(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    if (node === null) {
      result.push(null);
      continue;
    }
    result.push(node.val);
    queue.push(node.left);
    queue.push(node.right);
  }

  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}

module.exports = { TreeNode, arrayToTree, treeToArray };
