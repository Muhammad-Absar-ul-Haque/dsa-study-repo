/**
 * Problem: Sort Colors (Dutch National Flag)
 * Difficulty: Medium
 * Pattern: Two Pointers (three-way partition)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: Single-pass three-way bucketing, like classifying requests
 *   into low/medium/high priority queues in-place with one scan.
 */

function sortColors(nums) {
  let low = 0;       // boundary: everything before is 0
  let mid = 0;        // current element under inspection
  let high = nums.length - 1; // boundary: everything after is 2

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--; // don't advance mid: swapped-in value still needs inspection
    }
  }
  return nums;
}

// ---- Tests ----
console.log(sortColors([2, 0, 2, 1, 1, 0]), '// expected: [0,0,1,1,2,2]');
console.log(sortColors([2, 0, 1]), '// expected: [0,1,2]');
console.log(sortColors([0]), '// expected: [0]');

// SENIOR NOTES:
// - At 1B+ elements: single-pass O(n)/O(1) beats a full sort (O(n log n)); this
//   is the pattern behind any bounded-cardinality sort (radix/counting sort).
// - Distributed systems: each shard can three-way-partition locally, then a
//   final merge just concatenates shard buckets in order (0s, then 1s, then 2s).
// - Real-world analog: triaging log lines into ERROR/WARN/INFO buckets in a
//   single streaming pass, or QoS traffic shaping into priority lanes.

module.exports = sortColors;
