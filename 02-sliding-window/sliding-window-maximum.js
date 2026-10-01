/**
 * Problem: Sliding Window Maximum
 * Difficulty: Hard
 * Pattern: Sliding Window + Monotonic Deque
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 * Backend Relevance: Computing rolling max latency/load over a fixed window in a
 *   metrics pipeline without recomputing the max from scratch each step.
 */

function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // stores indices, values in decreasing order

  for (let i = 0; i < nums.length; i++) {
    // drop indices that fall out of the window from the front
    if (deque.length && deque[0] <= i - k) {
      deque.shift();
    }
    // maintain decreasing order: pop smaller trailing values, they can never
    // be the max while nums[i] is still in the window
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    deque.push(i);

    if (i >= k - 1) {
      result.push(nums[deque[0]]); // front of deque is always the current max
    }
  }
  return result;
}

// ---- Tests ----
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3), '// expected: [3,3,5,5,6,7]');
console.log(maxSlidingWindow([1], 1), '// expected: [1]');
console.log(maxSlidingWindow([9, 11], 2), '// expected: [11]');

// SENIOR NOTES:
// - At 1B+ elements: each index is pushed/popped from the deque at most once,
//   giving true O(n) amortized time versus O(n*k) for a naive max-per-window.
// - Distributed systems: overlap shards by (k-1) elements so each shard can
//   compute its own deque-based windows independently, then stitch boundary
//   windows together.
// - Real-world analog: real-time "max response time in the last N requests"
//   dashboard widgets, or network jitter/burst detection over a rolling window.

module.exports = maxSlidingWindow;
