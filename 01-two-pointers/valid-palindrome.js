/**
 * Problem: Valid Palindrome
 * Difficulty: Easy
 * Pattern: Two Pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: Input normalization + symmetry check, similar to validating
 *   canonicalized identifiers (e.g. slug/URL normalization) without extra buffers.
 */

function isPalindrome(s) {
  const isAlphaNumeric = (ch) => /[a-z0-9]/i.test(ch);
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    while (left < right && !isAlphaNumeric(s[left])) left++;
    while (left < right && !isAlphaNumeric(s[right])) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

// ---- Tests ----
console.log(isPalindrome('A man, a plan, a canal: Panama'), '// expected: true');
console.log(isPalindrome('race a car'), '// expected: false');
console.log(isPalindrome(' '), '// expected: true');

// SENIOR NOTES:
// - At 1B+ elements: still O(n)/O(1), but regex-per-character calls add overhead;
//   at scale you'd precompute a char-class lookup table instead of regex.test.
// - Distributed systems: symmetric scans are hard to shard since both ends must
//   coordinate; you'd need a central coordinator merging left/right shard cursors.
// - Real-world analog: validating that normalized request/response payloads are
//   mirror-consistent, e.g. checksum symmetry checks in message framing.

module.exports = isPalindrome;
