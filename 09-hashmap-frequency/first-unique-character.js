/**
 * Problem: First Unique Character in a String
 * Difficulty: Easy
 * Pattern: Hashmap Frequency Count
 * Time Complexity: O(n)
 * Space Complexity: O(1) (bounded alphabet)
 * Backend Relevance: Analogous to finding the first non-repeated event ID in a log stream
 *   for deduplication or first-occurrence auditing.
 */

function firstUniqChar(s) {
  const freqMap = new Map();
  for (const c of s) freqMap.set(c, (freqMap.get(c) || 0) + 1);

  for (let i = 0; i < s.length; i++) {
    if (freqMap.get(s[i]) === 1) return i;
  }
  return -1;
}

// ---- Tests ----
console.log(firstUniqChar('leetcode'), '// expected:', 0);
console.log(firstUniqChar('loveleetcode'), '// expected:', 2);
console.log(firstUniqChar('aabb'), '// expected:', -1);

// SENIOR NOTES:
// - At 1B+ elements: two linear passes over the input is still O(n); the real limit is
//   scanning a 1B-char string in memory at all — would need to stream in chunks with a
//   running frequency map and a second pass over persisted offsets.
// - Distributed systems: frequency counting can be sharded and merged, but "first" unique
//   requires positional ordering, so shards must carry original offsets to reconcile centrally.
// - Real-world analog: finding the first non-duplicate transaction ID in a payment ledger.

module.exports = firstUniqChar;
