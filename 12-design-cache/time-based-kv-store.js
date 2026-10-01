/**
 * Problem: Time Based Key-Value Store
 * Difficulty: Medium
 * Pattern: Design / Binary Search (per-key timestamp-sorted history)
 * Time Complexity: O(1) set (amortized), O(log n) get where n = writes for that key
 * Space Complexity: O(total set() calls)
 * Backend Relevance: The exact shape of temporal/versioned lookups, e.g. "what was this config/price at time T" queries.
 */

class TimeMap {
  constructor() {
    this.store = new Map(); // key -> [[timestamp, value], ...] sorted ascending (set() is called with increasing timestamps)
  }

  set(key, value, timestamp) {
    if (!this.store.has(key)) this.store.set(key, []);
    this.store.get(key).push([timestamp, value]);
  }

  get(key, timestamp) {
    const arr = this.store.get(key);
    if (!arr || arr.length === 0) return '';

    let lo = 0, hi = arr.length - 1, ans = -1;
    // find the last entry whose timestamp <= target timestamp
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid][0] <= timestamp) {
        ans = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return ans === -1 ? '' : arr[ans][1];
  }
}

// ---- Tests ----
const timeMap = new TimeMap();
timeMap.set('foo', 'bar', 1);
console.log(timeMap.get('foo', 1), '// expected:', 'bar');
console.log(timeMap.get('foo', 3), '// expected:', 'bar');
timeMap.set('foo', 'bar2', 4);
console.log(timeMap.get('foo', 4), '// expected:', 'bar2');
console.log(timeMap.get('foo', 5), '// expected:', 'bar2');
console.log(timeMap.get('foo', 0), '// expected:', '');

// SENIOR NOTES:
// - At 1B+ elements: keeping every version of every key in memory doesn't scale; production systems compact old versions and page history to disk/cold storage (LSM trees).
// - Distributed systems: time-based lookups across a cluster need synchronized clocks (or logical/vector clocks) since "timestamp" ordering is ambiguous across nodes without coordination.
// - Real-world analog: feature-flag/config "value as of timestamp" services, financial systems' point-in-time pricing, Cassandra/HBase's timestamp-versioned columns.

module.exports = TimeMap;
