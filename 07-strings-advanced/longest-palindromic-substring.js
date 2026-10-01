/**
 * Problem: Longest Palindromic Substring
 * Difficulty: Medium
 * Pattern: Expand around center
 * Time Complexity: O(n^2)
 * Space Complexity: O(1) extra (excluding output)
 * Backend Relevance: Expand-around-center scanning mirrors bidirectional window scans
 *   used in text-diffing, DNA sequence palindrome detection, and symmetric-pattern
 *   validation in log/token streams.
 */

function longestPalindrome(s) {
  if (!s || s.length < 1) return '';

  let start = 0;
  let end = 0;

  const expand = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return [left + 1, right - 1];
  };

  for (let i = 0; i < s.length; i++) {
    const [l1, r1] = expand(i, i);
    if (r1 - l1 > end - start) {
      start = l1;
      end = r1;
    }
    const [l2, r2] = expand(i, i + 1);
    if (r2 - l2 > end - start) {
      start = l2;
      end = r2;
    }
  }

  return s.slice(start, end + 1);
}

// ---- Tests ----
console.log(longestPalindrome('babad'), '// expected: bab (or aba)');
console.log(longestPalindrome('cbbd'), '// expected: bb');
console.log(longestPalindrome('a'), '// expected: a');

// SENIOR NOTES:
// - At 1B+ elements: O(n^2) is infeasible for huge strings; Manacher's algorithm
//   gives O(n) and would be required for streaming/large-text palindrome detection.
// - Distributed systems: hard to parallelize naively since palindromes can span
//   shard boundaries; you'd overlap chunk boundaries by max-expected-palindrome
//   length (like overlapping windows in distributed sequence alignment).
// - Real-world analog: biological sequence analysis (palindromic restriction sites
//   in DNA) and streaming text symmetry checks in log-anomaly detection.

module.exports = longestPalindrome;
