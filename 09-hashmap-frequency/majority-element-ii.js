/**
 * Problem: Majority Element II (elements appearing more than n/3 times)
 * Difficulty: Medium
 * Pattern: Extended Boyer-Moore Voting Algorithm (at most 2 candidates)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: Identifying up to a handful of "heavy hitters" (e.g. top offending
 *   clients) in a single pass without building a full frequency table.
 */

function majorityElementII(nums) {
  let cand1 = null;
  let cand2 = null;
  let count1 = 0;
  let count2 = 0;

  for (const n of nums) {
    if (cand1 === n) {
      count1++;
    } else if (cand2 === n) {
      count2++;
    } else if (count1 === 0) {
      cand1 = n;
      count1 = 1;
    } else if (count2 === 0) {
      cand2 = n;
      count2 = 1;
    } else {
      count1--;
      count2--;
    }
  }

  // Verification pass: at most 2 elements can exceed n/3, but candidates need confirming.
  count1 = 0;
  count2 = 0;
  for (const n of nums) {
    if (n === cand1) count1++;
    else if (n === cand2) count2++;
  }

  const threshold = Math.floor(nums.length / 3);
  const result = [];
  if (count1 > threshold) result.push(cand1);
  if (count2 > threshold) result.push(cand2);
  return result;
}

// ---- Tests ----
console.log(majorityElementII([3, 2, 3]), '// expected:', [3]);
console.log(majorityElementII([1]), '// expected:', [1]);
console.log(majorityElementII([1, 2]), '// expected:', [1, 2]);

// SENIOR NOTES:
// - At 1B+ elements: the "at most 2 candidates" bound is what keeps this O(1) space at any
//   scale — a naive frequency map would need O(distinct values) memory instead.
// - Distributed systems: per-shard candidate/count pairs can be merged similarly to the
//   single-candidate version, but the merge logic and final verification must re-run globally.
// - Real-world analog: rate-limiting "top few noisy tenants" in a multi-tenant system without
//   maintaining a running histogram of every tenant.

module.exports = majorityElementII;
