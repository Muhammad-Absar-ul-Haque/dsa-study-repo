/**
 * Problem: Multiply Strings (as strings, no BigInt)
 * Difficulty: Medium
 * Pattern: Manual digit-by-digit multiplication (elementary school algorithm)
 * Time Complexity: O(m * n), m and n are digit counts of the two numbers
 * Space Complexity: O(m + n)
 * Backend Relevance: Arbitrary-precision arithmetic without native big-int support
 *   is exactly what financial systems and crypto libraries need when they can't
 *   trust floating point (or a runtime lacks native bignum) for money/ledger math.
 */

function multiply(num1, num2) {
  if (num1 === '0' || num2 === '0') return '0';

  const m = num1.length;
  const n = num2.length;
  const result = new Array(m + n).fill(0);

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const d1 = num1.charCodeAt(i) - 48;
      const d2 = num2.charCodeAt(j) - 48;
      const product = d1 * d2;

      const lowPos = i + j + 1;
      const highPos = i + j;

      const sum = product + result[lowPos];
      result[lowPos] = sum % 10;
      result[highPos] += Math.floor(sum / 10);
    }
  }

  let str = result.join('');
  str = str.replace(/^0+/, '');
  return str === '' ? '0' : str;
}

// ---- Tests ----
console.log(multiply('2', '3'), '// expected: 6');
console.log(multiply('123', '456'), '// expected: 56088');
console.log(multiply('0', '52'), '// expected: 0');

// SENIOR NOTES:
// - At 1B+ elements: O(m*n) schoolbook multiplication is too slow for huge numbers;
//   real bignum libraries switch to Karatsuba or FFT-based multiplication for
//   large digit counts (this is what GMP/OpenSSL bignum do).
// - Distributed systems: splitting a huge number's digits across shards and
//   multiplying/carrying across boundaries mirrors distributed big-integer math
//   in cryptographic computations (e.g. RSA key generation at scale).
// - Real-world analog: arbitrary-precision decimal arithmetic in financial ledgers,
//   and bignum arithmetic in cryptography (RSA, Diffie-Hellman).

module.exports = multiply;
