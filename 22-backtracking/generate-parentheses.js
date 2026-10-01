/**
 * Problem: Generate Parentheses
 * Difficulty: Medium
 * Pattern: Backtracking (constrained tree pruning)
 * Time Complexity: O(4^n / sqrt(n)) — the nth Catalan number bound
 * Space Complexity: O(4^n / sqrt(n)) for output, O(n) recursion depth
 * Backend Relevance: Generating all valid balanced structures resembles
 * validating/enumerating nested transaction scopes, balanced bracket-style
 * DSL expressions, or valid nesting orders for open/close resource pairs.
 */

function generateParenthesis(n) {
  const result = [];

  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }
    if (open < n) backtrack(current + '(', open + 1, close);
    if (close < open) backtrack(current + ')', open, close + 1);
  }

  backtrack('', 0, 0);
  return result;
}

// ---- Tests ----
console.log(generateParenthesis(3), '// expected:', ['((()))', '(()())', '(())()', '()(())', '()()()']);
console.log(generateParenthesis(1), '// expected:', ['()']);
console.log(generateParenthesis(3).length, '// expected:', 5);

// SENIOR NOTES:
// - At 1B+ elements: Catalan number growth means n around 30 already yields
//   billions of valid strings — infeasible to enumerate fully; would need
//   streaming/generator-based enumeration or sampling rather than materializing.
// - Distributed systems: the search tree can be partitioned by the first k
//   characters across workers, each independently completing valid suffixes,
//   then results streamed/merged.
// - Real-world analog: validating nested transaction/lock scopes (BEGIN/END
//   pairs) or generating test fixtures for a bracket-balanced config DSL.

module.exports = generateParenthesis;
