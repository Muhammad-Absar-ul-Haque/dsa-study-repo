/**
 * Problem: Longest Consecutive Sequence
 * Difficulty: Medium
 * Pattern: Hashset + Sequence Start Detection
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Backend Relevance: Finding the longest unbroken run of contiguous IDs/timestamps, e.g. the
 *   longest streak of consecutive successful health-check ticks.
 */

function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let longest = 0;

  for (const n of numSet) {
    if (!numSet.has(n - 1)) {
      let length = 1;
      let current = n;
      while (numSet.has(current + 1)) {
        current++;
        length++;
      }
      longest = Math.max(longest, length);
    }
  }

  return longest;
}

// ---- Tests ----
console.log(longestConsecutive([100, 4, 200, 1, 3, 2]), '// expected:', 4);
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]), '// expected:', 9);
console.log(longestConsecutive([]), '// expected:', 0);

// SENIOR NOTES:
// - At 1B+ elements: a full in-memory Set of a billion numbers is heavy; an external sort
//   followed by a single linear scan trades memory for I/O at that scale.
// - Distributed systems: sort-based approaches parallelize well (distributed sort like
//   Spark's sortByKey), then a merge pass finds runs that span shard boundaries.
// - Real-world analog: finding the longest streak of consecutive days a user was active, or
//   the largest contiguous block of free IDs in an allocator.

module.exports = longestConsecutive;
