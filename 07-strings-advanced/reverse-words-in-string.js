/**
 * Problem: Reverse Words in a String
 * Difficulty: Medium
 * Pattern: Split/trim/reverse with whitespace normalization
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Backend Relevance: Normalizing and reordering whitespace-delimited tokens shows
 *   up in log-field reordering, CLI argument reconstruction, and text normalization
 *   pipelines before search indexing.
 */

function reverseWords(s) {
  return s
    .trim()
    .split(/\s+/)
    .reverse()
    .join(' ');
}

// ---- Tests ----
console.log(reverseWords('the sky is blue'), '// expected: blue is sky the');
console.log(reverseWords('  hello world  '), '// expected: world hello');
console.log(reverseWords('a good   example'), '// expected: example good a');

// SENIOR NOTES:
// - At 1B+ elements: split/reverse/join on a massive string allocates several
//   full-size intermediate arrays; a streaming approach would tokenize word
//   boundaries in one pass and write to an output buffer in reverse order.
// - Distributed systems: reversing word order across the whole input requires
//   knowing the full token sequence, so distributed processing would need a
//   full shuffle/reduce (like a distributed sort) rather than per-shard reversal.
// - Real-world analog: text normalization stages in search-indexing pipelines
//   and CLI/shell argument re-tokenization utilities.

module.exports = reverseWords;
