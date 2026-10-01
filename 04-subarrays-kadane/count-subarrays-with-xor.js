/**
 * Problem: Count Subarrays With Given XOR
 * Difficulty: Medium
 * Pattern: Prefix XOR + Hash Map
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Backend Relevance: Prefix-XOR counting is the same trick used for checksum/parity
 * verification windows and for detecting tampered ranges in append-only event logs.
 */

function countSubarraysWithXor(nums, target) {
  // prefixXor -> number of times that running xor value has occurred
  const seen = new Map([[0, 1]]);
  let prefixXor = 0;
  let count = 0;

  for (const n of nums) {
    prefixXor ^= n;
    // We need an earlier prefix p such that prefixXor ^ p === target
    // => p === prefixXor ^ target
    const needed = prefixXor ^ target;
    count += seen.get(needed) || 0;
    seen.set(prefixXor, (seen.get(prefixXor) || 0) + 1);
  }

  return count;
}

// ---- Tests ----
console.log(countSubarraysWithXor([4, 2, 2, 6, 4], 6), '// expected:', 4);
console.log(countSubarraysWithXor([5, 6, 7, 8, 9], 5), '// expected:', 2);
console.log(countSubarraysWithXor([1, 1, 1], 0), '// expected:', 2);

// SENIOR NOTES:
// - At 1B+ elements: the hash map of prefix XOR values grows unbounded; bound it with
//   an LRU or bucket by expected XOR cardinality (often small, e.g. 32-bit space).
// - Distributed systems: prefix XOR is order-dependent, so sharding requires carrying
//   a running "prefix xor so far" handoff value between consecutive shards.
// - Real-world analog: log integrity checks / parity-based corruption detection across
//   a contiguous window of an event stream (similar idea to RAID parity windows).

module.exports = countSubarraysWithXor;
