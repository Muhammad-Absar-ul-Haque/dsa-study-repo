/**
 * Problem: Word Pattern
 * Difficulty: Easy
 * Pattern: Two-way hashmap character-to-word mapping
 * Time Complexity: O(n), n = number of words
 * Space Complexity: O(n)
 * Backend Relevance: Same bijective-mapping check as isomorphic strings but at
 *   word granularity — validates that a template pattern consistently maps to
 *   tokens, similar to verifying log-format placeholders map 1:1 to values.
 */

function wordPattern(pattern, s) {
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;

  const charToWord = new Map();
  const wordToChar = new Map();

  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    const w = words[i];

    if (charToWord.has(c) && charToWord.get(c) !== w) return false;
    if (wordToChar.has(w) && wordToChar.get(w) !== c) return false;

    charToWord.set(c, w);
    wordToChar.set(w, c);
  }

  return true;
}

// ---- Tests ----
console.log(wordPattern('abba', 'dog cat cat dog'), '// expected: true');
console.log(wordPattern('abba', 'dog cat cat fish'), '// expected: false');
console.log(wordPattern('aaaa', 'dog cat cat dog'), '// expected: false');

// SENIOR NOTES:
// - At 1B+ elements: splitting a giant string by spaces materializes a huge array;
//   a streaming tokenizer with a two-way map would avoid loading the whole string.
// - Distributed systems: same bijection-merge concern as isomorphic strings —
//   validating a global pattern-to-token mapping across sharded log chunks
//   requires reconciling conflicting mappings at merge boundaries.
// - Real-world analog: log-format/template validation (printf-style placeholders
//   mapping consistently to argument types) and config templating engines.

module.exports = wordPattern;
