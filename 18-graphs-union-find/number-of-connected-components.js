/**
 * Problem: Number of Connected Components in an Undirected Graph
 * Difficulty: Medium
 * Pattern: Union-Find (Disjoint Set Union, with path compression + union by rank)
 * Time Complexity: O(V + E * alpha(V)) — alpha is the inverse Ackermann function, effectively O(1)
 * Space Complexity: O(V)
 * Backend Relevance: Counting connected components is the same operation used
 *   to count independent clusters of users/servers in a social graph or network
 *   topology without a full traversal per query.
 */

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.count = n; // number of distinct components
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // path compression
    }
    return this.parent[x];
  }

  union(a, b) {
    const rootA = this.find(a);
    const rootB = this.find(b);
    if (rootA === rootB) return false; // already connected

    if (this.rank[rootA] < this.rank[rootB]) {
      this.parent[rootA] = rootB;
    } else if (this.rank[rootA] > this.rank[rootB]) {
      this.parent[rootB] = rootA;
    } else {
      this.parent[rootB] = rootA;
      this.rank[rootA]++;
    }
    this.count--;
    return true;
  }
}

function countComponents(n, edges) {
  const uf = new UnionFind(n);
  for (const [a, b] of edges) uf.union(a, b);
  return uf.count;
}

// ---- Tests ----
console.log(countComponents(5, [[0, 1], [1, 2], [3, 4]]), '// expected: 2');
console.log(countComponents(5, [[0, 1], [1, 2], [2, 3], [3, 4]]), '// expected: 1');
console.log(countComponents(5, []), '// expected: 5');
console.log(countComponents(1, []), '// expected: 1');

// SENIOR NOTES:
// - At 1B+ elements: an array-backed union-find for a billion nodes needs ~4-8
//   bytes/node, which is still gigabytes; production systems use a disk-backed
//   or distributed DSU with batched unions to amortize I/O.
// - Distributed systems: distributed connected-components (e.g. Spark GraphX's
//   Pregel-based CC algorithm) propagates the minimum component ID across edges
//   in rounds until convergence, since a single machine can't hold a global DSU.
// - Real-world analog: detecting isolated clusters in a social network,
//   grouping duplicate customer records (record linkage), and identifying
//   independent subnets in a network topology map.

module.exports = countComponents;
