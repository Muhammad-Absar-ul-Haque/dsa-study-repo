/**
 * Problem: Design Add and Search Words Data Structure
 * Difficulty: Medium
 * Pattern: Trie + DFS (wildcard backtracking)
 * Time Complexity: addWord O(L); search O(26^D * L) worst case, where D = number
 *   of '.' wildcards (each wildcard fans out over the alphabet)
 * Space Complexity: O(total characters inserted)
 * Backend Relevance: Mirrors fuzzy-match/wildcard search in config lookups
 *   (e.g. feature-flag keys like "user.*.enabled") and log pattern matching.
 */

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }

  addWord(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isEnd = true;
  }

  search(word) {
    const dfs = (node, index) => {
      if (index === word.length) return node.isEnd;
      const ch = word[index];

      if (ch === '.') {
        for (const child of node.children.values()) {
          if (dfs(child, index + 1)) return true;
        }
        return false;
      }

      const child = node.children.get(ch);
      return child !== undefined && dfs(child, index + 1);
    };

    return dfs(this.root, 0);
  }
}

// ---- Tests ----
const wd = new WordDictionary();
wd.addWord('bad');
wd.addWord('dad');
wd.addWord('mad');
console.log(wd.search('pad'), '// expected: false');
console.log(wd.search('bad'), '// expected: true');
console.log(wd.search('.ad'), '// expected: true');
console.log(wd.search('b..'), '// expected: true');
console.log(wd.search('...'), '// expected: true');
console.log(wd.search('....'), '// expected: false');

// SENIOR NOTES:
// - At 1B+ elements: a leading/multiple wildcard search degenerates toward a full
//   trie scan (26^D branching); production systems bound wildcard depth or require
//   a non-wildcard prefix before allowing a query to execute.
// - Distributed systems: wildcard queries with unknown prefixes can't be routed to
//   a single shard, forcing a scatter-gather across all shards — a key reason
//   distributed search engines (Elasticsearch) discourage leading-wildcard queries.
// - Real-world analog: feature-flag key matching, glob-based file search, and
//   log-pattern alerting rules ("error.*.timeout").

module.exports = WordDictionary;
