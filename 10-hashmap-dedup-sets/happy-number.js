/**
 * Problem: Happy Number
 * Difficulty: Easy
 * Pattern: Hashset Cycle Detection
 * Time Complexity: O(log n) per iteration digit work, bounded number of iterations until cycle/1
 * Space Complexity: O(1) amortized (cycle length is bounded)
 * Backend Relevance: Cycle detection using a visited-set is the same technique used to guard
 *   against infinite loops in retry/backoff chains or state-machine transitions.
 */

function isHappy(n) {
  const seen = new Set();

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = sumOfSquares(n);
  }

  return n === 1;
}

function sumOfSquares(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}

// ---- Tests ----
console.log(isHappy(19), '// expected:', true);
console.log(isHappy(2), '// expected:', false);
console.log(isHappy(1), '// expected:', true);

// SENIOR NOTES:
// - At 1B+ elements: not applicable to a single number, but if checking happiness for a
//   billion numbers, a memoization cache of known happy/unhappy numbers avoids recomputation.
// - Distributed systems: independent per-input, trivially parallelizable — each worker checks
//   a shard of numbers with no shared state needed.
// - Real-world analog: cycle detection in workflow/state-machine engines to prevent a task
//   from looping forever between the same set of states.

module.exports = isHappy;
