/**
 * Problem: Design Search Autocomplete System (simplified)
 * Difficulty: Hard
 * Pattern: Trie (storing sentences + frequency at every prefix node)
 * Time Complexity: addSentence O(L); search O(P + M log M) where P = prefix
 *   length, M = number of sentences sharing that prefix
 * Space Complexity: O(sum of sentence lengths * average shared-prefix depth)
 * Backend Relevance: The exact shape of a search-bar "suggestions" dropdown —
 *   rank candidates by historical frequency, break ties lexicographically.
 *
 * Simplification note: the classic LeetCode 642 is stateful (fed one keystroke
 * at a time via '#' to terminate). Here `search(prefix)` takes the whole prefix
 * at once, which keeps the trie mechanics front and center.
 */

class TrieNode {
  constructor() {
    this.children = new Map();
    this.sentences = new Set(); // every sentence that passes through this node
  }
}

class AutocompleteSystem {
  constructor() {
    this.root = new TrieNode();
    this.freq = new Map(); // sentence -> historical frequency
  }

  addSentence(sentence, times = 1) {
    this.freq.set(sentence, (this.freq.get(sentence) || 0) + times);

    let node = this.root;
    node.sentences.add(sentence);
    for (const ch of sentence) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
      node.sentences.add(sentence);
    }
  }

  // Returns top-3 sentences matching `prefix`, ranked by frequency desc then
  // lexicographic asc for ties.
  search(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return [];
      node = node.children.get(ch);
    }

    return [...node.sentences]
      .sort((a, b) => {
        const freqDiff = this.freq.get(b) - this.freq.get(a);
        if (freqDiff !== 0) return freqDiff;
        return a < b ? -1 : 1;
      })
      .slice(0, 3);
  }
}

// ---- Tests ----
const acs = new AutocompleteSystem();
const sentences = ['i love you', 'island', 'iron', 'i love leetcode'];
const times = [5, 3, 2, 2];
sentences.forEach((s, i) => acs.addSentence(s, times[i]));

console.log(
  acs.search('i'),
  "// expected: [ 'i love you', 'island', 'i love leetcode' ]"
);
console.log(acs.search('ir'), "// expected: [ 'iron' ]");
console.log(acs.search('xyz'), '// expected: []');

acs.addSentence('i love leetcode', 1); // bump frequency: 2 -> 3, ties with 'island'
console.log(
  acs.search('i'),
  "// expected: [ 'i love you', 'i love leetcode', 'island' ]"
);

// SENIOR NOTES:
// - At 1B+ elements: storing every sentence at every prefix node duplicates
//   references across the whole query history; production autocomplete indexes
//   instead precompute a bounded top-K list per trie node (offline, batch job)
//   so a lookup is O(1) instead of O(M log M).
// - Distributed systems: query logs stream into a distributed counter (e.g. a
//   count-min sketch or a Spark/Flink aggregation job) that periodically rebuilds
//   the trie's per-node top-K cache, rather than mutating a live trie per keystroke.
// - Real-world analog: search-engine "search as you type" suggestions, IDE
//   symbol autocomplete, and e-commerce product search boxes.

module.exports = AutocompleteSystem;
