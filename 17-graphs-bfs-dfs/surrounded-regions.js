/**
 * Problem: Surrounded Regions
 * Difficulty: Medium
 * Pattern: Graph DFS/BFS (mark border-connected components, flip the rest)
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(rows * cols) worst case for the DFS stack/BFS queue
 * Backend Relevance: "Flip everything not reachable from a safe boundary" is the
 *   same logic used to garbage-collect unreachable objects or quarantine nodes
 *   not connected to a trusted root in a network.
 */

// Mutates `board` in place, capturing every 'O' region that is NOT connected to
// the border, and returns the board for convenient testing.
function solve(board) {
  const rows = board.length;
  if (rows === 0) return board;
  const cols = board[0].length;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  const markSafe = (r, c) => {
    const stack = [[r, c]];
    board[r][c] = 'S'; // Safe: connected to a border 'O'
    while (stack.length > 0) {
      const [cr, cc] = stack.pop();
      for (const [dr, dc] of dirs) {
        const nr = cr + dr;
        const nc = cc + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === 'O') {
          board[nr][nc] = 'S';
          stack.push([nr, nc]);
        }
      }
    }
  };

  for (let r = 0; r < rows; r++) {
    if (board[r][0] === 'O') markSafe(r, 0);
    if (board[r][cols - 1] === 'O') markSafe(r, cols - 1);
  }
  for (let c = 0; c < cols; c++) {
    if (board[0][c] === 'O') markSafe(0, c);
    if (board[rows - 1][c] === 'O') markSafe(rows - 1, c);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 'O') board[r][c] = 'X'; // surrounded -> captured
      else if (board[r][c] === 'S') board[r][c] = 'O'; // safe -> restore
    }
  }

  return board;
}

// ---- Tests ----
const board1 = [
  ['X', 'X', 'X', 'X'],
  ['X', 'O', 'O', 'X'],
  ['X', 'X', 'O', 'X'],
  ['X', 'O', 'X', 'X'],
];
console.log(
  JSON.stringify(solve(board1)),
  '// expected:',
  JSON.stringify([
    ['X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X'],
    ['X', 'O', 'X', 'X'],
  ])
);

const board2 = [['X']];
console.log(JSON.stringify(solve(board2)), '// expected:', JSON.stringify([['X']]));

const board3 = [['O', 'O'], ['O', 'O']];
console.log(
  JSON.stringify(solve(board3)),
  '// expected:',
  JSON.stringify([['O', 'O'], ['O', 'O']])
);

// SENIOR NOTES:
// - At 1B+ elements: a naive DFS on a billion-cell board risks stack overflow;
//   production implementations use an explicit stack (as done here) or an
//   iterative BFS, and process the grid in tiles that fit in memory.
// - Distributed systems: connected-component-from-border detection parallelizes
//   by tiling the grid, flood-filling each tile locally, then merging component
//   labels across tile boundaries — the same union step used in distributed
//   connected-components algorithms (e.g. on Spark/GraphX).
// - Real-world analog: garbage collection (mark-and-sweep: anything unreachable
//   from GC roots gets collected) and network reachability audits (quarantine
//   hosts not reachable from a trusted gateway).

module.exports = solve;
