/**
 * Problem: Random Pick with Weight
 * Difficulty: Medium
 * Pattern: Randomized / Prefix Sums + Binary Search
 * Time Complexity: O(n) construction, O(log n) per pickIndex()
 * Space Complexity: O(n)
 * Backend Relevance: Weighted random selection powers traffic-splitting for
 * A/B tests, weighted load balancing across backend servers, and lottery-
 * style ranking systems.
 */

class Solution {
  constructor(w) {
    this.prefix = [];
    let sum = 0;
    for (const weight of w) {
      sum += weight;
      this.prefix.push(sum);
    }
    this.total = sum;
  }

  pickIndex() {
    const target = Math.random() * this.total;
    let lo = 0;
    let hi = this.prefix.length - 1;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (this.prefix[mid] <= target) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
}

// ---- Tests ----
const sol = new Solution([1, 999]);
const counts = [0, 0];
const trials = 10000;
for (let i = 0; i < trials; i++) counts[sol.pickIndex()]++;
console.log(counts, '// expected: index 1 picked far more often than index 0 (weight 999 vs 1)');
console.log(counts[1] > counts[0], '// expected:', true);

const sol2 = new Solution([1, 1, 1]);
const counts2 = [0, 0, 0];
for (let i = 0; i < 9000; i++) counts2[sol2.pickIndex()]++;
console.log(counts2, '// expected: roughly equal (~3000 each) for equal weights');

// SENIOR NOTES:
// - At 1B+ elements: O(n) prefix-sum array construction and memory become
//   costly; weights that change dynamically require a Fenwick/segment tree
//   for O(log n) update + O(log n) weighted sampling instead of a flat array.
// - Distributed systems: weighted random pick generalizes to consistent
//   hashing with virtual nodes weighted by server capacity, or to weighted
//   round-robin load balancers (e.g. NGINX upstream weights).
// - Real-world analog: traffic splitting for canary deploys/A-B experiments,
//   or picking a backend replica weighted by available capacity.

module.exports = Solution;
