/**
 * Problem: Accounts Merge
 * Difficulty: Medium
 * Pattern: Union-Find (Disjoint Set Union over emails, grouped by shared account)
 * Time Complexity: O(N * K * alpha(N*K) + N * K log(N * K)) where N = number of
 *   accounts, K = average emails per account (the log factor is sorting emails
 *   per merged group)
 * Space Complexity: O(N * K)
 * Backend Relevance: This is textbook entity resolution / record linkage —
 *   merging duplicate customer or user records that share an identifying key.
 */

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
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
  }
}

function accountsMerge(accounts) {
  const uf = new UnionFind(accounts.length);
  const emailToAccount = new Map(); // email -> index of the first account that owns it

  accounts.forEach((account, i) => {
    for (let j = 1; j < account.length; j++) {
      const email = account[j];
      if (emailToAccount.has(email)) {
        uf.union(i, emailToAccount.get(email));
      } else {
        emailToAccount.set(email, i);
      }
    }
  });

  const rootToEmails = new Map(); // root account index -> Set of emails
  for (const [email, accountIndex] of emailToAccount) {
    const root = uf.find(accountIndex);
    if (!rootToEmails.has(root)) rootToEmails.set(root, new Set());
    rootToEmails.get(root).add(email);
  }

  const result = [];
  for (const [root, emails] of rootToEmails) {
    const name = accounts[root][0];
    result.push([name, ...[...emails].sort()]);
  }
  return result;
}

// ---- Tests ----
const accounts1 = [
  ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
  ['John', 'johnsmith@mail.com', 'john00@mail.com'],
  ['Mary', 'mary@mail.com'],
  ['John', 'johnnybravo@mail.com'],
];
const merged1 = accountsMerge(accounts1)
  .map((acc) => [acc[0], ...acc.slice(1).sort()])
  .sort((a, b) => (a.join(',') < b.join(',') ? -1 : 1));
const expected1 = [
  ['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],
  ['John', 'johnnybravo@mail.com'],
  ['Mary', 'mary@mail.com'],
].sort((a, b) => (a.join(',') < b.join(',') ? -1 : 1));
console.log(JSON.stringify(merged1), '// expected:', JSON.stringify(expected1));

console.log(
  JSON.stringify(accountsMerge([['A', 'a@mail.com']])),
  '// expected:',
  JSON.stringify([['A', 'a@mail.com']])
);

// SENIOR NOTES:
// - At 1B+ elements: building an in-memory email -> account index for a billion
//   accounts is infeasible; real entity-resolution pipelines use blocking
//   (bucket by a cheap key like domain) plus a distributed DSU or a MapReduce
//   connected-components pass.
// - Distributed systems: distributed record-linkage systems (e.g. Dedupe.io,
//   Spark's GraphFrames connectedComponents) shard by blocking key, compute
//   local unions per shard, then merge cross-shard unions in a reduce step.
// - Real-world analog: CRM duplicate-contact merging, deduplicating user
//   accounts across signup methods (email/phone/SSO), and fraud rings linked by
//   shared payment instruments.

module.exports = accountsMerge;
