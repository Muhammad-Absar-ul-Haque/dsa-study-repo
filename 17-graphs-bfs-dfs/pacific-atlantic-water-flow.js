/**
 * Problem: Pacific Atlantic Water Flow
 * Difficulty: Medium
 * Pattern: Graph Multi-Source BFS/DFS (flood fill from the borders, reversed)
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(rows * cols) for the two visited sets + BFS queues
 * Backend Relevance: Multi-source reachability from a set of "entry points" is
 *   the same pattern as computing which servers can reach which datacenters
 *   given directional network links.
 */

function pacificAtlantic(heights) {
  const rows = heights.length;
  if (rows === 0) return [];
  const cols = heights[0].length;

  const pacific = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const atlantic = Array.from({ length: rows }, () => new Array(cols).fill(false));

  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  // Flood-fill "uphill" from every cell in `starts`: water flows downhill in the
  // real problem, so we walk backwards (only moving to cells with height >= current).
  const bfs = (starts, visited) => {
    const queue = [...starts];
    for (const [r, c] of starts) visited[r][c] = true;

    while (queue.length > 0) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr >= 0 && nr < rows &&
          nc >= 0 && nc < cols &&
          !visited[nr][nc] &&
          heights[nr][nc] >= heights[r][c]
        ) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
  };

  const pacificStarts = [];
  const atlanticStarts = [];
  for (let r = 0; r < rows; r++) {
    pacificStarts.push([r, 0]);
    atlanticStarts.push([r, cols - 1]);
  }
  for (let c = 0; c < cols; c++) {
    pacificStarts.push([0, c]);
    atlanticStarts.push([rows - 1, c]);
  }

  bfs(pacificStarts, pacific);
  bfs(atlanticStarts, atlantic);

  const result = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pacific[r][c] && atlantic[r][c]) result.push([r, c]);
    }
  }
  return result;
}

// ---- Tests ----
const heights = [
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4],
];
const result = pacificAtlantic(heights)
  .map(([r, c]) => `${r},${c}`)
  .sort();
const expected = [
  [0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0],
]
  .map(([r, c]) => `${r},${c}`)
  .sort();
console.log(JSON.stringify(result), '// expected:', JSON.stringify(expected));
console.log(pacificAtlantic([[1]]), '// expected: [ [ 0, 0 ] ] (single cell touches both oceans)');

// SENIOR NOTES:
// - At 1B+ elements: a full rows*cols visited matrix for a billion-cell terrain
//   grid won't fit in memory; real elevation-flow systems tile the grid and
//   process it in chunks with halo/overlap regions, similar to distributed
//   raster GIS processing.
// - Distributed systems: multi-source BFS naturally parallelizes — each worker
//   floods its tile from border-adjacent cells and merges frontier cells across
//   tile boundaries, akin to Pregel-style bulk-synchronous graph processing.
// - Real-world analog: terrain/hydrology flow modeling (GIS), and more broadly
//   any "which sources can reach which sinks" reachability query, like which
//   load balancers can route to which backend pools.

module.exports = pacificAtlantic;
