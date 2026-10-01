/**
 * Problem: Climbing Stairs
 * Difficulty: Easy
 * Pattern: Dynamic Programming (Fibonacci-style, rolling variables)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: The Fibonacci recurrence pattern underlies counting
 * problems like the number of ways to fill a rate-limited queue slot or
 * paginate through a sequence using fixed step sizes.
 */

function climbStairs(n) {
  if (n <= 2) return n;
  let prev = 1; // ways to reach step n-2
  let curr = 2; // ways to reach step n-1
  for (let i = 3; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}

// ---- Tests ----
console.log(climbStairs(2), '// expected:', 2);
console.log(climbStairs(5), '// expected:', 8);
console.log(climbStairs(1), '// expected:', 1);

// SENIOR NOTES:
// - At 1B+ elements: n this large overflows standard 64-bit integers (the
//   result grows like the Fibonacci sequence, exponentially) — would need
//   BigInt arithmetic, and even then O(n) iteration is slow; matrix
//   exponentiation gets it to O(log n).
// - Distributed systems: not naturally parallelizable due to the strict
//   sequential dependency, but matrix-power formulation allows computing
//   climbStairs(n) for many different n values independently/concurrently.
// - Real-world analog: counting the number of distinct ways to batch-process
//   a queue of n items using fixed batch sizes of 1 or 2.

module.exports = climbStairs;
