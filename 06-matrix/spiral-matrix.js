/**
 * Problem: Spiral Matrix
 * Difficulty: Medium
 * Pattern: Boundary Shrinking (4-pointer traversal)
 * Time Complexity: O(m * n)
 * Space Complexity: O(1) extra (excluding output)
 * Backend Relevance: Boundary-shrinking traversal is a pattern reused whenever you must
 * visit a 2D grid/report in a specific deterministic order (e.g. serpentine batch export).
 */

function spiralOrder(matrix) {
  if (!matrix || matrix.length === 0) return [];

  const result = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let col = left; col <= right; col++) result.push(matrix[top][col]);
    top++;

    for (let row = top; row <= bottom; row++) result.push(matrix[row][right]);
    right--;

    if (top <= bottom) {
      for (let col = right; col >= left; col--) result.push(matrix[bottom][col]);
      bottom--;
    }

    if (left <= right) {
      for (let row = bottom; row >= top; row--) result.push(matrix[row][left]);
      left++;
    }
  }

  return result;
}

// ---- Tests ----
console.log(
  JSON.stringify(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]])),
  '// expected:',
  '[1,2,3,6,9,8,7,4,5]'
);
console.log(
  JSON.stringify(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])),
  '// expected:',
  '[1,2,3,4,8,12,11,10,9,5,6,7]'
);
console.log(JSON.stringify(spiralOrder([[1]])), '// expected:', '[1]');

// SENIOR NOTES:
// - At 1B+ elements (huge grid): O(1) extra memory means it scales to disk-backed
//   grids fine, but random row/column access pattern is cache-unfriendly at scale.
// - Distributed systems: spiral order is inherently sequential/stateful, so sharding
//   a grid for spiral traversal requires a coordinator to stitch shard boundaries in order.
// - Real-world analog: serpentine/raster scan order used in image processing pipelines,
//   printer head paths, and grid-based UI export/rendering order.

module.exports = spiralOrder;
