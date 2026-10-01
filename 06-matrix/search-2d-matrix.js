/**
 * Problem: Search a 2D Matrix
 * Difficulty: Medium
 * Pattern: Binary Search (treat 2D grid as flattened 1D sorted array)
 * Time Complexity: O(log(m * n))
 * Space Complexity: O(1)
 * Backend Relevance: Treating a row-major sorted grid as a virtual 1D array is exactly
 * how database engines binary search sorted, paginated result sets without materializing them.
 */

function searchMatrix(matrix, target) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return false;

  const rows = matrix.length;
  const cols = matrix[0].length;
  let lo = 0;
  let hi = rows * cols - 1;

  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const value = matrix[Math.floor(mid / cols)][mid % cols];

    if (value === target) return true;
    if (value < target) lo = mid + 1;
    else hi = mid - 1;
  }

  return false;
}

// ---- Tests ----
console.log(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3), '// expected:', true);
console.log(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13), '// expected:', false);
console.log(searchMatrix([[1]], 1), '// expected:', true);

// SENIOR NOTES:
// - At 1B+ elements: binary search stays O(log(m*n)) even at massive scale, but the
//   matrix must support O(1) random row/col access (dense array, not linked structure).
// - Distributed systems: a sharded sorted matrix needs a directory/index of shard
//   boundaries first, then binary search within the identified shard.
// - Real-world analog: binary search over sorted, paginated query results or sorted
//   time-partitioned data files (e.g. locating a record by composite sort key).

module.exports = searchMatrix;
