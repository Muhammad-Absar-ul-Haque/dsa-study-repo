/**
 * Problem: Implement Trie (Prefix Tree)
 * Difficulty: Medium
 * Pattern: Trie
 * Time Complexity: O(L) per insert/search/startsWith, where L = word length
 * Space Complexity: O(total characters inserted)
 * Backend Relevance: The core data structure behind autocomplete, spell-check,
 *   and IP-routing longest-prefix-match tables.
 */

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isEnd = true;
  }

  // Walks the trie following `word`'s characters; returns the final node, or null if the path breaks.
  _find(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) return null;
      node = node.children.get(ch);
    }
    return node;
  }

  search(word) {
    const node = this._find(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix) {
    return this._find(prefix) !== null;
  }
}

// ---- Tests ----
const trie = new Trie();
trie.insert('apple');
console.log(trie.search('apple'), '// expected: true');
console.log(trie.search('app'), '// expected: false');
console.log(trie.startsWith('app'), '// expected: true');
trie.insert('app');
console.log(trie.search('app'), '// expected: true');

// SENIOR NOTES:
// - At 1B+ elements: a naive trie with per-node hashmaps wastes huge amounts of
//   memory (pointer + map overhead per character); production tries use
//   compressed/radix representations (e.g. DAWG, ternary search trees) to shrink
//   memory by an order of magnitude.
// - Distributed systems: a global trie is sharded by prefix range across nodes
//   (similar to how a distributed key-value store partitions by key prefix), with
//   a routing layer directing lookups to the shard owning that prefix.
// - Real-world analog: IP routing tables (longest prefix match), autocomplete
//   indexes, and DNS zone hierarchies are all trie-shaped structures.

module.exports = Trie;
