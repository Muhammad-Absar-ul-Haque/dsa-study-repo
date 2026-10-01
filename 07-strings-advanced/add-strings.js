/**
 * Problem: Add Strings (as strings, no BigInt)
 * Difficulty: Easy
 * Pattern: Two pointers from the end + carry
 * Time Complexity: O(max(m, n))
 * Space Complexity: O(max(m, n))
 * Backend Relevance: Carry-propagating addition without native big-int is the
 *   building block for arbitrary-precision ledger/accounting math where floating
 *   point rounding is unacceptable.
 */

function addStrings(num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let carry = 0;
  const digits = [];

  while (i >= 0 || j >= 0 || carry > 0) {
    const d1 = i >= 0 ? num1.charCodeAt(i) - 48 : 0;
    const d2 = j >= 0 ? num2.charCodeAt(j) - 48 : 0;
    const sum = d1 + d2 + carry;

    digits.push(sum % 10);
    carry = Math.floor(sum / 10);

    i--;
    j--;
  }

  return digits.reverse().join('');
}

// ---- Tests ----
console.log(addStrings('11', '123'), '// expected: 134');
console.log(addStrings('456', '77'), '// expected: 533');
console.log(addStrings('0', '0'), '// expected: 0');

// SENIOR NOTES:
// - At 1B+ elements: still O(n) linear scan, fine at scale; the concern shifts to
//   streaming digits from disk rather than holding both full numbers in memory.
// - Distributed systems: chunk-wise addition with carry propagation across shard
//   boundaries requires a second pass (or carry-lookahead) since a carry can
//   ripple across an entire shard boundary, similar to distributed prefix-sum.
// - Real-world analog: arbitrary-precision decimal addition in financial/accounting
//   systems and checksum/ledger reconciliation pipelines.

module.exports = addStrings;
