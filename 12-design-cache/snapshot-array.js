/**
 * Problem: Snapshot Array
 * Difficulty: Medium
 * Pattern: Design / Binary Search (sparse write history per index)
 * Time Complexity: O(1) set (amortized), O(1) snap, O(log k) get where k = writes to that index
 * Space Complexity: O(total set() calls)
 * Backend Relevance: Mirrors append-only versioned storage (event sourcing, MVCC snapshots) where you binary-search history "as of" a version.
 */

class SnapshotArray {
  constructor(length) {
    this.snapId = 0;
    // each index stores [snapId, value] pairs only when the value changes -> sparse, sorted by snapId
    this.history = Array.from({ length }, () => [[0, 0]]);
  }

  set(index, val) {
    const arr = this.history[index];
    if (arr[arr.length - 1][0] === this.snapId) {
      arr[arr.length - 1][1] = val; // overwrite: same snapshot, no new version needed
    } else {
      arr.push([this.snapId, val]);
    }
  }

  snap() {
    return this.snapId++;
  }

  get(index, snap_id) {
    const arr = this.history[index];
    let lo = 0, hi = arr.length - 1, ans = 0;
    // find the last entry whose snapId <= snap_id
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid][0] <= snap_id) {
        ans = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return arr[ans][1];
  }
}

// ---- Tests ----
const snapArr = new SnapshotArray(3);
snapArr.set(0, 5);
console.log(snapArr.snap(), '// expected:', 0);
snapArr.set(0, 6);
console.log(snapArr.get(0, 0), '// expected:', 5);
console.log(snapArr.snap(), '// expected:', 1);
console.log(snapArr.get(0, 1), '// expected:', 6);

// SENIOR NOTES:
// - At 1B+ elements: storing full history per index for a billion-element array is infeasible in memory; needs disk-backed columnar storage with periodic compaction of old versions.
// - Distributed systems: this is the local-node version of MVCC (multi-version concurrency control) used by databases like Postgres/CockroachDB to serve consistent point-in-time reads without locking writers.
// - Real-world analog: Git blob history, database snapshot isolation, event-sourced aggregates replayed "as of" a version.

module.exports = SnapshotArray;
