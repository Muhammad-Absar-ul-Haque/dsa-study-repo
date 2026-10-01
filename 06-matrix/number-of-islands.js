/**
 * Problem: Number of Islands (BFS/DFS on grid)
 * Difficulty: Medium
 * Pattern: Grid Connected Components (BFS/DFS + visited marking)
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n) worst case (queue/recursion + visited)
 * Backend Relevance: Connected-component counting on a grid is the same core algorithm
 * used to find clusters of related nodes in network topology or connected server groups.
 */

function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;

  function bfs(startRow, startCol) {
    const queue = [[startRow, startCol]];
    grid[startRow][startCol] = '0'; // mark visited
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    while (queue.length > 0) {
      const [row, col] = queue.shift();
      for (const [dr, dc] of directions) {
        const nr = row + dr;
        const nc = col + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
          grid[nr][nc] = '0';
          queue.push([nr, nc]);
        }
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        islands++;
        bfs(r, c);
      }
    }
  }

  return islands;
}

// ---- Tests ----
console.log(
  numIslands([
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
  ]),
  '// expected:',
  1
);
console.log(
  numIslands([
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1'],
  ]),
  '// expected:',
  3
);
console.log(numIslands([['0']]), '// expected:', 0);

// SENIOR NOTES:
// - At 1B+ elements: BFS queue and visited marks scale with island size; on huge grids
//   consider Union-Find with path compression for streaming/incremental updates.
// - Distributed systems: connected components spanning shard boundaries need a
//   distributed union-find or a boundary-stitching pass across adjacent grid partitions.
// - Real-world analog: detecting clusters of connected servers/services in a network
//   graph, or contiguous region detection in geospatial/image segmentation pipelines.

module.exports = numIslands;
