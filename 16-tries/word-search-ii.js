/**
 * Problem: Word Search II
 * Difficulty: Hard
 * Pattern: Trie + DFS Backtracking (on a grid)
 * Time Complexity: O(rows * cols * 4^maxWordLength) worst case, heavily pruned by
 *   the trie so a dead prefix stops the DFS immediately
 * Space Complexity: O(sum of word lengths) for the trie + O(maxWordLength) recursion
 * Backend Relevance: Same shape as multi-pattern matching over a 2D grid, e.g.
 *   scanning a matrix of sensor IDs or a game board for known token sequences.
 */

class TrieNode {
  constructor() {
    this.children = new Map();
    this.word = null; // set to the full word when this node completes one
  }
}

function buildTrie(words) {
  const root = new TrieNode();
  for (const word of words) {
    let node = root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.word = word;
  }
  return root;
}

function findWords(board, words) {
  const root = buildTrie(words);
  const rows = board.length;
  const cols = rows > 0 ? board[0].length : 0;
  const found = new Set();

  const dfs = (r, c, node) => {
    const ch = board[r][c];
    const next = node.children.get(ch);
    if (!next) return;

    if (next.word !== null) {
      found.add(next.word);
      // Don't return here: a longer word may share this word as a prefix.
    }

    board[r][c] = '#'; // mark visited in place
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] !== '#') {
        dfs(nr, nc, next);
      }
    }
    board[r][c] = ch; // restore

    // Prune: once a leaf's word is collected it can be removed to speed up later scans.
    if (next.children.size === 0) node.children.delete(ch);
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, root);
    }
  }

  return [...found];
}

// ---- Tests ----
const board1 = [
  ['o', 'a', 'a', 'n'],
  ['e', 't', 'a', 'e'],
  ['i', 'h', 'k', 'r'],
  ['i', 'f', 'l', 'v'],
];
const result1 = findWords(board1, ['oath', 'pea', 'eat', 'rain']).sort();
console.log(result1, "// expected: [ 'eat', 'oath' ]");

const board2 = [['a', 'b'], ['c', 'd']];
console.log(findWords(board2, ['abcb']), '// expected: []');

// SENIOR NOTES:
// - At 1B+ elements: a trie of all dictionary words can be huge; production
//   systems compress it (DAWG) and cap the DFS depth to the longest realistic
//   word to bound the exponential branching factor.
// - Distributed systems: the grid can be tiled and searched in parallel across
//   workers, with boundary overlaps handled by stitching partial matches at tile
//   edges — similar to distributed image/tile processing pipelines.
// - Real-world analog: word-game solvers (Boggle), and more generally scanning a
//   2D grid (a game board, a matrix of tags) for known multi-token patterns.

module.exports = findWords;
