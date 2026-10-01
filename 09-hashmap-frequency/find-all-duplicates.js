/**
 * Problem: Find All Duplicates in an Array
 * Difficulty: Medium
 * Pattern: In-place Index Marking (values constrained to [1, n])
 * Time Complexity: O(n)
 * Space Complexity: O(1) extra (excluding output array)
 * Backend Relevance: Exploits a bounded value range the way a bitmap/bloom-filter based
 *   dedup check exploits a bounded ID space to avoid a separate hash set.
 */

function findDuplicates(nums) {
  const result = [];

  for (const n of nums) {
    const idx = Math.abs(n) - 1;
    if (nums[idx] < 0) {
      result.push(idx + 1);
    } else {
      nums[idx] = -nums[idx];
    }
  }

  return result;
}

// ---- Tests ----
console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]), '// expected:', [2, 3]);
console.log(findDuplicates([1, 1, 2]), '// expected:', [1]);
console.log(findDuplicates([1]), '// expected:', []);

// SENIOR NOTES:
// - At 1B+ elements: in-place sign-marking avoids an O(n) hash set entirely — critical when
//   memory, not time, is the bottleneck at billion-scale.
// - Distributed systems: this trick relies on random-access mutation of a single array, which
//   doesn't shard cleanly; a distributed version would fall back to per-shard hash sets merged
//   via a count-based reduce.
// - Real-world analog: bitmap indexes used in databases to flag duplicate primary keys during
//   bulk-load validation.

module.exports = findDuplicates;
