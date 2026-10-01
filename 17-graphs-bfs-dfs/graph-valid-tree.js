/**
 * Problem: Graph Valid Tree
 * Difficulty: Medium
 * Pattern: Graph BFS/DFS (a valid tree = connected AND exactly n-1 edges, i.e. no cycle)
 * Time Complexity: O(V + E)
 * Space Complexity: O(V + E)
 * Backend Relevance: Validating "exactly one path between any two nodes, no
 *   cycles" is the same check used to confirm a configuration/ownership
 *   hierarchy is a strict tree (e.g. org chart, folder structure) with no cycles.
 */

function validTree(n, edges) {
  if (edges.length !== n - 1) return false; // a tree has exactly n-1 edges
  if (n === 1) return true;

  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    adj[a].push(b);
    adj[b].push(a);
  }

  const visited = new Set([0]);
  const queue = [0];
  while (queue.length > 0) {
    const node = queue.shift();
    for (const next of adj[node]) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }

  return visited.size === n; // reached every node -> connected (and edge count already rules out cycles)
}

// ---- Tests ----
console.log(validTree(5, [[0, 1], [0, 2], [0, 3], [1, 4]]), '// expected: true');
console.log(validTree(5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]), '// expected: false (cycle)');
console.log(validTree(4, [[0, 1], [2, 3]]), '// expected: false (disconnected)');
console.log(validTree(1, []), '// expected: true (single node, no edges)');

// SENIOR NOTES:
// - At 1B+ elements: counting edges and BFS-reaching every node in a
//   billion-node graph requires an out-of-core or distributed adjacency
//   representation; the n-1 edge-count check alone is O(1) and a cheap early
//   reject before paying for full connectivity traversal.
// - Distributed systems: distributed connectivity checks use union-find with
//   path compression sharded across machines, merging partition results
//   incrementally, or a Pregel-style BFS where each superstep expands the
//   frontier by one hop across the cluster.
// - Real-world analog: validating an org chart or filesystem has no cycles and
//   is fully connected, or verifying a service dependency graph forms a strict
//   hierarchy before allowing a deployment.

module.exports = validTree;
