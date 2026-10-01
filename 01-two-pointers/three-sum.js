/**
 * Problem: 3Sum
 * Difficulty: Medium
 * Pattern: Two Pointers
 * Time Complexity: O(n^2)
 * Space Complexity: O(1) extra (excluding output; O(log n) - O(n) for sort)
 * Backend Relevance: Combinatorial matching, similar to finding three transactions
 *   that net to zero for fraud/reconciliation checks.
 */

function threeSum(nums) {
  const result = [];
  const sorted = [...nums].sort((a, b) => a - b);

  for (let i = 0; i < sorted.length - 2; i++) {
    // skip duplicate anchors to avoid duplicate triplets
    if (i > 0 && sorted[i] === sorted[i - 1]) continue;
    // early exit: smallest possible sum with this anchor is already positive
    if (sorted[i] > 0) break;

    let left = i + 1;
    let right = sorted.length - 1;

    while (left < right) {
      const sum = sorted[i] + sorted[left] + sorted[right];
      if (sum === 0) {
        result.push([sorted[i], sorted[left], sorted[right]]);
        left++;
        right--;
        // skip duplicates for both pointers
        while (left < right && sorted[left] === sorted[left - 1]) left++;
        while (left < right && sorted[right] === sorted[right + 1]) right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}

// ---- Tests ----
console.log(threeSum([-1, 0, 1, 2, -1, -4]), "// expected: [[-1,-1,2],[-1,0,1]]");
console.log(threeSum([0, 1, 1]), '// expected: []');
console.log(threeSum([0, 0, 0]), '// expected: [[0,0,0]]');

// SENIOR NOTES:
// - At 1B+ elements: O(n^2) is infeasible; you'd need approximate/streaming
//   techniques or to restrict to bounded value ranges (bucket by value) rather
//   than a full pairwise scan.
// - Distributed systems: sort partitions independently, then do a distributed
//   merge and broadcast small partitions to check cross-shard triplets (similar
//   to a distributed join with a sort-merge strategy).
// - Real-world analog: fraud detection rules that look for three related ledger
//   entries netting to zero (wash trading / money laundering pattern detection).

module.exports = threeSum;
