/**
 * Problem: Course Schedule
 * Difficulty: Medium
 * Pattern: Graph Cycle Detection (Kahn's topological sort via BFS)
 * Time Complexity: O(V + E)
 * Space Complexity: O(V + E) for the adjacency list and in-degree array
 * Backend Relevance: Detecting a cycle in prerequisites is the same check used
 *   to validate a build/task dependency graph (e.g. Makefile, CI job DAG) before
 *   scheduling it.
 */

function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let visited = 0;
  while (queue.length > 0) {
    const course = queue.shift();
    visited++;
    for (const next of adj[course]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }

  return visited === numCourses; // if not all visited, a cycle blocked some courses
}

// ---- Tests ----
console.log(canFinish(2, [[1, 0]]), '// expected: true');
console.log(canFinish(2, [[1, 0], [0, 1]]), '// expected: false');
console.log(canFinish(4, [[1, 0], [2, 0], [3, 1], [3, 2]]), '// expected: true');
console.log(canFinish(1, []), '// expected: true');

// SENIOR NOTES:
// - At 1B+ elements: building an adjacency list for a billion-edge dependency
//   graph in memory is infeasible; Kahn's algorithm can be adapted to stream
//   edges and maintain in-degree counts in an external key-value store.
// - Distributed systems: distributed topological sort (e.g. Pregel/BSP-style)
//   processes in-degree updates in rounds across worker nodes, only advancing a
//   "frontier" of zero-in-degree nodes each superstep.
// - Real-world analog: CI/CD pipeline stage ordering, database migration
//   dependency resolution, and package-manager install-order resolution (npm,
//   pip) all reduce to cycle detection + topological sort.

module.exports = canFinish;
