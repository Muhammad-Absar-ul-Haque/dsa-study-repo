/**
 * Problem: Two Sum (classic hashmap)
 * Difficulty: Easy
 * Pattern: Hashmap complement lookup
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Backend Relevance: Complement lookup via hashmap is the canonical O(n) pattern
 *   behind matching engines (order book buy/sell matching) and fraud-detection
 *   pair lookups where a linear scan per query would be too slow.
 */

function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }

  return [];
}

// ---- Tests ----
console.log(JSON.stringify(twoSum([2, 7, 11, 15], 9)), '// expected: [0,1]');
console.log(JSON.stringify(twoSum([3, 2, 4], 6)), '// expected: [1,2]');
console.log(JSON.stringify(twoSum([3, 3], 6)), '// expected: [0,1]');

// SENIOR NOTES:
// - At 1B+ elements: an in-memory hashmap of a billion entries won't fit on one
//   machine; you'd need an external hash index (e.g. RocksDB/sorted disk index)
//   or a sort-then-two-pointer approach trading time for space.
// - Distributed systems: partition nums by hash(value) so complements always land
//   on the same shard, then each shard does local two-sum — a classic sharded
//   join pattern.
// - Real-world analog: order-matching engines pairing buy/sell orders that sum to
//   a target price, and fraud detection pairing transactions that net to zero.

module.exports = twoSum;
