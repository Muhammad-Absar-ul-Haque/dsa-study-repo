/**
 * Problem: Minimum Remove to Make Valid Parentheses
 * Difficulty: Medium
 * Pattern: Stack of indices + set removal
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Backend Relevance: Repairing malformed nested structures by removing the minimum
 *   offending tokens mirrors auto-repair of malformed JSON/config or sanitizing
 *   unbalanced markup before it's rendered or parsed downstream.
 */

function minRemoveToMakeValid(s) {
  const chars = s.split('');
  const stack = [];
  const toRemove = new Set();

  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === '(') {
      stack.push(i);
    } else if (chars[i] === ')') {
      if (stack.length > 0) {
        stack.pop();
      } else {
        toRemove.add(i);
      }
    }
  }

  while (stack.length > 0) {
    toRemove.add(stack.pop());
  }

  let result = '';
  for (let i = 0; i < chars.length; i++) {
    if (!toRemove.has(i)) result += chars[i];
  }

  return result;
}

// ---- Tests ----
console.log(minRemoveToMakeValid('lee(t(c)o)de)'), '// expected: lee(t(c)o)de');
console.log(minRemoveToMakeValid('a)b(c)d'), '// expected: ab(c)d');
console.log(minRemoveToMakeValid('))(('), '// expected: (empty string)');

// SENIOR NOTES:
// - At 1B+ elements: a Set of indices to remove could itself grow huge for
//   pathological input; a streaming rewrite would use a bitset/typed array
//   instead of a JS Set for memory efficiency at scale.
// - Distributed systems: repair requires global knowledge of unmatched opens
//   (only resolvable at end of stream) and unmatched closes (resolvable locally),
//   so a distributed version needs a merge step combining shard-local unmatched
//   opens/closes at boundaries.
// - Real-world analog: auto-repairing malformed JSON/HTML fragments from flaky
//   upstream services, or sanitizing unbalanced markup before rendering.

module.exports = minRemoveToMakeValid;
