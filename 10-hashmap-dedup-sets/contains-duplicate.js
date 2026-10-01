/**
 * Problem: Contains Duplicate
 * Difficulty: Easy
 * Pattern: Hashmap/Set Dedup
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Backend Relevance: The basic building block of idempotency checks — has this request ID,
 *   order ID, or event ID been seen before?
 */

function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}

// ---- Tests ----
console.log(containsDuplicate([1, 2, 3, 1]), '// expected:', true);
console.log(containsDuplicate([1, 2, 3, 4]), '// expected:', false);
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]), '// expected:', true);

// SENIOR NOTES:
// - At 1B+ elements: a Set holding a billion values won't fit in memory; switch to a
//   probabilistic structure (Bloom filter) or external sort + adjacent-scan for duplicates.
// - Distributed systems: dedup across shards requires a shared coordination layer (e.g. a
//   distributed cache or unique-constraint DB index) since each shard only sees local uniqueness.
// - Real-world analog: idempotency keys in payment APIs, or Kafka consumer "exactly-once"
//   dedup using a seen-offsets store.

module.exports = containsDuplicate;
