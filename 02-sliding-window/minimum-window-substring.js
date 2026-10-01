/**
 * Problem: Minimum Window Substring
 * Difficulty: Hard
 * Pattern: Sliding Window
 * Time Complexity: O(n + m)
 * Space Complexity: O(m) for the character frequency map
 * Backend Relevance: Finding the smallest contiguous log/event span that contains
 *   a required set of event types — useful for root-cause window extraction.
 */

function minWindow(s, t) {
  if (t.length === 0 || s.length < t.length) return '';

  const need = new Map();
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);

  let required = need.size; // distinct chars still needed at full count
  let satisfied = 0;
  const windowCounts = new Map();

  let windowStart = 0;
  let bestLen = Infinity;
  let bestStart = 0;

  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    const ch = s[windowEnd];
    windowCounts.set(ch, (windowCounts.get(ch) || 0) + 1);
    if (need.has(ch) && windowCounts.get(ch) === need.get(ch)) {
      satisfied++;
    }

    // shrink from the left while the window still satisfies all requirements
    while (satisfied === required) {
      if (windowEnd - windowStart + 1 < bestLen) {
        bestLen = windowEnd - windowStart + 1;
        bestStart = windowStart;
      }
      const leftChar = s[windowStart];
      windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);
      if (need.has(leftChar) && windowCounts.get(leftChar) < need.get(leftChar)) {
        satisfied--;
      }
      windowStart++;
    }
  }
  return bestLen === Infinity ? '' : s.substring(bestStart, bestStart + bestLen);
}

// ---- Tests ----
console.log(minWindow('ADOBECODEBANC', 'ABC'), '// expected: BANC');
console.log(minWindow('a', 'a'), '// expected: a');
console.log(minWindow('a', 'aa'), '// expected: (empty string)');

// SENIOR NOTES:
// - At 1B+ elements: still O(n), but the frequency maps must stay bounded by the
//   pattern size, not the input size, to avoid memory blowup on huge streams.
// - Distributed systems: like the longest-substring problem, windows can straddle
//   shard boundaries, so shards must overlap by the pattern length and results
//   get reconciled centrally.
// - Real-world analog: finding the smallest log window containing all required
//   trace events (e.g. "request started", "auth checked", "response sent") for
//   a distributed trace reconstruction.

module.exports = minWindow;
