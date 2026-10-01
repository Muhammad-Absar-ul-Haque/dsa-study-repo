/**
 * Problem: First Bad Version
 * Difficulty: Easy
 * Pattern: Binary Search (on a monotonic predicate)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Backend Relevance: Exactly the algorithm behind `git bisect` and CI "find the first commit that broke the build".
 */

// solution() takes the isBadVersion(version) predicate (as LeetCode's harness provides it)
// and returns a firstBadVersion(n) function that binary-searches for the first bad version.
function solution(isBadVersion) {
  return function firstBadVersion(n) {
    let lo = 1, hi = n;
    while (lo < hi) {
      const mid = lo + Math.floor((hi - lo) / 2); // avoid overflow-style large mid for huge n
      if (isBadVersion(mid)) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  };
}

// ---- Tests ----
const makeIsBadVersion = (firstBad) => (version) => version >= firstBad;

const firstBadVersion1 = solution(makeIsBadVersion(4));
console.log(firstBadVersion1(5), '// expected:', 4);

const firstBadVersion2 = solution(makeIsBadVersion(1));
console.log(firstBadVersion2(1), '// expected:', 1);

const firstBadVersion3 = solution(makeIsBadVersion(11));
console.log(firstBadVersion3(11), '// expected:', 11);

// SENIOR NOTES:
// - At 1B+ elements (versions): each isBadVersion() check may be an expensive test/build run, so O(log n) matters enormously — 1B versions collapses to ~30 checks.
// - Distributed systems: CI systems run `git bisect`-style searches by triggering distributed build/test jobs per candidate commit, often parallelizing several candidates speculatively instead of one at a time.
// - Real-world analog: `git bisect`, CI regression bisection tools, canary rollout "first version where error rate spiked" analysis.

module.exports = solution;
