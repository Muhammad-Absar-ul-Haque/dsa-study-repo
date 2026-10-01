/**
 * Problem: Sort Characters By Frequency
 * Difficulty: Medium
 * Pattern: Hashmap Frequency Count + Sort
 * Time Complexity: O(n log n) where n is string length (bounded alphabet makes this ~O(n))
 * Space Complexity: O(n)
 * Backend Relevance: Same primitive as building a character/byte-frequency table for
 *   Huffman-style compression before encoding a payload.
 */

function frequencySort(s) {
  const freqMap = new Map();
  for (const c of s) freqMap.set(c, (freqMap.get(c) || 0) + 1);

  return [...freqMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([ch, freq]) => ch.repeat(freq))
    .join('');
}

// ---- Tests ----
console.log(frequencySort('tree'), '// expected:', 'eetr');
console.log(frequencySort('aaabbcccc'), '// expected:', 'ccccaaabb');
console.log(frequencySort('a'), '// expected:', 'a');

// SENIOR NOTES:
// - At 1B+ elements: alphabet is bounded (e.g. 256 bytes / Unicode code points), so counting
//   is O(n) and only the final sort-by-count is over a small fixed set — stays cheap at scale.
// - Distributed systems: partition the string/stream, count frequencies per shard, sum-reduce
//   the small frequency tables centrally, then re-expand — the expensive part parallelizes trivially.
// - Real-world analog: entropy coding (Huffman/Zstd dictionary building) and log-line character
//   distribution analysis for anomaly detection.

module.exports = frequencySort;
