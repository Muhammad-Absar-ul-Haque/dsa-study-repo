/**
 * Problem: Clone Graph
 * Difficulty: Medium
 * Pattern: Graph BFS (or DFS) with a visited map
 * Time Complexity: O(V + E)
 * Space Complexity: O(V) for the clone map + BFS queue
 * Backend Relevance: Deep-copying a graph of objects mirrors cloning a service
 *   dependency graph or a document tree with cross-references before mutating it.
 */

class Node {
  constructor(val, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

function cloneGraph(node) {
  if (!node) return null;

  const cloned = new Map(); // original node -> cloned node
  cloned.set(node, new Node(node.val));

  const queue = [node];
  while (queue.length > 0) {
    const current = queue.shift();
    for (const neighbor of current.neighbors) {
      if (!cloned.has(neighbor)) {
        cloned.set(neighbor, new Node(neighbor.val));
        queue.push(neighbor);
      }
      cloned.get(current).neighbors.push(cloned.get(neighbor));
    }
  }

  return cloned.get(node);
}

// ---- Tests ----
// Build adjacency-list graph: 1--2, 2--3, 3--4, 4--1 (a 4-cycle)
function buildGraph(adjList) {
  const nodes = adjList.map((_, i) => new Node(i + 1));
  adjList.forEach((neighbors, i) => {
    nodes[i].neighbors = neighbors.map((n) => nodes[n - 1]);
  });
  return nodes[0];
}

// Serializes a graph (from its start node) into a sorted adjacency list for comparison.
function serialize(start) {
  const visited = new Map();
  const queue = [start];
  visited.set(start, true);
  while (queue.length > 0) {
    const current = queue.shift();
    for (const neighbor of current.neighbors) {
      if (!visited.has(neighbor)) {
        visited.set(neighbor, true);
        queue.push(neighbor);
      }
    }
  }
  return [...visited.keys()]
    .sort((a, b) => a.val - b.val)
    .map((n) => [n.val, n.neighbors.map((nb) => nb.val).sort((a, b) => a - b)]);
}

const original = buildGraph([[2, 4], [1, 3], [2, 4], [1, 3]]);
const clone = cloneGraph(original);
console.log(
  JSON.stringify(serialize(clone)),
  '// expected:',
  JSON.stringify([[1, [2, 4]], [2, [1, 3]], [3, [2, 4]], [4, [1, 3]]])
);
console.log(clone !== original, '// expected: true (deep copy, not same reference)');
console.log(cloneGraph(null), '// expected: null');

// SENIOR NOTES:
// - At 1B+ elements: holding the whole cloned graph in memory is infeasible;
//   real systems clone lazily (copy-on-write) or stream the clone to disk/object
//   storage node by node instead of materializing it all at once.
// - Distributed systems: cloning a partitioned graph requires cloning each
//   partition locally and then reconciling cross-partition edges through a
//   coordinator, similar to how distributed graph databases replicate subgraphs.
// - Real-world analog: forking a Git commit graph, duplicating a Terraform
//   resource dependency graph for a dry-run, or snapshotting a service mesh's
//   dependency graph for a rollback plan.

module.exports = cloneGraph;
