/**
 * Problem: Subarrays with K Different Integers
 * Difficulty: Hard
 * Pattern: Sliding Window (atMost(k) - atMost(k-1) trick)
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 * Backend Relevance: Counting spans of a log stream with exactly k distinct event
 *   types — useful for diversity/entropy-bounded analytics windows.
 */

function subarraysWithKDistinct(nums, k) {
  return atMostKDistinct(nums, k) - atMostKDistinct(nums, k - 1);
}

// count subarrays with at most `k` distinct integers
function atMostKDistinct(nums, k) {
  if (k < 0) return 0;

  const counts = new Map();
  let windowStart = 0;
  let total = 0;

  for (let windowEnd = 0; windowEnd < nums.length; windowEnd++) {
    const val = nums[windowEnd];
    counts.set(val, (counts.get(val) || 0) + 1);

    while (counts.size > k) {
      const leftVal = nums[windowStart];
      counts.set(leftVal, counts.get(leftVal) - 1);
      if (counts.get(leftVal) === 0) counts.delete(leftVal);
      windowStart++;
    }
    // every subarray ending at windowEnd and starting anywhere in
    // [windowStart, windowEnd] has at most k distinct values
    total += windowEnd - windowStart + 1;
  }
  return total;
}

// ---- Tests ----
console.log(subarraysWithKDistinct([1, 2, 1, 2, 3], 2), '// expected: 7');
console.log(subarraysWithKDistinct([1, 2, 1, 3, 4], 3), '// expected: 3');
console.log(subarraysWithKDistinct([1, 2, 1, 2, 3], 3), '// expected: 3');

// SENIOR NOTES:
// - At 1B+ elements: two O(n) passes (atMost(k) and atMost(k-1)) stay linear;
//   the map size is bounded by k, not n, keeping memory small.
// - Distributed systems: "exactly k" counting doesn't decompose cleanly across
//   shards because subarrays can straddle boundaries; requires overlap regions
//   plus careful double-counting correction at the seams.
// - Real-world analog: counting time windows in an audit log with exactly k
//   distinct actor IDs, useful for collusion/coordinated-activity detection.

module.exports = subarraysWithKDistinct;
