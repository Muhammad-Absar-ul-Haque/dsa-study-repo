/**
 * Problem: Palindromic Substrings (count them)
 * Difficulty: Medium
 * Pattern: Expand around center
 * Time Complexity: O(n^2)
 * Space Complexity: O(1) extra
 * Backend Relevance: Counting all symmetric substructures is analogous to counting
 *   all matching bracket/tag spans in a validator, or all repeated motifs in a
 *   sequence-analysis pipeline.
 */

function countSubstrings(s) {
  let count = 0;

  const expand = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      count++;
      left--;
      right++;
    }
  };

  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }

  return count;
}

// ---- Tests ----
console.log(countSubstrings('abc'), '// expected: 3');
console.log(countSubstrings('aaa'), '// expected: 6');
console.log(countSubstrings(''), '// expected: 0');

// SENIOR NOTES:
// - At 1B+ elements: O(n^2) blows up; Manacher's algorithm computes palindrome
//   radii in O(n), needed for large-scale text/genome analysis.
// - Distributed systems: counting can be split across overlapping shard windows
//   (overlap by expected max radius) and partial counts summed, similar to
//   distributed n-gram counting.
// - Real-world analog: genomic palindrome counting, or counting balanced/symmetric
//   spans when auditing structured text (config files, markup) at scale.

module.exports = countSubstrings;
