/**
 * Problem: Group Shifted Strings
 * Difficulty: Medium
 * Pattern: Hashmap Grouping by Canonical Key
 * Time Complexity: O(n * k) where k is average string length
 * Space Complexity: O(n * k)
 * Backend Relevance: Canonicalizing records into a normalized key before grouping mirrors
 *   grouping log lines by a normalized template (e.g. stripping variable IDs from error strings).
 */

function groupStrings(strings) {
  const groups = new Map();

  for (const s of strings) {
    // Canonical key: each char's offset from the first char, mod 26 (shift-invariant).
    const key = [...s].map((c) => (c.charCodeAt(0) - s.charCodeAt(0) + 26) % 26).join(',');

    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }

  return [...groups.values()];
}

// ---- Tests ----
console.log(
  groupStrings(['abc', 'bcd', 'acef', 'xyz', 'az', 'ba', 'a', 'z']),
  '// expected:',
  [['abc', 'bcd', 'xyz'], ['acef'], ['az', 'ba'], ['a', 'z']]
);
console.log(groupStrings(['a']), '// expected:', [['a']]);
console.log(groupStrings(['ab', 'cd', 'ba']), '// expected:', [['ab', 'cd'], ['ba']]);

// SENIOR NOTES:
// - At 1B+ elements: building a string key per entry is memory-heavy at scale; hash the key
//   (e.g. a numeric rolling hash of offsets) instead of materializing a comma-joined string.
// - Distributed systems: canonical-key grouping is a natural MapReduce shuffle — mappers emit
//   (canonicalKey, string), and the shuffle/group-by-key step does the grouping across shards.
// - Real-world analog: grouping near-duplicate log templates or normalizing rotated/shifted
//   cipher text families during forensic log analysis.

module.exports = groupStrings;
