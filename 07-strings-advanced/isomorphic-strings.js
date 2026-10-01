/**
 * Problem: Isomorphic Strings
 * Difficulty: Easy
 * Pattern: Two-way hashmap character mapping
 * Time Complexity: O(n)
 * Space Complexity: O(1) (bounded by character set size)
 * Backend Relevance: Verifying a consistent bijective mapping between two token
 *   streams resembles validating schema/field-name remapping between two systems
 *   (e.g. legacy-to-new column mapping) stays one-to-one.
 */

function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;

  const mapST = new Map();
  const mapTS = new Map();

  for (let i = 0; i < s.length; i++) {
    const a = s[i];
    const b = t[i];

    if (mapST.has(a) && mapST.get(a) !== b) return false;
    if (mapTS.has(b) && mapTS.get(b) !== a) return false;

    mapST.set(a, b);
    mapTS.set(b, a);
  }

  return true;
}

// ---- Tests ----
console.log(isIsomorphic('egg', 'add'), '// expected: true');
console.log(isIsomorphic('foo', 'bar'), '// expected: false');
console.log(isIsomorphic('paper', 'title'), '// expected: true');

// SENIOR NOTES:
// - At 1B+ elements: two hashmaps stay O(1) space per unique character, but for
//   huge streams you'd want early-exit as soon as a violation is found rather
//   than buffering (already done here via single pass).
// - Distributed systems: verifying a global bijection across shards requires
//   merging per-shard partial mappings and checking for conflicts at merge time,
//   similar to validating a distributed ID-remapping table stays consistent.
// - Real-world analog: schema migration tools validating a 1:1 field-rename
//   mapping, and cipher/substitution validation in encoding pipelines.

module.exports = isIsomorphic;
