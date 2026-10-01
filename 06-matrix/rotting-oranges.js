/**
 * Problem: Rotting Oranges (multi-source BFS)
 * Difficulty: Medium
 * Pattern: Multi-source BFS (level-order propagation)
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n) worst case (queue)
 * Backend Relevance: Multi-source BFS models simultaneous propagation from many origin
 * points at once, exactly like simultaneous cache-invalidation or infection/outage spread.
 */

function orangesRotting(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let queue = [];
  let freshCount = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) freshCount++;
    }
  }

  if (freshCount === 0) return 0;

  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let minutes = 0;

  while (queue.length > 0 && freshCount > 0) {
    const nextQueue = [];
    for (const [row, col] of queue) {
      for (const [dr, dc] of directions) {
        const nr = row + dr;
        const nc = col + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          freshCount--;
          nextQueue.push([nr, nc]);
        }
      }
    }
    queue = nextQueue;
    if (queue.length > 0) minutes++;
  }

  return freshCount === 0 ? minutes : -1;
}

// ---- Tests ----
console.log(
  orangesRotting([
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1],
  ]),
  '// expected:',
  4
);
console.log(
  orangesRotting([
    [2, 1, 1],
    [0, 1, 1],
    [1, 0, 1],
  ]),
  '// expected:',
  -1
);
console.log(orangesRotting([[0, 2]]), '// expected:', 0);

// SENIOR NOTES:
// - At 1B+ elements: multi-source BFS is level-order and bounded by grid size, but the
//   nextQueue array allocation each level should be pooled/reused at extreme scale.
// - Distributed systems: simultaneous spread from many origins mirrors epidemic/gossip
//   protocols where propagation across shard boundaries needs synchronized "round" ticks.
// - Real-world analog: simulating outage/infection spread through a dependency graph,
//   or simultaneous multi-key cache invalidation waves across a distributed cache.

module.exports = orangesRotting;
