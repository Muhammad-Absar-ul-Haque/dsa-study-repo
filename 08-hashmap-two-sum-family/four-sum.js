/**
 * Problem: 4Sum
 * Difficulty: Medium
 * Pattern: Sort + two pointers with outer loops, skipping duplicates
 * Time Complexity: O(n^3)
 * Space Complexity: O(1) extra (excluding output and sort space)
 * Backend Relevance: Finding all combinations of records that satisfy a sum
 *   constraint generalizes to multi-leg reconciliation (e.g. matching four
 *   transactions that net to zero) in ledger auditing.
 */

function fourSum(nums, target) {
  const sorted = [...nums].sort((a, b) => a - b);
  const n = sorted.length;
  const result = [];

  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && sorted[i] === sorted[i - 1]) continue;

    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && sorted[j] === sorted[j - 1]) continue;

      let left = j + 1;
      let right = n - 1;

      while (left < right) {
        const sum = sorted[i] + sorted[j] + sorted[left] + sorted[right];

        if (sum === target) {
          result.push([sorted[i], sorted[j], sorted[left], sorted[right]]);
          while (left < right && sorted[left] === sorted[left + 1]) left++;
          while (left < right && sorted[right] === sorted[right - 1]) right--;
          left++;
          right--;
        } else if (sum < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }

  return result;
}

// ---- Tests ----
console.log(
  JSON.stringify(fourSum([1, 0, -1, 0, -2, 2], 0)),
  '// expected: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]'
);
console.log(JSON.stringify(fourSum([2, 2, 2, 2, 2], 8)), '// expected: [[2,2,2,2]]');
console.log(JSON.stringify(fourSum([], 0)), '// expected: []');

// SENIOR NOTES:
// - At 1B+ elements: O(n^3) is completely infeasible at scale; real systems would
//   reduce to indexed pairwise-sum lookups (precompute pair sums into a hashmap)
//   or restrict the search space with domain constraints.
// - Distributed systems: sorting can be done via distributed merge sort, but the
//   nested two-pointer search needs data co-located per partition, so you'd
//   typically bucket by value range and only search within/adjacent buckets.
// - Real-world analog: multi-leg trade/transaction reconciliation that must find
//   combinations of entries netting to a target balance during an audit.

module.exports = fourSum;
