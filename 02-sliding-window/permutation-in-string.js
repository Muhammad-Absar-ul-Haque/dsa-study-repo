/**
 * Problem: Permutation in String
 * Difficulty: Medium
 * Pattern: Sliding Window (fixed size)
 * Time Complexity: O(n)
 * Space Complexity: O(26) = O(1)
 * Backend Relevance: Fixed-size window pattern matching, like checking whether a
 *   rolling batch of events matches a required multiset of event types.
 */

function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;

  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);
  const base = 'a'.charCodeAt(0);

  for (const ch of s1) need[ch.charCodeAt(0) - base]++;

  for (let i = 0; i < s2.length; i++) {
    window[s2.charCodeAt(i) - base]++;

    if (i >= s1.length) {
      // slide the window: remove the char that just fell out
      window[s2.charCodeAt(i - s1.length) - base]--;
    }

    if (i >= s1.length - 1 && arraysEqual(need, window)) {
      return true;
    }
  }
  return false;
}

function arraysEqual(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// ---- Tests ----
console.log(checkInclusion('ab', 'eidbaooo'), '// expected: true');
console.log(checkInclusion('ab', 'eidboaoo'), '// expected: false');
console.log(checkInclusion('adc', 'dcda'), '// expected: true');

// SENIOR NOTES:
// - At 1B+ elements: the O(26) equality check per position can be optimized to
//   O(1) by tracking a running "matches" counter instead of comparing full arrays.
// - Distributed systems: fixed-size windows are the easiest to shard — overlap
//   shards by (window size - 1) elements and each shard scans independently.
// - Real-world analog: detecting whether a rolling batch of API calls matches a
//   known attack/bot signature multiset (same call types, any order).

module.exports = checkInclusion;
