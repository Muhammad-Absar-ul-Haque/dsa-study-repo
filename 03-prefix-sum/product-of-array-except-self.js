/**
 * Problem: Product of Array Except Self
 * Difficulty: Medium
 * Pattern: Prefix Sum / Prefix Product
 * Time Complexity: O(n)
 * Space Complexity: O(1) extra (excluding output array)
 * Backend Relevance: Prefix/suffix aggregation without a division operator —
 *   mirrors computing "total minus self" contributions in distributed billing.
 */

function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  // pass 1: result[i] = product of all elements to the left of i
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }

  // pass 2: multiply in product of all elements to the right of i
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
    if (Object.is(result[i], -0)) result[i] = 0; // normalize -0 for clean output
  }
  return result;
}

// ---- Tests ----
console.log(productExceptSelf([1, 2, 3, 4]), '// expected: [24,12,8,6]');
console.log(productExceptSelf([-1, 1, 0, -3, 3]), '// expected: [0,0,9,0,0]');
console.log(productExceptSelf([2, 3]), '// expected: [3,2]');

// SENIOR NOTES:
// - At 1B+ elements: O(n) time and O(1) extra space (beyond output) avoids
//   overflow risk from computing one giant product and dividing (which also
//   breaks entirely when any element is zero).
// - Distributed systems: compute per-shard left/right partial products, then a
//   second pass folds in the global left-of-shard and right-of-shard products —
//   a two-pass distributed scan, same shape as parallel prefix sum.
// - Real-world analog: computing each participant's "share of total minus their
//   own contribution" in a cost-splitting or revenue-attribution system.

module.exports = productExceptSelf;
