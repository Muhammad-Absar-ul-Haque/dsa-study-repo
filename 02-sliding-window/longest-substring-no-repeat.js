/**
 * Problem: Longest Substring Without Repeating Characters
 * Difficulty: Medium
 * Pattern: Sliding Window
 * Time Complexity: O(n)
 * Space Complexity: O(min(n, charset size))
 * Backend Relevance: Similar to tracking the longest span of unique request IDs
 *   in a rolling log window for dedup/anomaly detection.
 */

function lengthOfLongestSubstring(s) {
  const lastSeen = new Map(); // char -> last index seen
  let windowStart = 0;
  let best = 0;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (lastSeen.has(ch) && lastSeen.get(ch) >= windowStart) {
      // jump window start past the previous occurrence
      windowStart = lastSeen.get(ch) + 1;
    }
    lastSeen.set(ch, i);
    best = Math.max(best, i - windowStart + 1);
  }
  return best;
}

// ---- Tests ----
console.log(lengthOfLongestSubstring('abcabcbb'), '// expected: 3');
console.log(lengthOfLongestSubstring('bbbbb'), '// expected: 1');
console.log(lengthOfLongestSubstring('pwwkew'), '// expected: 3');

// SENIOR NOTES:
// - At 1B+ elements (a huge string/stream): O(n) with a bounded charset map is
//   fine; if the "character" alphabet is unbounded (e.g. UUIDs), the map itself
//   can grow large and needs periodic eviction of stale entries.
// - Distributed systems: hard to shard directly since the window can straddle
//   shard boundaries; typically solved by overlapping shard reads by max window
//   size and reconciling at the seams.
// - Real-world analog: deduping unique session/request IDs within a rolling time
//   window for rate limiting or replay-attack prevention.

module.exports = lengthOfLongestSubstring;
