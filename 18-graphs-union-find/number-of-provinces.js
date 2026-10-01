/**
 * Problem: Number of Provinces
 * Difficulty: Medium
 * Pattern: Union-Find (Disjoint Set Union over an adjacency matrix)
 * Time Complexity: O(n^2 * alpha(n)) — n^2 to scan the matrix, near-O(1) per union
 * Space Complexity: O(n)
 * Backend Relevance: Same as counting connected components, but driven by a
 *   dense adjacency matrix — the shape of a "who-trusts-whom" or "who-can-reach-
 *   whom" matrix in an access-control or peer-network system.
 */

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.count = n;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(a, b) {
    const rootA = this.find(a);
    const rootB = this.find(b);
    if (rootA === rootB) return;

    if (this.rank[rootA] < this.rank[rootB]) {
      this.parent[rootA] = rootB;
    } else if (this.rank[rootA] > this.rank[rootB]) {
      this.parent[rootB] = rootA;
    } else {
      this.parent[rootB] = rootA;
      this.rank[rootA]++;
    }
    this.count--;
  }
}

function findCircleNum(isConnected) {
  const n = isConnected.length;
  const uf = new UnionFind(n);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isConnected[i][j] === 1) uf.union(i, j);
    }
  }

  return uf.count;
}

// ---- Tests ----
console.log(
  findCircleNum([
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ]),
  '// expected: 2'
);
console.log(
  findCircleNum([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]),
  '// expected: 3'
);
console.log(
  findCircleNum([
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ]),
  '// expected: 1'
);

// SENIOR NOTES:
// - At 1B+ elements: an n x n adjacency matrix is O(n^2) memory, which is
//   already infeasible past ~100K nodes; real systems represent the same
//   relation as a sparse edge list/adjacency list well before reaching billions.
// - Distributed systems: computing connected components over a distributed
//   sparse relation typically uses iterative label propagation (each node
//   adopts the min neighbor ID each round) until convergence, since no single
//   machine holds the full matrix.
// - Real-world analog: counting independent friend-groups in a social graph,
//   clustering mutually-trusting peers in a P2P network, or grouping servers
//   into independent failure domains from a reachability matrix.

module.exports = findCircleNum;
