/**
 * Problem: Contains Duplicate III (index distance k, value distance t)
 * Difficulty: Hard
 * Pattern: Bucket Hashing (Sliding Window Buckets)
 * Time Complexity: O(n)
 * Space Complexity: O(min(n, k))
 * Backend Relevance: Similar to anomaly detection over a metric stream — flag readings that
 *   are both close in time (index) and close in value (near-duplicate measurements).
 */

function containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff) {
  if (indexDiff < 0 || valueDiff < 0) return false;

  const buckets = new Map();
  const bucketSize = valueDiff + 1;

  for (let i = 0; i < nums.length; i++) {
    const bucketId = Math.floor(nums[i] / bucketSize);

    if (buckets.has(bucketId)) return true;
    if (buckets.has(bucketId - 1) && Math.abs(nums[i] - buckets.get(bucketId - 1)) <= valueDiff) {
      return true;
    }
    if (buckets.has(bucketId + 1) && Math.abs(nums[i] - buckets.get(bucketId + 1)) <= valueDiff) {
      return true;
    }

    buckets.set(bucketId, nums[i]);

    if (i >= indexDiff) {
      buckets.delete(Math.floor(nums[i - indexDiff] / bucketSize));
    }
  }

  return false;
}

// ---- Tests ----
console.log(containsNearbyAlmostDuplicate([1, 2, 3, 1], 3, 0), '// expected:', true);
console.log(containsNearbyAlmostDuplicate([1, 0, 1, 1], 1, 2), '// expected:', true);
console.log(containsNearbyAlmostDuplicate([1, 5, 9, 1, 5, 9], 2, 3), '// expected:', false);

// SENIOR NOTES:
// - At 1B+ elements: bucketing bounds the map to O(k) live entries via the sliding-window
//   eviction, avoiding an O(n^2) brute-force comparison at any scale.
// - Distributed systems: like Contains Duplicate II, this depends on a single ordered index
//   space, so cross-shard checks require a globally ordered stream or overlapping window merges.
// - Real-world analog: fraud detection flagging near-identical transaction amounts occurring
//   close together in time from the same account.

module.exports = containsNearbyAlmostDuplicate;
