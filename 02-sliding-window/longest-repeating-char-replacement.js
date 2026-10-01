/**
 * Problem: Longest Repeating Character Replacement
 * Difficulty: Medium
 * Pattern: Sliding Window
 * Time Complexity: O(n)
 * Space Complexity: O(26) = O(1)
 * Backend Relevance: Similar to finding the longest span of near-uniform metric
 *   values allowing up to k "corrections" (e.g. tolerating k anomalous readings).
 */

function characterReplacement(s, k) {
  const counts = new Array(26).fill(0);
  const base = 'A'.charCodeAt(0);
  let windowStart = 0;
  let maxCount = 0; // highest frequency of any single char seen in current window
  let best = 0;

  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    const idx = s.charCodeAt(windowEnd) - base;
    counts[idx]++;
    maxCount = Math.max(maxCount, counts[idx]);

    const windowLen = windowEnd - windowStart + 1;
    // chars that need replacing = windowLen - count of most frequent char
    if (windowLen - maxCount > k) {
      const leftIdx = s.charCodeAt(windowStart) - base;
      counts[leftIdx]--;
      windowStart++;
    }
    best = Math.max(best, windowEnd - windowStart + 1);
  }
  return best;
}

// ---- Tests ----
console.log(characterReplacement('ABAB', 2), '// expected: 4');
console.log(characterReplacement('AABABBA', 1), '// expected: 4');
console.log(characterReplacement('AAAA', 0), '// expected: 4');

// SENIOR NOTES:
// - At 1B+ elements: O(n) with a fixed 26-slot array keeps memory constant
//   regardless of input size; this is why fixed-alphabet windows scale so well.
// - Distributed systems: window state (counts + maxCount) can be checkpointed at
//   shard boundaries and reconciled with an overlap region, similar to other
//   sliding-window shard strategies.
// - Real-world analog: tolerating up to k noisy/faulty sensor readings while
//   still reporting the longest stretch of "effectively uniform" signal.

module.exports = characterReplacement;
