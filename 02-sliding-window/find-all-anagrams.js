/**
 * Problem: Find All Anagrams in a String
 * Difficulty: Medium
 * Pattern: Sliding Window (fixed size)
 * Time Complexity: O(n)
 * Space Complexity: O(26) = O(1)
 * Backend Relevance: Scanning a stream for every occurrence of a fixed-size
 *   pattern signature, like locating all windows matching a known event fingerprint.
 */

function findAnagrams(s, p) {
  const result = [];
  if (p.length > s.length) return result;

  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);
  const base = 'a'.charCodeAt(0);

  for (const ch of p) need[ch.charCodeAt(0) - base]++;

  for (let i = 0; i < s.length; i++) {
    window[s.charCodeAt(i) - base]++;

    if (i >= p.length) {
      window[s.charCodeAt(i - p.length) - base]--;
    }

    if (i >= p.length - 1 && arraysEqual(need, window)) {
      result.push(i - p.length + 1);
    }
  }
  return result;
}

function arraysEqual(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// ---- Tests ----
console.log(findAnagrams('cbaebabacd', 'abc'), '// expected: [0, 6]');
console.log(findAnagrams('abab', 'ab'), '// expected: [0, 1, 2]');
console.log(findAnagrams('a', 'b'), '// expected: []');

// SENIOR NOTES:
// - At 1B+ elements: same as permutation-in-string — the per-position O(26)
//   comparison can be replaced with an O(1) running match counter for huge inputs.
// - Distributed systems: fixed window size again means clean shard overlap of
//   (pattern length - 1) elements at each boundary.
// - Real-world analog: scanning network packet streams for all positions
//   matching a fixed-length byte-frequency signature (e.g. simple IDS heuristics).

module.exports = findAnagrams;
