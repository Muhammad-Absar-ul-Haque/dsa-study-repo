/**
 * Problem: Single Number II
 * Difficulty: Medium
 * Pattern: Bit Manipulation (state machine over bits)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Backend Relevance: Constant-space bit-counting tricks resemble techniques
 * used in low-level protocol/packet parsing and memory-constrained embedded
 * or edge-computing services where allocating auxiliary hash maps is costly.
 */

function singleNumber(nums) {
  let ones = 0;
  let twos = 0;
  for (const n of nums) {
    // 'ones' tracks bits seen exactly 1 time (mod 3), 'twos' bits seen 2 times.
    ones = (ones ^ n) & ~twos;
    twos = (twos ^ n) & ~ones;
  }
  return ones;
}

// ---- Tests ----
console.log(singleNumber([2, 2, 3, 2]), '// expected:', 3);
console.log(singleNumber([0, 1, 0, 1, 0, 1, 99]), '// expected:', 99);
console.log(singleNumber([-2, -2, -2, 1, 1, 1, -3, -3, -3, -4]), '// expected:', -4);

// SENIOR NOTES:
// - At 1B+ elements: still O(n) time, O(1) space — this scales linearly and
//   is already close to optimal; a hash-map counting approach would blow up
//   memory at this scale while this bit trick stays constant.
// - Distributed systems: the ones/twos accumulator is associative per-bit,
//   so partial results from shards can be merged with the same state-machine
//   logic (map-reduce: map computes local ones/twos, reduce combines them).
// - Real-world analog: detecting a single anomalous/odd-count event ID in a
//   massive log stream where every other ID appears exactly a fixed number
//   of times (e.g. triplicated retries).

module.exports = singleNumber;
