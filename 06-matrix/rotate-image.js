/**
 * Problem: Rotate Image (in-place 90deg)
 * Difficulty: Medium
 * Pattern: Transpose + Reverse (in-place matrix transform)
 * Time Complexity: O(n^2)
 * Space Complexity: O(1) extra (in-place)
 * Backend Relevance: In-place transforms without allocating a second buffer matter
 * for memory-constrained image/tensor processing pipelines operating on large frames.
 */

function rotate(matrix) {
  const n = matrix.length;

  // Transpose in place
  for (let row = 0; row < n; row++) {
    for (let col = row + 1; col < n; col++) {
      [matrix[row][col], matrix[col][row]] = [matrix[col][row], matrix[row][col]];
    }
  }

  // Reverse each row
  for (let row = 0; row < n; row++) {
    matrix[row].reverse();
  }

  return matrix;
}

// ---- Tests ----
console.log(
  JSON.stringify(rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]])),
  '// expected:',
  '[[7,4,1],[8,5,2],[9,6,3]]'
);
console.log(
  JSON.stringify(rotate([[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]])),
  '// expected:',
  '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]'
);
console.log(JSON.stringify(rotate([[1]])), '// expected:', '[[1]]');

// SENIOR NOTES:
// - At 1B+ elements: in-place O(1) extra space is critical when the matrix is a
//   large image/tensor that can't be duplicated in memory during transformation.
// - Distributed systems: rotating a tiled/sharded matrix requires both transposing
//   tile contents AND swapping tile positions across shard/worker boundaries.
// - Real-world analog: image rotation in a media processing service, or reorienting
//   sensor/tensor data in-place on memory-constrained edge devices.

module.exports = rotate;
