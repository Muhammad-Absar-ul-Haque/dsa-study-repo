/**
 * Problem: Cheapest Flights Within K Stops
 * Difficulty: Medium
 * Pattern: Dijkstra's Algorithm (state-space search over (cost, node, stopsUsed),
 *   min-heap priority queue) — a stop-constrained variant of shortest path
 * Time Complexity: O(E * K * log(E * K)) worst case — each edge can be relaxed
 *   again for every distinct stop count up to k
 * Space Complexity: O(V + E)
 * Backend Relevance: Cheapest path under a hop-count budget mirrors routing
 *   traffic through at most N intermediate proxies/hops to control latency or cost.
 */

const { MinHeap } = require('../_helpers/heap');

function findCheapestPrice(n, flights, src, dst, k) {
  const adj = new Map();
  for (let i = 0; i < n; i++) adj.set(i, []);
  for (const [u, v, price] of flights) adj.get(u).push([v, price]);

  // State: [cost, node, stopsUsed]. Unlike plain Dijkstra we do NOT globally mark
  // a node "done" on first pop, because a costlier path with fewer stops left may
  // still unlock a cheaper final route than an early cheap-but-stop-exhausted one.
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  heap.push([0, src, 0]);

  // Track the best (fewest stops) at which we've reached a node with a given
  // cost bound, to prune clearly-dominated states.
  const bestStopsAtCost = new Map(); // node -> minimum stopsUsed seen so far

  while (!heap.isEmpty()) {
    const [cost, node, stops] = heap.pop();
    if (node === dst) return cost;
    if (stops > k) continue; // exceeded allowed intermediate stops

    const best = bestStopsAtCost.get(node);
    if (best !== undefined && best <= stops) continue; // a cheaper-or-equal path already used fewer/equal stops
    bestStopsAtCost.set(node, stops);

    for (const [next, price] of adj.get(node)) {
      heap.push([cost + price, next, stops + 1]);
    }
  }

  return -1;
}

// ---- Tests ----
console.log(
  findCheapestPrice(
    4,
    [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]],
    0,
    3,
    1
  ),
  '// expected: 700'
);
console.log(
  findCheapestPrice(
    3,
    [[0, 1, 100], [1, 2, 100], [0, 2, 500]],
    0,
    2,
    1
  ),
  '// expected: 200'
);
console.log(
  findCheapestPrice(
    3,
    [[0, 1, 100], [1, 2, 100], [0, 2, 500]],
    0,
    2,
    0
  ),
  '// expected: 500 (0 stops means only the direct edge is allowed)'
);

// SENIOR NOTES:
// - At 1B+ elements: exploding the state space to (node, stopsUsed) pairs
//   multiplies memory by k; at billion-edge scale this is only tractable with
//   Bellman-Ford-style bounded relaxation (k rounds) streamed from disk rather
//   than holding a heap of all states in memory.
// - Distributed systems: bounded-hop cheapest path is analogous to
//   distance-vector routing with a max-hop-count TTL (like BGP's AS-path length
//   limits), where each round only propagates one additional hop's worth of
//   updates across the cluster.
// - Real-world analog: cheapest flight/ride itineraries with a layover cap, and
//   routing traffic through at most N proxy hops to bound latency while
//   minimizing cost.

module.exports = findCheapestPrice;
