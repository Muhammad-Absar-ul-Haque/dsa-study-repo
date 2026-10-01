/**
 * Problem: Word Ladder
 * Difficulty: Hard
 * Pattern: Graph BFS (shortest path, unweighted, implicit edges via 1-char diff)
 * Time Complexity: O(N * L^2) where N = word list size, L = word length
 *   (each word generates L wildcard patterns, each of length L to build)
 * Space Complexity: O(N * L) for the pattern -> words index
 * Backend Relevance: Shortest transformation path is the same BFS pattern used
 *   to find the minimum number of hops between two states in any implicit graph,
 *   e.g. minimum config diffs to migrate one schema version to another.
 */

function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  // Build a generic-pattern index, e.g. "h*t" -> ["hot", "hit", ...], so we can
  // find all one-letter-different neighbors of a word in O(L) instead of O(N * L).
  const patternMap = new Map();
  const addToPatterns = (word) => {
    for (let i = 0; i < word.length; i++) {
      const pattern = word.slice(0, i) + '*' + word.slice(i + 1);
      if (!patternMap.has(pattern)) patternMap.set(pattern, []);
      patternMap.get(pattern).push(word);
    }
  };
  for (const word of wordSet) addToPatterns(word);
  if (!patternMap.size) return 0;
  // beginWord might not be in wordList; still need its patterns to find neighbors.
  addToPatterns(beginWord);

  const visited = new Set([beginWord]);
  let queue = [beginWord];
  let level = 1;

  while (queue.length > 0) {
    const nextQueue = [];
    for (const word of queue) {
      if (word === endWord) return level;
      for (let i = 0; i < word.length; i++) {
        const pattern = word.slice(0, i) + '*' + word.slice(i + 1);
        const candidates = patternMap.get(pattern) || [];
        for (const candidate of candidates) {
          if (!visited.has(candidate)) {
            visited.add(candidate);
            nextQueue.push(candidate);
          }
        }
      }
    }
    queue = nextQueue;
    level++;
  }

  return 0; // no path found
}

// ---- Tests ----
console.log(
  ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']),
  '// expected: 5'
);
console.log(
  ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']),
  '// expected: 0 (cog not in wordList)'
);
console.log(ladderLength('a', 'c', ['a', 'b', 'c']), '// expected: 2');

// SENIOR NOTES:
// - At 1B+ elements: generating every 1-char-diff pattern for a huge dictionary
//   costs O(N*L) memory just for the index; production spell-correction systems
//   use BK-trees or SymSpell (precomputed edit-distance-1 deletions) instead.
// - Distributed systems: bidirectional BFS (searching from both ends and meeting
//   in the middle) roughly squares the reachable radius per unit of work, and
//   each frontier can expand in parallel across worker shards of the dictionary.
// - Real-world analog: DNA/protein sequence mutation-path search, spell-checker
//   "did you mean" suggestions, and minimum-hop config/version migration paths.

module.exports = ladderLength;
