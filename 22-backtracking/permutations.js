/**
 * Problem: Permutations
 * Difficulty: Medium
 * Pattern: Backtracking (full permutation enumeration)
 * Time Complexity: O(n * n!) — n! permutations, O(n) to build each
 * Space Complexity: O(n * n!) for output, O(n) recursion depth
 * Backend Relevance: Enumerating orderings models exhaustively testing task
 * execution orders (e.g. dependency scheduling edge cases) or generating
 * all route orderings for small traveling-salesman-style optimization.
 */

function permute(nums) {
  const result = [];

  function backtrack(path, remaining) {
    if (remaining.length === 0) {
      result.push(path);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      const next = remaining.slice(0, i).concat(remaining.slice(i + 1));
      backtrack([...path, remaining[i]], next);
    }
  }

  backtrack([], nums);
  return result;
}

// ---- Tests ----
console.log(permute([1, 2, 3]).length, '// expected:', 6);
console.log(JSON.stringify(permute([1, 2, 3])), '// expected: all 6 orderings of [1,2,3]');
console.log(permute([0]).length, '// expected:', 1);

// SENIOR NOTES:
// - At 1B+ elements: n! explodes far faster than 2^n (11! already exceeds
//   1B) — full permutation enumeration is infeasible beyond tiny n; real
//   systems need heuristic search (simulated annealing, genetic algorithms)
//   instead of brute force.
// - Distributed systems: permutation generation can be parallelized by
//   fixing the first element per worker (n workers each generate (n-1)!
//   permutations of the remainder independently).
// - Real-world analog: brute-forcing small job-scheduling orderings to find
//   an optimal execution sequence, or generating test-case orderings for
//   flaky-test isolation.

module.exports = permute;
