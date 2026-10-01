/**
 * Problem: Fruit Into Baskets
 * Difficulty: Medium
 * Pattern: Sliding Window (at most 2 distinct types)
 * Time Complexity: O(n)
 * Space Complexity: O(1) (at most 3 keys in the map at once)
 * Backend Relevance: Longest contiguous run of events limited to at most 2
 *   distinct categories — like a buffer that can only hold 2 connection types.
 */

function totalFruit(fruits) {
  const basket = new Map(); // fruit type -> count in current window
  let windowStart = 0;
  let best = 0;

  for (let windowEnd = 0; windowEnd < fruits.length; windowEnd++) {
    const type = fruits[windowEnd];
    basket.set(type, (basket.get(type) || 0) + 1);

    // shrink until we have at most 2 distinct fruit types
    while (basket.size > 2) {
      const leftType = fruits[windowStart];
      basket.set(leftType, basket.get(leftType) - 1);
      if (basket.get(leftType) === 0) basket.delete(leftType);
      windowStart++;
    }
    best = Math.max(best, windowEnd - windowStart + 1);
  }
  return best;
}

// ---- Tests ----
console.log(totalFruit([1, 2, 1]), '// expected: 3');
console.log(totalFruit([0, 1, 2, 2]), '// expected: 3');
console.log(totalFruit([1, 2, 3, 2, 2]), '// expected: 4');

// SENIOR NOTES:
// - At 1B+ elements: O(n) with a tiny bounded map (max 3 keys); memory stays
//   constant regardless of stream length.
// - Distributed systems: this is a special case of "at most k distinct" sliding
//   window — shard with (window size unknown ahead of time) means overlapping
//   reconciliation is needed, same as other variable-length windows.
// - Real-world analog: a connection pool that can juggle at most 2 distinct
//   backend types at once; find the longest streak of requests it could serve
//   without a type-3 request forcing eviction.

module.exports = totalFruit;
