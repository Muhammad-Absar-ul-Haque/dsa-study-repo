/**
 * Problem: Remove Duplicates from Sorted Array
 * Difficulty: Easy
 * Pattern: Two Pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: In-place dedup of a sorted result set, similar to compacting
 *   a sorted DB cursor stream without allocating a second buffer.
 */

function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let slow = 0; // index of last unique element written
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  return slow + 1;
}

// ---- Tests ----
const arr1 = [1, 1, 2];
console.log(removeDuplicates(arr1), arr1.slice(0, 2), '// expected: 2 [1,2]');

const arr2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log(removeDuplicates(arr2), arr2.slice(0, 5), '// expected: 5 [0,1,2,3,4]');

const arr3 = [1];
console.log(removeDuplicates(arr3), arr3.slice(0, 1), '// expected: 1 [1]');

// SENIOR NOTES:
// - At 1B+ elements: in-place O(1) space is essential; a naive Set-based dedup
//   would need O(n) extra memory and risk OOM on huge arrays.
// - Distributed systems: dedup per-shard first, then merge shard boundaries since
//   duplicates can span shard edges if data was sorted then partitioned naively.
// - Real-world analog: compacting a sorted change-log / WAL to keep only the
//   latest distinct keys before flushing to disk (LSM-tree compaction).

module.exports = removeDuplicates;
