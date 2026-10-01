/**
 * Problem: Intersection of Two Arrays
 * Difficulty: Easy
 * Pattern: Hashset Membership Test
 * Time Complexity: O(n + m)
 * Space Complexity: O(n + m)
 * Backend Relevance: Computing the overlap between two user segments or permission sets,
 *   e.g. "which users are in both cohort A and cohort B".
 */

function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const result = new Set();

  for (const n of nums2) {
    if (set1.has(n)) result.add(n);
  }

  return [...result];
}

// ---- Tests ----
console.log(intersection([1, 2, 2, 1], [2, 2]), '// expected:', [2]);
console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4]), '// expected:', [9, 4]);
console.log(intersection([1, 2, 3], [4, 5, 6]), '// expected:', []);

// SENIOR NOTES:
// - At 1B+ elements: building a full Set from one billion-row array won't fit in memory;
//   sort both arrays externally and merge-scan for common elements instead.
// - Distributed systems: this maps directly onto a distributed join — hash-partition both
//   sets by value onto the same shards, then intersect locally within each shard.
// - Real-world analog: SQL INNER JOIN / set-intersection queries between two large tables,
//   or computing shared friends between two social graph adjacency lists.

module.exports = intersection;
