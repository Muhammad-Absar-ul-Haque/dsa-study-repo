/**
 * Problem: Game of Life (in-place)
 * Difficulty: Medium
 * Pattern: In-place State Encoding (bit tricks to store old+new state simultaneously)
 * Time Complexity: O(m * n)
 * Space Complexity: O(1) extra (in-place)
 * Backend Relevance: Encoding "old" and "new" state in the same cell without a second
 * buffer mirrors in-place state machine transitions under tight memory budgets.
 */

function gameOfLife(board) {
  const rows = board.length;
  const cols = board[0].length;

  // Encoding: 0 -> 0 (dead->dead), 1 -> 1 (alive->alive),
  //           2 -> dead->alive (was 0, becomes 1), 3 -> alive->dead (was 1, becomes 0)
  function countLiveNeighbors(row, col) {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = row + dr;
        const nc = col + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          if (board[nr][nc] === 1 || board[nr][nc] === 3) count++;
        }
      }
    }
    return count;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const liveNeighbors = countLiveNeighbors(r, c);
      const isAlive = board[r][c] === 1;

      if (isAlive && (liveNeighbors < 2 || liveNeighbors > 3)) {
        board[r][c] = 3; // alive -> dead
      } else if (!isAlive && liveNeighbors === 3) {
        board[r][c] = 2; // dead -> alive
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 2) board[r][c] = 1;
      else if (board[r][c] === 3) board[r][c] = 0;
    }
  }

  return board;
}

// ---- Tests ----
console.log(
  JSON.stringify(
    gameOfLife([
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ])
  ),
  '// expected:',
  '[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]'
);
console.log(
  JSON.stringify(
    gameOfLife([
      [1, 1],
      [1, 0],
    ])
  ),
  '// expected:',
  '[[1,1],[1,1]]'
);
console.log(JSON.stringify(gameOfLife([[0]])), '// expected:', '[[0]]');

// SENIOR NOTES:
// - At 1B+ elements: encoding old/new state in-place avoids a second full grid buffer,
//   critical for cellular-automaton simulations on massive grids.
// - Distributed systems: each cell's next state depends only on its 8 neighbors, so the
//   grid can be tiled across workers with halo/ghost-cell exchange at tile boundaries.
// - Real-world analog: distributed cellular automaton / physics simulations (e.g. fluid
//   or fire spread models) that tile a large grid across compute nodes with edge syncing.

module.exports = gameOfLife;
