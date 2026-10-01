/**
 * Problem: Valid Parentheses
 * Difficulty: Easy
 * Pattern: Stack
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Backend Relevance: Stack-based bracket matching underlies syntax validators for
 *   JSON/XML parsers, template engines, and balanced-tag checks in HTML sanitizers.
 */

function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else {
      if (stack.pop() !== pairs[char]) return false;
    }
  }

  return stack.length === 0;
}

// ---- Tests ----
console.log(isValid('()[]{}'), '// expected: true');
console.log(isValid('(]'), '// expected: false');
console.log(isValid('([)]'), '// expected: false');

// SENIOR NOTES:
// - At 1B+ elements: a stack backed by an array is fine linearly, but pathological
//   deeply-nested input (all opens then all closes) still needs O(n) memory for
//   the stack; a streaming parser would bound nesting depth to avoid stack overflow.
// - Distributed systems: bracket validation doesn't parallelize trivially because
//   state (open-bracket stack) must carry across the whole stream; distributed
//   XML/JSON validators typically shard by document, not by byte range.
// - Real-world analog: JSON/XML parsers, code linters checking balanced braces,
//   and HTML sanitizers verifying balanced tags before rendering.

module.exports = isValid;
