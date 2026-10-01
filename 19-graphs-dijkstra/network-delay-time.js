/**
 * Problem: Network Delay Time
 * Difficulty: Medium
 * Pattern: Dijkstra's Algorithm (single-source shortest path, min-heap priority queue)
 * Time Complexity: O(E log V) using a binary min-heap
 * Space Complexity: O(V + E)
 * Backend Relevance: Literally "how long until a signal broadcast from node k
 *   reaches every other node" — the same computation behind network latency
 *   propagation and cache-invalidation broadcast timing.
 */

const { MinHeap } = require('../_helpers/heap');

function networkDelayTime(times, n, k) {
  const adj = new Map();
  for (let i = 1; i <= n; i++) adj.set(i, []);
  for (const [u, v, w] of times) adj.get(u).push([v, w]);

  const dist = new Map();
  const heap = new MinHeap((a, b) => a[0] - b[0]); // [distance, node]
  heap.push([0, k]);

  while (!heap.isEmpty()) {
    const [d, node] = heap.pop();
    if (dist.has(node)) continue; // already finalized with a shorter/equal distance
    dist.set(node, d);

    for (const [next, weight] of adj.get(node)) {
      if (!dist.has(next)) {
        heap.push([d + weight, next]);
      }
    }
  }

  if (dist.size !== n) return -1; // some node unreachable
  return Math.max(...dist.values());
}

// ---- Tests ----
console.log(networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2), '// expected: 2');
console.log(networkDelayTime([[1, 2, 1]], 2, 1), '// expected: 1');
console.log(networkDelayTime([[1, 2, 1]], 2, 2), '// expected: -1 (node 1 unreachable from 2)');

// SENIOR NOTES:
// - At 1B+ elements: a binary-heap Dijkstra with billions of edges won't fit an
//   adjacency list in RAM; real routers use precomputed forwarding tables
//   (link-state databases) refreshed periodically rather than recomputing
//   shortest paths per packet.
// - Distributed systems: OSPF/IS-IS routing protocols run a distributed variant
//   where every router independently computes shortest paths from a shared
//   link-state database, converging via flooding rather than one central
//   Dijkstra run.
// - Real-world analog: network routing table computation (OSPF shortest-path
//   tree), and broadcast/gossip-protocol propagation-time estimation across a
//   cluster.

module.exports = networkDelayTime;
