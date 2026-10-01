/**
 * Problem: Ransom Note
 * Difficulty: Easy
 * Pattern: Frequency counting (hashmap/array)
 * Time Complexity: O(n + m), n = ransomNote length, m = magazine length
 * Space Complexity: O(1) (bounded by 26 lowercase letters)
 * Backend Relevance: Checking whether a target can be built from an available
 *   inventory of characters is the same shape as checking whether an order can be
 *   fulfilled from available stock counts.
 */

function canConstruct(ransomNote, magazine) {
  if (ransomNote.length > magazine.length) return false;

  const counts = new Map();
  for (const char of magazine) {
    counts.set(char, (counts.get(char) || 0) + 1);
  }

  for (const char of ransomNote) {
    const remaining = counts.get(char) || 0;
    if (remaining === 0) return false;
    counts.set(char, remaining - 1);
  }

  return true;
}

// ---- Tests ----
console.log(canConstruct('a', 'b'), '// expected: false');
console.log(canConstruct('aa', 'ab'), '// expected: false');
console.log(canConstruct('aa', 'aab'), '// expected: true');

// SENIOR NOTES:
// - At 1B+ elements: array-of-26 counters beats a Map for constant-factor speed
//   and avoids hashmap overhead; for huge magazines, a single streaming pass
//   still keeps memory O(1) since the alphabet is bounded.
// - Distributed systems: computing character-frequency counts per shard and
//   summing them centrally (map-reduce style) lets availability checks scale
//   across a sharded inventory of "magazine" text.
// - Real-world analog: inventory/stock-fulfillment checks (can this order be
//   filled from available warehouse quantities) and rate-limited token bucket
//   validation.

module.exports = canConstruct;
