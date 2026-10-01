/**
 * Problem: Group Anagrams
 * Difficulty: Medium
 * Pattern: Hashmap with canonical key
 * Time Complexity: O(n * k log k), n = number of strings, k = max string length
 * Space Complexity: O(n * k)
 * Backend Relevance: Grouping records by a normalized signature is the same trick used
 *   to dedupe/bucket log lines, cluster near-identical API payloads, or group SKUs by
 *   a normalized attribute key in a catalog service.
 */

function groupAnagrams(strs) {
  const groups = new Map();

  for (const str of strs) {
    const key = str.split('').sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(str);
  }

  return Array.from(groups.values());
}

// ---- Tests ----
console.log(
  JSON.stringify(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])),
  "// expected: [[\"eat\",\"tea\",\"ate\"],[\"tan\",\"nat\"],[\"bat\"]]"
);
console.log(JSON.stringify(groupAnagrams([''])), '// expected: [[""]]');
console.log(JSON.stringify(groupAnagrams(['a'])), '// expected: [["a"]]');

// SENIOR NOTES:
// - At 1B+ elements: sorting each string as a key is O(k log k) per item and the Map
//   holding every group in memory won't fit; you'd stream and spill groups to disk/DB
//   keyed by a cheaper signature (e.g. char-count vector) instead of sorted string.
// - Distributed systems: partition by hash(key) across shards/reducers (classic
//   MapReduce group-by), then merge partial groups; key collisions must still route
//   to the same shard, so key derivation must be deterministic across nodes.
// - Real-world analog: MapReduce/Spark "group by key" stage, or a search engine
//   grouping near-duplicate documents by a normalized shingle/simhash key.

module.exports = groupAnagrams;
