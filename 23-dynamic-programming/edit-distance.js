/**
 * Problem: Edit Distance
 * Difficulty: Hard
 * Pattern: Dynamic Programming (2D grid, Levenshtein distance)
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n) for the dp table (can be reduced to O(min(m,n)))
 * Backend Relevance: Levenshtein distance powers fuzzy search/autocorrect,
 * config-diffing tools, and "did you mean" suggestion features by measuring
 * minimal transformation cost between two strings.
 */

function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i; // delete all of word1[0..i)
  for (let j = 0; j <= n; j++) dp[0][j] = j; // insert all of word2[0..j)

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j - 1], // replace
          dp[i - 1][j],     // delete
          dp[i][j - 1]      // insert
        );
      }
    }
  }
  return dp[m][n];
}

// ---- Tests ----
console.log(minDistance('horse', 'ros'), '// expected:', 3);
console.log(minDistance('intention', 'execution'), '// expected:', 5);
console.log(minDistance('', 'abc'), '// expected:', 3);

// SENIOR NOTES:
// - At 1B+ elements: the O(m*n) dp table becomes billions of cells — memory
//   and time both explode; production systems use banded DP (only compute
//   near the diagonal when a max-distance threshold is known) or approximate
//   algorithms (q-gram/MinHash) for large-scale fuzzy matching.
// - Distributed systems: the classic DP has cross-row/column dependencies
//   preventing naive sharding, but wavefront/diagonal parallelization lets
//   each anti-diagonal be computed concurrently across workers.
// - Real-world analog: "did you mean" search suggestions, config/schema
//   diffing tools that compute minimal edit scripts, and spell-checkers.

module.exports = minDistance;
