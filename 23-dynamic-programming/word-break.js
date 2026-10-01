/**
 * Problem: Word Break
 * Difficulty: Medium
 * Pattern: Dynamic Programming (string segmentation)
 * Time Complexity: O(n^2) where n = s.length (substring slicing dominates)
 * Space Complexity: O(n) for dp array plus O(dict size) for the word set
 * Backend Relevance: String-segmentation DP mirrors tokenizing an unbroken
 * input (e.g. a URL path or hashtag) into known dictionary/route segments,
 * or validating that a compound key can be decomposed into known fields.
 */

function wordBreak(s, wordDict) {
  const words = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && words.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}

// ---- Tests ----
console.log(wordBreak('leetcode', ['leet', 'code']), '// expected:', true);
console.log(wordBreak('applepenapple', ['apple', 'pen']), '// expected:', true);
console.log(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']), '// expected:', false);

// SENIOR NOTES:
// - At 1B+ elements: a string of length 1B makes the O(n^2) substring DP
//   infeasible (10^18 ops); production tokenizers use a trie/Aho-Corasick
//   automaton walk to check segmentability in O(n * maxWordLen) or better.
// - Distributed systems: exact word-break is sequential over the string,
//   but a streaming tokenizer can process chunks with a bounded lookback
//   window (max dictionary word length) carried across chunk boundaries.
// - Real-world analog: validating that an unbroken URL slug or hashtag can
//   be decomposed into known dictionary words, or that a compound cache key
//   segments cleanly into recognized field names.

module.exports = wordBreak;
