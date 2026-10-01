/**
 * Problem: Range Addition
 * Difficulty: Medium
 * Pattern: Difference Array (Prefix Sum trick)
 * Time Complexity: O(n + m) for n updates and array length m
 * Space Complexity: O(m)
 * Backend Relevance: Applying m bulk range increments efficiently, like batch
 *   adjusting inventory/quota counters across ID ranges without per-element writes.
 */

function getModifiedArray(length, updates) {
  const diff = new Array(length + 1).fill(0);

  for (const [start, end, inc] of updates) {
    diff[start] += inc;
    diff[end + 1] -= inc; // cancel the increment right after the range ends
  }

  // reconstruct the actual array via running prefix sum over the diff array
  const result = new Array(length).fill(0);
  let running = 0;
  for (let i = 0; i < length; i++) {
    running += diff[i];
    result[i] = running;
  }
  return result;
}

// ---- Tests ----
console.log(
  getModifiedArray(5, [[1, 3, 2], [2, 4, 3], [0, 2, -2]]),
  '// expected: [-2, 0, 3, 5, 3]'
);
console.log(getModifiedArray(3, [[0, 2, 5]]), '// expected: [5, 5, 5]');
console.log(getModifiedArray(4, []), '// expected: [0, 0, 0, 0]');

// SENIOR NOTES:
// - At 1B+ elements: difference array turns m range updates of O(length) each
//   into O(m + length) total — critical when length is huge and updates sparse.
// - Distributed systems: each shard applies only the diff entries touching its
//   range, plus a running "carry" total inherited from the previous shard's
//   final prefix sum — a clean parallel-scan decomposition.
// - Real-world analog: applying bulk discount/quota adjustments across an ID
//   range (e.g. "add 10 bonus points to users 1000-2000") without a per-row update.

module.exports = getModifiedArray;
