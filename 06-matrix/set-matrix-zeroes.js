/**
 * Problem: Set Matrix Zeroes
 * Difficulty: Medium
 * Pattern: In-place Marking (use first row/col as marker storage)
 * Time Complexity: O(m * n)
 * Space Complexity: O(1) extra (in-place)
 * Backend Relevance: Using existing storage as marker flags instead of allocating new
 * structures mirrors how you propagate "invalidate this row/column" flags cheaply in caches.
 */

function setZeroes(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let firstRowHasZero = false;
  let firstColHasZero = false;

  for (let r = 0; r < rows; r++) {
    if (matrix[r][0] === 0) firstColHasZero = true;
  }
  for (let c = 0; c < cols; c++) {
    if (matrix[0][c] === 0) firstRowHasZero = true;
  }

  // Use first row/col as marker storage for the rest of the matrix
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (matrix[r][c] === 0) {
        matrix[r][0] = 0;
        matrix[0][c] = 0;
      }
    }
  }

  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (matrix[r][0] === 0 || matrix[0][c] === 0) {
        matrix[r][c] = 0;
      }
    }
  }

  if (firstColHasZero) {
    for (let r = 0; r < rows; r++) matrix[r][0] = 0;
  }
  if (firstRowHasZero) {
    for (let c = 0; c < cols; c++) matrix[0][c] = 0;
  }

  return matrix;
}

// ---- Tests ----
console.log(
  JSON.stringify(setZeroes([[1, 1, 1], [1, 0, 1], [1, 1, 1]])),
  '// expected:',
  '[[1,0,1],[0,0,0],[1,0,1]]'
);
console.log(
  JSON.stringify(setZeroes([[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]])),
  '// expected:',
  '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]'
);
console.log(JSON.stringify(setZeroes([[1]])), '// expected:', '[[1]]');

// SENIOR NOTES:
// - At 1B+ elements: O(1) extra space (reusing first row/col) avoids a second m*n
//   allocation, critical when the matrix already saturates available memory.
// - Distributed systems: zero-propagation across an entire row/column requires
//   cross-shard messaging if rows/cols are partitioned across different machines.
// - Real-world analog: cache/index invalidation where marking one dirty row/column
//   must cascade to clear all dependent cells (e.g. spreadsheet recalculation).

module.exports = setZeroes;
