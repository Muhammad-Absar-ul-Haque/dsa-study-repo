/**
 * Problem: Two Sum II - Input Array Is Sorted
 * Difficulty: Easy
 * Pattern: Two Pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: Similar to matching two sorted event streams (e.g. reconciling
 *   ledger entries) for a target sum without extra memory.
 */

function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      // 1-indexed result as required by the problem
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++; // need a bigger sum
    } else {
      right--; // need a smaller sum
    }
  }
  return [];
}

// ---- Tests ----
console.log(twoSum([2, 7, 11, 15], 9), '// expected: [1, 2]');
console.log(twoSum([2, 3, 4], 6), '// expected: [1, 3]');
console.log(twoSum([-1, 0], -1), '// expected: [1, 2]');

// SENIOR NOTES:
// - At 1B+ elements: array must be sorted already (sorting itself is O(n log n));
//   the two-pointer scan stays O(n) and O(1) extra memory, which is why this beats
//   a hashmap approach at scale (no O(n) auxiliary map to allocate/GC).
// - Distributed systems: if data is sharded across sorted partitions, you'd need a
//   merge-style k-way pointer walk across shards instead of two indices into one array.
// - Real-world analog: matching buy/sell orders in an order book where both sides
//   are sorted by price and you walk inward to find a clearing price.

module.exports = twoSum;
