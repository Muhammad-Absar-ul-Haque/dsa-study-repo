/**
 * Problem: Word Search (backtracking on grid)
 * Difficulty: Medium
 * Pattern: Backtracking / DFS on Grid
 * Time Complexity: O(m * n * 4^L) where L is word length
 * Space Complexity: O(L) recursion stack
 * Backend Relevance: Constrained path-search with backtracking mirrors dependency-graph
 * traversal with rollback, e.g. exploring config/state spaces where a path can dead-end.
 */

function exist(board, word) {
  if (!board || board.length === 0) return false;
  const rows = board.length;
  const cols = board[0].length;

  function dfs(row, col, index) {
    if (index === word.length) return true;
    if (row < 0 || row >= rows || col < 0 || col >= cols) return false;
    if (board[row][col] !== word[index]) return false;

    const original = board[row][col];
    board[row][col] = '#'; // mark visited

    const found =
      dfs(row + 1, col, index + 1) ||
      dfs(row - 1, col, index + 1) ||
      dfs(row, col + 1, index + 1) ||
      dfs(row, col - 1, index + 1);

    board[row][col] = original; // backtrack
    return found;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }

  return false;
}

// ---- Tests ----
console.log(
  exist([['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'ABCCED'),
  '// expected:',
  true
);
console.log(
  exist([['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'SEE'),
  '// expected:',
  true
);
console.log(
  exist([['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'ABCB'),
  '// expected:',
  false
);

// SENIOR NOTES:
// - At 1B+ elements: exponential branching (4^L) makes this infeasible on huge grids
//   without pruning; letter-frequency pre-checks and trie-based multi-word search help.
// - Distributed systems: independent starting cells can be searched in parallel across
//   workers, but the in-place "mark visited" trick doesn't work with shared mutable state.
// - Real-world analog: pathfinding/constraint search in puzzle solvers, or DFS-with-rollback
//   used in dependency resolution and maze/graph traversal with dead-end backtracking.

module.exports = exist;
