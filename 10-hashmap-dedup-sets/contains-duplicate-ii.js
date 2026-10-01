/**
 * Problem: Contains Duplicate II (within index distance k)
 * Difficulty: Easy
 * Pattern: Hashmap Last-Seen-Index (Sliding Window via Map)
 * Time Complexity: O(n)
 * Space Complexity: O(min(n, k))
 * Backend Relevance: Detecting a repeated event within a bounded time/position window, e.g.
 *   the same alert firing twice within N log lines of each other.
 */

function containsNearbyDuplicate(nums, k) {
  const lastIndex = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (lastIndex.has(nums[i]) && i - lastIndex.get(nums[i]) <= k) {
      return true;
    }
    lastIndex.set(nums[i], i);
  }

  return false;
}

// ---- Tests ----
console.log(containsNearbyDuplicate([1, 2, 3, 1], 3), '// expected:', true);
console.log(containsNearbyDuplicate([1, 0, 1, 1], 1), '// expected:', true);
console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2), '// expected:', false);

// SENIOR NOTES:
// - At 1B+ elements: the map only needs to retain entries within the last k indices, so
//   memory stays bounded by k regardless of total stream length — safe for infinite streams.
// - Distributed systems: only meaningful within a single ordered partition; a Kafka topic
//   with multiple partitions would need this check per-partition or on a globally-ordered key.
// - Real-world analog: rate-limiting duplicate webhook deliveries within a rolling window.

module.exports = containsNearbyDuplicate;
