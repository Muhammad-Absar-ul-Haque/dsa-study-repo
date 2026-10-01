/**
 * Problem: Longest Common Subsequence
 * Difficulty: Medium
 * Pattern: Dynamic Programming (2D grid, string alignment)
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n) for the dp table (can be reduced to O(min(m,n)))
 * Backend Relevance: LCS is the backbone of diff/merge tooling (e.g. `git
 * diff`), version comparison, and plagiarism/similarity detection between
 * text documents or API schema versions.
 */

function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}

// ---- Tests ----
console.log(longestCommonSubsequence('abcde', 'ace'), '// expected:', 3);
console.log(longestCommonSubsequence('abc', 'abc'), '// expected:', 3);
console.log(longestCommonSubsequence('abc', 'def'), '// expected:', 0);

// SENIOR NOTES:
// - At 1B+ elements: the O(m*n) dp table is quadratic in memory and time —
//   comparing two billion-character documents this way is impossible;
//   real diff tools (Myers diff) exploit sparsity for O((m+n)*d) where d is
//   the edit distance, far better when documents are mostly similar.
// - Distributed systems: LCS doesn't decompose cleanly across shards due to
//   cross-boundary dependencies, but Hirschberg's algorithm (divide and
//   conquer using LCS-length-only passes) reduces space to O(min(m,n)) and
//   can distribute the divide step across workers.
// - Real-world analog: `git diff`/`git merge` computing minimal changesets
//   between file versions, or comparing two API schema versions for
//   backward-compatible field overlap.

module.exports = longestCommonSubsequence;
