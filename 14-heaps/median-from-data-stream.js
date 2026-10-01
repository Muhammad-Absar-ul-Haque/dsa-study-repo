/**
 * Problem: Find Median from Data Stream
 * Difficulty: Hard
 * Pattern: Heap / Priority Queue (two heaps: max-heap of lower half, min-heap of upper half)
 * Time Complexity: O(log n) per insertion (addNum), O(1) for findMedian
 * Space Complexity: O(n) to hold the whole stream across the two heaps
 * Backend Relevance: Computing running percentiles/medians of request latency
 *   without re-sorting on every request — used in real-time SLO dashboards.
 */

const { MinHeap, MaxHeap } = require('../_helpers/heap');

class MedianFinder {
  constructor() {
    this.lower = new MaxHeap(); // holds the smaller half, largest on top
    this.upper = new MinHeap(); // holds the larger half, smallest on top
  }

  addNum(num) {
    if (this.lower.isEmpty() || num <= this.lower.peek()) {
      this.lower.push(num);
    } else {
      this.upper.push(num);
    }

    // rebalance so sizes never differ by more than 1
    if (this.lower.size() > this.upper.size() + 1) {
      this.upper.push(this.lower.pop());
    } else if (this.upper.size() > this.lower.size() + 1) {
      this.lower.push(this.upper.pop());
    }
  }

  findMedian() {
    if (this.lower.size() === this.upper.size()) {
      if (this.lower.isEmpty()) return 0;
      return (this.lower.peek() + this.upper.peek()) / 2;
    }
    return this.lower.size() > this.upper.size() ? this.lower.peek() : this.upper.peek();
  }
}

// ---- Tests ----
const mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.log(mf.findMedian(), '// expected: 1.5');
mf.addNum(3);
console.log(mf.findMedian(), '// expected: 2');

const mf2 = new MedianFinder();
[5, 15, 1, 3].forEach((n) => mf2.addNum(n));
console.log(mf2.findMedian(), '// expected: 4');

// SENIOR NOTES:
// - At 1B+ elements: both heaps grow unbounded with the stream; for true
//   streaming medians at scale you'd use approximate quantile sketches
//   (t-digest, GK, or KLL) that trade exactness for bounded memory.
// - Distributed systems: exact medians don't merge trivially across shards;
//   distributed systems typically compute per-shard t-digest sketches and
//   merge the sketches, accepting approximate global percentiles.
// - Real-world analog: real-time p50/p99 latency dashboards (e.g. Prometheus
//   histograms/summaries) that must answer "what's the median right now"
//   without storing and re-sorting every observation.

module.exports = MedianFinder;
