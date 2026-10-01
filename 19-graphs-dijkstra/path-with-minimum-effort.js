/**
 * Problem: Path With Minimum Effort
 * Difficulty: Medium
 * Pattern: Dijkstra's Algorithm (minimize the maximum edge weight along a path,
 *   min-heap priority queue)
 * Time Complexity: O(rows * cols * log(rows * cols))
 * Space Complexity: O(rows * cols)
 * Backend Relevance: "Minimize the worst single hop" instead of "minimize total
 *   cost" is the same objective as choosing a route that avoids any single
 *   high-latency/low-bandwidth link, even if the total path is longer.
 */

const { MinHeap } = require('../_helpers/heap');

function minimumEffortPath(heights) {
  const rows = heights.length;
  const cols = heights[0].length;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  const effort = Array.from({ length: rows }, () => new Array(cols).fill(Infinity));
  effort[0][0] = 0;

  // State: [effortSoFar, row, col]. effortSoFar = max absolute height diff
  // encountered along the path taken to reach (row, col).
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  heap.push([0, 0, 0]);

  while (!heap.isEmpty()) {
    const [e, r, c] = heap.pop();
    if (r === rows - 1 && c === cols - 1) return e;
    if (e > effort[r][c]) continue; // stale entry, a better path already recorded

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

      const stepEffort = Math.abs(heights[nr][nc] - heights[r][c]);
      const candidateEffort = Math.max(e, stepEffort);
      if (candidateEffort < effort[nr][nc]) {
        effort[nr][nc] = candidateEffort;
        heap.push([candidateEffort, nr, nc]);
      }
    }
  }

  return effort[rows - 1][cols - 1];
}

// ---- Tests ----
console.log(
  minimumEffortPath([
    [1, 2, 2],
    [3, 8, 2],
    [5, 3, 5],
  ]),
  '// expected: 2'
);
console.log(
  minimumEffortPath([
    [1, 2, 3],
    [3, 8, 4],
    [5, 3, 5],
  ]),
  '// expected: 1'
);
console.log(
  minimumEffortPath([
    [1, 2, 1, 1, 1],
    [1, 2, 1, 2, 1],
    [1, 2, 1, 2, 1],
    [1, 2, 1, 2, 1],
    [1, 1, 1, 2, 1],
  ]),
  '// expected: 0'
);

// SENIOR NOTES:
// - At 1B+ elements: a billion-cell grid can't hold a dense effort matrix in
//   memory; real terrain/routing systems tile the map and run localized
//   Dijkstra per tile, stitching boundary results (similar to hierarchical
//   pathfinding in large game worlds).
// - Distributed systems: minimax-path Dijkstra parallelizes like standard
//   Dijkstra — frontier expansion can be distributed across workers with a
//   shared priority structure, though contention on the global min makes true
//   distributed Dijkstra rare in practice (Delta-stepping is the common
//   parallel relaxation instead).
// - Real-world analog: choosing a network path that avoids any single
//   low-bandwidth/high-latency hop (min-max routing), and hiking-trail routing
//   that minimizes the steepest single grade rather than total elevation gain.

module.exports = minimumEffortPath;
