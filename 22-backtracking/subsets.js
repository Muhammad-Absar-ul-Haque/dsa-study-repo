/**
 * Problem: Subsets
 * Difficulty: Medium
 * Pattern: Backtracking (power set enumeration)
 * Time Complexity: O(n * 2^n) — 2^n subsets, O(n) to copy each
 * Space Complexity: O(n * 2^n) for the output, O(n) recursion depth
 * Backend Relevance: Enumerating all subsets models generating every
 * combination of feature flags, permission grants, or config toggles to
 * exhaustively test system behavior.
 */

function subsets(nums) {
  const result = [];
  const path = [];

  function backtrack(start) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }

  backtrack(0);
  return result;
}

// ---- Tests ----
console.log(subsets([1, 2, 3]).length, '// expected:', 8);
console.log(
  JSON.stringify(subsets([1, 2, 3])),
  '// expected: all 8 subsets including [] and [1,2,3]'
);
console.log(subsets([]).length, '// expected:', 1);

// SENIOR NOTES:
// - At 1B+ elements: 2^n subsets is exponential — even n=30 already yields
//   over a billion subsets, so this approach only works for small n; larger
//   n requires sampling, bitmask streaming, or constraint-based pruning
//   instead of full enumeration.
// - Distributed systems: subset generation is embarrassingly parallel by
//   bitmask range (e.g. split [0, 2^n) into chunks across workers, each
//   worker materializes subsets for its bitmask range independently).
// - Real-world analog: exhaustively testing every combination of feature
//   flags before a release, or enumerating candidate permission sets for
//   an access-control policy audit.

module.exports = subsets;
