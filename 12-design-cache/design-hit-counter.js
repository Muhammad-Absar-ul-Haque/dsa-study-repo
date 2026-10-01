/**
 * Problem: Design Hit Counter
 * Difficulty: Medium
 * Pattern: Design / Sliding Window (queue-based)
 * Time Complexity: O(1) amortized hit, O(w) worst case getHits where w = hits evicted
 * Space Complexity: O(w) hits within the 300s window
 * Backend Relevance: Direct analog to sliding-window request counters used in rate limiting and traffic dashboards.
 */

class HitCounter {
  constructor() {
    this.hits = []; // FIFO queue of timestamps, oldest first
  }

  hit(timestamp) {
    this.hits.push(timestamp);
  }

  getHits(timestamp) {
    while (this.hits.length > 0 && this.hits[0] <= timestamp - 300) {
      this.hits.shift();
    }
    return this.hits.length;
  }
}

// ---- Tests ----
const counter = new HitCounter();
counter.hit(1);
counter.hit(2);
counter.hit(3);
console.log(counter.getHits(4), '// expected:', 3);
counter.hit(300);
console.log(counter.getHits(300), '// expected:', 4);
console.log(counter.getHits(301), '// expected:', 3); // hit at t=1 falls outside (301-300=1, 1<=1 evicted)

// SENIOR NOTES:
// - At 1B+ elements: an unbounded array of raw timestamps is wasteful; shift() is O(n) amortized here but a circular buffer or bucketed counters (per-second buckets) scale far better under heavy load.
// - Distributed systems: a global hit counter across many servers needs a shared store (Redis INCR with TTL, or sliding-window counters in a rate-limiter service) instead of per-instance memory.
// - Real-world analog: API gateway request-rate dashboards, sliding-window rate limiters (e.g. Kong, Envoy rate limit service).

module.exports = HitCounter;
