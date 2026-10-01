/**
 * Problem: Task Scheduler
 * Difficulty: Medium
 * Pattern: Heap / Priority Queue (max-heap of frequencies + cooldown queue)
 * Time Complexity: O(t log 26) which is effectively O(t), t = number of tasks
 * Space Complexity: O(26) for the frequency map/heap, O(n) for cooldown queue
 * Backend Relevance: This is literally a CPU/job scheduler with an enforced
 *   per-task-type cooldown, e.g. rate-limiting retries of the same job type.
 */

const { MaxHeap } = require('../_helpers/heap');

function leastInterval(tasks, n) {
  const freq = new Map();
  for (const t of tasks) freq.set(t, (freq.get(t) || 0) + 1);

  const heap = new MaxHeap();
  for (const count of freq.values()) heap.push(count);

  let time = 0;
  const cooldown = []; // [remainingCount, availableAtTime]

  while (!heap.isEmpty() || cooldown.length > 0) {
    time++;

    if (!heap.isEmpty()) {
      const count = heap.pop() - 1;
      if (count > 0) cooldown.push([count, time + n]);
    }

    // if the earliest cooling task is ready, put it back in the pool
    if (cooldown.length > 0 && cooldown[0][1] === time) {
      const [count] = cooldown.shift();
      heap.push(count);
    }
  }

  return time;
}

// ---- Tests ----
console.log(leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 2), '// expected: 8');
console.log(leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 0), '// expected: 6');
console.log(
  leastInterval(['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'], 2),
  '// expected: 16'
);

// SENIOR NOTES:
// - At 1B+ elements: task alphabet is bounded (26 letters here) which keeps the
//   heap tiny; a real job scheduler must handle unbounded job types, so the
//   heap size scales with distinct job types, not total job count.
// - Distributed systems: a distributed task scheduler (e.g. Kubernetes CronJob
//   controller, or a rate-limited retry queue) enforces the same "same task
//   type needs a cooldown" constraint per worker pool, often via a delayed
//   queue (Redis ZSET with a ready-at timestamp) instead of an in-memory heap.
// - Real-world analog: CPU scheduling with anti-starvation cooldowns, or
//   rate-limited retry queues that prevent hammering the same downstream
//   service repeatedly within a cooldown window.

module.exports = leastInterval;
