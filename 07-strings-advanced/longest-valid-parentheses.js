/**
 * Problem: Longest Valid Parentheses
 * Difficulty: Hard
 * Pattern: Stack of indices
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Backend Relevance: Tracking the longest well-formed span with a stack of indices
 *   generalizes to finding the longest valid transaction/session window in an
 *   event log where opens/closes must balance.
 */

function longestValidParentheses(s) {
  let maxLen = 0;
  const stack = [-1]; // base index for length calculation

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        stack.push(i);
      } else {
        maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
      }
    }
  }

  return maxLen;
}

// ---- Tests ----
console.log(longestValidParentheses('(()'), '// expected: 2');
console.log(longestValidParentheses(')()())'), '// expected: 4');
console.log(longestValidParentheses(''), '// expected: 0');

// SENIOR NOTES:
// - At 1B+ elements: still O(n) time/space; the stack could grow to O(n) for
//   pathological all-'(' input, so a streaming variant would need bounded state
//   (e.g. two-pass left-to-right/right-to-left counters) for O(1) extra space.
// - Distributed systems: like basic bracket validation, the running stack state
//   must be threaded across the whole stream, so sharding requires carrying
//   boundary state (open-bracket depth) between adjacent shards.
// - Real-world analog: session/transaction validators that must find the longest
//   properly nested (begin/commit) span in a log despite noise/errors.

module.exports = longestValidParentheses;
