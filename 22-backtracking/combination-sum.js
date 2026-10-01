/**
 * Problem: Combination Sum
 * Difficulty: Medium
 * Pattern: Backtracking (with reuse of candidates, pruning on remainder)
 * Time Complexity: O(n^(t/m + 1)) roughly, where t = target, m = min candidate
 * Space Complexity: O(t/m) recursion depth, O(number of combinations) output
 * Backend Relevance: Same shape as coin/denomination combination search —
 * e.g. finding all ways to fulfill an inventory quota from available SKU
 * bundle sizes, or resource allocation combinations that hit a target.
 */

function combinationSum(candidates, target) {
  const result = [];
  const path = [];

  function backtrack(start, remain) {
    if (remain === 0) {
      result.push([...path]);
      return;
    }
    if (remain < 0) return;
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      backtrack(i, remain - candidates[i]); // reuse same index (unlimited reuse)
      path.pop();
    }
  }

  backtrack(0, target);
  return result;
}

// ---- Tests ----
console.log(
  JSON.stringify(combinationSum([2, 3, 6, 7], 7)),
  '// expected:',
  JSON.stringify([[2, 2, 3], [7]])
);
console.log(
  JSON.stringify(combinationSum([2, 3, 5], 8)),
  '// expected:',
  JSON.stringify([[2, 2, 2, 2], [2, 3, 3], [3, 5]])
);
console.log(combinationSum([2], 1).length, '// expected:', 0);

// SENIOR NOTES:
// - At 1B+ elements: candidate combination counts grow combinatorially with
//   target size — for large targets this needs DP (counting/reconstructing
//   ways) rather than full enumeration, similar to coin-change but tracking
//   paths instead of counts.
// - Distributed systems: the search tree can be split by first-choice
//   branch across workers (each worker explores combinations starting with
//   a fixed candidate), then results are merged/streamed back.
// - Real-world analog: finding all ways to fulfill a shipment weight/volume
//   target using a fixed catalog of package sizes, or budget allocation
//   combinations that exactly hit a spending cap.

module.exports = combinationSum;
