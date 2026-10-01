/**
 * Problem: Letter Combinations of a Phone Number
 * Difficulty: Medium
 * Pattern: Backtracking (cartesian product over digit->letters mapping)
 * Time Complexity: O(4^n * n) where n = digits.length (up to 4 letters/digit)
 * Space Complexity: O(4^n * n) for output, O(n) recursion depth
 * Backend Relevance: Enumerating all combinations from a mapping is the same
 * shape as generating all possible values for a set of enum-typed config
 * fields, or expanding a template with multiple placeholder options.
 */

function letterCombinations(digits) {
  if (!digits.length) return [];

  const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  };

  const result = [];

  function backtrack(index, path) {
    if (index === digits.length) {
      result.push(path);
      return;
    }
    const letters = map[digits[index]];
    for (const ch of letters) {
      backtrack(index + 1, path + ch);
    }
  }

  backtrack(0, '');
  return result;
}

// ---- Tests ----
console.log(letterCombinations('23'), '// expected:', [
  'ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf',
]);
console.log(letterCombinations('').length, '// expected:', 0);
console.log(letterCombinations('2').length, '// expected:', 3);

// SENIOR NOTES:
// - At 1B+ elements: with digits like '7'/'9' contributing 4 options each,
//   ~15 digits already exceeds a billion combinations — full enumeration
//   only works for short inputs; longer inputs need lazy generators/streaming
//   instead of materializing the whole cartesian product.
// - Distributed systems: the cartesian product over independent digit
//   mappings splits cleanly across workers by fixing a prefix digit's
//   choice per worker, each generating the remaining suffix combinations.
// - Real-world analog: expanding all possible values of a multi-select
//   config template (e.g. generating every combination of environment x
//   region x feature-flag state) for exhaustive integration testing.

module.exports = letterCombinations;
