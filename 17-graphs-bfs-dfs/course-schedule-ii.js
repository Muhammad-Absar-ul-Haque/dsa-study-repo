/**
 * Problem: Course Schedule II
 * Difficulty: Medium
 * Pattern: Graph Topological Sort (Kahn's algorithm via BFS)
 * Time Complexity: O(V + E)
 * Space Complexity: O(V + E)
 * Backend Relevance: Producing a valid execution order for a dependency graph —
 *   exactly what a build system or task scheduler needs, not just a yes/no.
 */

function findOrder(numCourses, prerequisites) {
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

  const order = [];
  while (queue.length > 0) {
    const course = queue.shift();
    order.push(course);
    for (const next of adj[course]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }

  return order.length === numCourses ? order : [];
}

// ---- Tests ----
console.log(findOrder(2, [[1, 0]]), '// expected: [ 0, 1 ]');
console.log(findOrder(2, [[1, 0], [0, 1]]), '// expected: []');
console.log(
  findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]]),
  '// expected: [ 0, 1, 2, 3 ] (or [ 0, 2, 1, 3 ] — any valid topo order)'
);
console.log(findOrder(1, []), '// expected: [ 0 ]');

// SENIOR NOTES:
// - At 1B+ elements: emitting the full order for a billion-node DAG at once
//   isn't practical; real schedulers stream out the "ready" frontier as it
//   becomes available rather than buffering the complete order in memory.
// - Distributed systems: distributed job schedulers (e.g. Airflow, Dagster) use
//   this exact in-degree-driven readiness model, dispatching each task to a
//   worker as soon as its dependencies complete rather than precomputing a
//   single global order.
// - Real-world analog: database schema migration ordering, npm/pip install
//   order, and spreadsheet formula recalculation order (topological on the
//   cell-dependency graph).

module.exports = findOrder;
