/**
 * Problem: Word Subsets
 * Difficulty: Medium
 * Pattern: Hashmap Frequency (running max) + Universal Coverage Check
 * Time Complexity: O(a * x + b * x) where a, b are list sizes and x is average word length
 * Space Complexity: O(1) (bounded alphabet)
 * Backend Relevance: Same shape as checking which service instances satisfy the union of
 *   required resource thresholds (e.g. must have at least the max CPU/memory any check demands).
 */

function wordSubsets(words1, words2) {
  const maxFreq = new Map();

  for (const w of words2) {
    const freq = new Map();
    for (const c of w) freq.set(c, (freq.get(c) || 0) + 1);
    for (const [c, count] of freq) {
      maxFreq.set(c, Math.max(maxFreq.get(c) || 0, count));
    }
  }

  const result = [];
  for (const w of words1) {
    const freq = new Map();
    for (const c of w) freq.set(c, (freq.get(c) || 0) + 1);

    let isUniversal = true;
    for (const [c, count] of maxFreq) {
      if ((freq.get(c) || 0) < count) {
        isUniversal = false;
        break;
      }
    }
    if (isUniversal) result.push(w);
  }

  return result;
}

// ---- Tests ----
console.log(
  wordSubsets(['amazon', 'apple', 'facebook', 'google', 'leetcode'], ['e', 'o']),
  '// expected:',
  ['facebook', 'google', 'leetcode']
);
console.log(
  wordSubsets(['amazon', 'apple', 'facebook', 'google', 'leetcode'], ['l', 'e']),
  '// expected:',
  ['apple', 'google', 'leetcode']
);
console.log(
  wordSubsets(['acaac', 'cccbb', 'aacbb', 'caacc', 'bccca'], ['c', 'cc', 'b']),
  '// expected:',
  ['cccbb', 'bccca']
);

// SENIOR NOTES:
// - At 1B+ elements: the combined "max requirement" vector is bounded by alphabet size, so
//   even with a billion words in words1, each check is O(alphabet), keeping this linear overall.
// - Distributed systems: build the max-requirement vector once (small, broadcastable to every
//   shard), then each shard independently filters its slice of words1 against it in parallel.
// - Real-world analog: matching candidate machines that satisfy the union of all resource
//   constraints requested across a batch of scheduled jobs.

module.exports = wordSubsets;
