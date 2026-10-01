/**
 * Problem: N-Queens
 * Difficulty: Hard
 * Pattern: Backtracking (constraint satisfaction with column/diagonal sets)
 * Time Complexity: O(n!) worst case, heavily pruned in practice via sets
 * Space Complexity: O(n^2) for board output, O(n) for constraint sets
 * Backend Relevance: Constraint-satisfaction backtracking with conflict sets
 * mirrors resource-scheduling problems where each new assignment must avoid
 * conflicts with prior ones (e.g. placing jobs on machines under exclusion
 * constraints, or seat/slot assignment with no-overlap rules).
 */

function solveNQueens(n) {
  const result = [];
  const cols = new Set();
  const diag1 = new Set(); // row - col
  const diag2 = new Set(); // row + col
  const board = []; // board[row] = col of queen in that row

  function backtrack(row) {
    if (row === n) {
      result.push(board.map((c) => '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1)));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);
      board.push(col);

      backtrack(row + 1);

      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
      board.pop();
    }
  }

  backtrack(0);
  return result;
}

// ---- Tests ----
console.log(solveNQueens(4), '// expected:', [
  ['.Q..', '...Q', 'Q...', '..Q.'],
  ['..Q.', 'Q...', '...Q', '.Q..'],
]);
console.log(solveNQueens(4).length, '// expected:', 2);
console.log(solveNQueens(1).length, '// expected:', 1);
console.log(solveNQueens(2).length, '// expected:', 0);

// SENIOR NOTES:
// - At 1B+ elements: n! growth means even n=20 is already computationally
//   heavy; production-scale N-Queens solvers use bitmask-based pruning
//   (bitwise cols/diag1/diag2) for speed and symmetry-breaking to cut the
//   search space roughly in half.
// - Distributed systems: the search tree can be split at the first-row
//   placement across workers (n independent subtrees), each worker solving
//   its subtree and streaming solutions back to a coordinator.
// - Real-world analog: constraint-based resource placement, such as
//   scheduling non-conflicting jobs across time slots and machines, or
//   assigning non-overlapping IP/port ranges under exclusion rules.

module.exports = solveNQueens;
