/**
 * Problem: Find Common Characters
 * Difficulty: Easy
 * Pattern: Hashmap Frequency Intersection (running min)
 * Time Complexity: O(n * k) where k is average word length
 * Space Complexity: O(1) (bounded alphabet)
 * Backend Relevance: Same as computing the intersection of feature flags or permissions that
 *   are common to every server in a fleet, taking the minimum count across all sources.
 */

function commonChars(words) {
  const minFreq = new Map();
  for (const c of words[0]) minFreq.set(c, (minFreq.get(c) || 0) + 1);

  for (let i = 1; i < words.length; i++) {
    const freq = new Map();
    for (const c of words[i]) freq.set(c, (freq.get(c) || 0) + 1);

    for (const [c, count] of minFreq) {
      minFreq.set(c, Math.min(count, freq.get(c) || 0));
    }
  }

  const result = [];
  for (const [c, count] of minFreq) {
    for (let i = 0; i < count; i++) result.push(c);
  }
  return result;
}

// ---- Tests ----
console.log(commonChars(['bella', 'label', 'roller']), '// expected:', ['e', 'l', 'l']);
console.log(commonChars(['cool', 'lock', 'cook']), '// expected:', ['c', 'o']);
console.log(commonChars(['abc']), '// expected:', ['a', 'b', 'c']);

// SENIOR NOTES:
// - At 1B+ elements: alphabet is bounded so per-word frequency maps stay O(1); the real cost
//   at scale is streaming a billion words through without materializing them all at once.
// - Distributed systems: compute a per-word frequency vector on each shard, then reduce with
//   an element-wise min across all shards to get the global common-character intersection.
// - Real-world analog: computing the set of permissions/scopes common to every role in an
//   access-control system, or ingredients common to every recipe variant.

module.exports = commonChars;
