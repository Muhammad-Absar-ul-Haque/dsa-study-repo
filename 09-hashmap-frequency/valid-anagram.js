/**
 * Problem: Valid Anagram
 * Difficulty: Easy
 * Pattern: Hashmap Frequency Count
 * Time Complexity: O(n)
 * Space Complexity: O(1) (bounded alphabet)
 * Backend Relevance: Same check used to compare two multisets of fields cheaply, e.g.
 *   verifying two API payloads contain the same set of keys/values regardless of order.
 */

function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const freqMap = new Map();
  for (const c of s) freqMap.set(c, (freqMap.get(c) || 0) + 1);

  for (const c of t) {
    const count = freqMap.get(c);
    if (!count) return false;
    freqMap.set(c, count - 1);
  }

  return true;
}

// ---- Tests ----
console.log(isAnagram('anagram', 'nagaram'), '// expected:', true);
console.log(isAnagram('rat', 'car'), '// expected:', false);
console.log(isAnagram('a', 'ab'), '// expected:', false);

// SENIOR NOTES:
// - At 1B+ elements: length check short-circuits huge mismatches instantly; for equal-length
//   giant strings, streaming both inputs and updating one frequency map keeps memory bounded.
// - Distributed systems: frequency maps from chunks of each string can be summed and compared
//   once fully reduced, enabling parallel diffing of massive text blobs.
// - Real-world analog: config-drift detection — confirming two config file digests represent
//   the same multiset of settings even if key order differs.

module.exports = isAnagram;
