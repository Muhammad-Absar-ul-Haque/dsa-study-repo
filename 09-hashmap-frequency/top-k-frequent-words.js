/**
 * Problem: Top K Frequent Words
 * Difficulty: Medium
 * Pattern: Hashmap Frequency Count + Sort (freq desc, lexicographic asc tiebreak)
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * Backend Relevance: Mirrors "most searched terms" or "most common error messages" reports
 *   where ties must resolve deterministically for reproducible dashboards.
 */

function topKFrequentWords(words, k) {
  const freqMap = new Map();
  for (const w of words) freqMap.set(w, (freqMap.get(w) || 0) + 1);

  return [...freqMap.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, k)
    .map(([word]) => word);
}

// ---- Tests ----
console.log(
  topKFrequentWords(['i', 'love', 'leetcode', 'i', 'love', 'coding'], 2),
  '// expected:',
  ['i', 'love']
);
console.log(
  topKFrequentWords(['the', 'day', 'is', 'sunny', 'the', 'the', 'the', 'sunny', 'is', 'is'], 4),
  '// expected:',
  ['the', 'is', 'sunny', 'day']
);
console.log(topKFrequentWords(['a', 'aa', 'aaa'], 1), '// expected:', ['a']);

// SENIOR NOTES:
// - At 1B+ elements: sorting the full vocabulary is wasteful; use a min-heap of size k with
//   comparator (freq asc, word desc) to keep the working set O(k) instead of O(n log n).
// - Distributed systems: word counting is the canonical MapReduce example — mappers emit
//   (word, 1), reducers sum, then a final top-k merge step runs over reducer outputs.
// - Real-world analog: search engine "trending queries" or log-analytics "top error strings".

module.exports = topKFrequentWords;
