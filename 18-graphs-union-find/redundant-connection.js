/**
 * Problem: Redundant Connection
 * Difficulty: Medium
 * Pattern: Union-Find (Disjoint Set Union, with path compression + union by rank)
 * Time Complexity: O(E * alpha(V)) — effectively O(E)
 * Space Complexity: O(V)
 * Backend Relevance: The extra edge that first connects two already-connected
 *   nodes is exactly the "redundant link" you'd flag when validating that a
 *   proposed network topology adds no cycles.
 */

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n + 1 }, (_, i) => i); // 1-indexed
    this.rank = new Array(n + 1).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  // Returns false if a and b were already in the same set (i.e. this edge is redundant).
  union(a, b) {
    const rootA = this.find(a);
    const rootB = this.find(b);
    if (rootA === rootB) return false;

    if (this.rank[rootA] < this.rank[rootB]) {
      this.parent[rootA] = rootB;
    } else if (this.rank[rootA] > this.rank[rootB]) {
      this.parent[rootB] = rootA;
    } else {
      this.parent[rootB] = rootA;
      this.rank[rootA]++;
    }
    return true;
  }
}

function findRedundantConnection(edges) {
  const uf = new UnionFind(edges.length);
  for (const [a, b] of edges) {
    if (!uf.union(a, b)) return [a, b]; // first edge that creates a cycle
  }
  return [];
}

// ---- Tests ----
console.log(findRedundantConnection([[1, 2], [1, 3], [2, 3]]), '// expected: [ 2, 3 ]');
console.log(
  findRedundantConnection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]),
  '// expected: [ 1, 4 ]'
);
console.log(findRedundantConnection([[1, 2], [2, 3]]), '// expected: [] (no cycle)');

// SENIOR NOTES:
// - At 1B+ elements: streaming edges through DSU with union-by-rank + path
//   compression is one of the few billion-edge-scale algorithms that stays
//   near-linear; the bottleneck becomes I/O (reading the edge list), not compute.
// - Distributed systems: detecting the "first cycle-causing edge" in a
//   distributed edge stream generally requires a total order on edge arrival
//   (or a coordinator) since DSU union order determines which edge is flagged;
//   naive parallel unions can disagree on which edge is "redundant".
// - Real-world analog: detecting a redundant/looping link when validating a
//   proposed network topology, or catching a duplicate "already merged" record
//   when building a record-linkage/entity-resolution graph incrementally.

module.exports = findRedundantConnection;
