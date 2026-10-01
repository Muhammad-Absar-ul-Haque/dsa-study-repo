/**
 * Problem: Design In-Memory File System (simplified)
 * Difficulty: Medium
 * Pattern: Design / Trie (path segments as trie nodes)
 * Time Complexity: O(L) createPath/get where L = number of path segments
 * Space Complexity: O(total path segments created)
 * Backend Relevance: Same structure as an in-memory filesystem cache, URL routing trie, or config namespace tree.
 */

class FileSystem {
  constructor() {
    this.root = { children: new Map(), value: -1, isPath: false };
  }

  createPath(path, value) {
    const parts = path.split('/').filter(Boolean);
    if (parts.length === 0) return false;

    let node = this.root;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!node.children.has(parts[i])) return false; // parent path must already exist
      node = node.children.get(parts[i]);
    }

    const last = parts[parts.length - 1];
    if (node.children.has(last)) return false; // path already exists
    node.children.set(last, { children: new Map(), value, isPath: true });
    return true;
  }

  get(path) {
    const parts = path.split('/').filter(Boolean);
    let node = this.root;
    for (const part of parts) {
      if (!node.children.has(part)) return -1;
      node = node.children.get(part);
    }
    return node.isPath ? node.value : -1;
  }
}

// ---- Tests ----
const fs = new FileSystem();
console.log(fs.createPath('/a', 1), '// expected:', true);
console.log(fs.get('/a'), '// expected:', 1);
console.log(fs.createPath('/a/b', 2), '// expected:', true);
console.log(fs.get('/a/b'), '// expected:', 2);
console.log(fs.createPath('/c/d', 5), '// expected:', false); // parent /c doesn't exist
console.log(fs.get('/c'), '// expected:', -1);
console.log(fs.createPath('/a', 10), '// expected:', false); // already exists

// SENIOR NOTES:
// - At 1B+ elements: a single in-memory trie can't hold a billion paths on one node; real filesystems page metadata to disk (inode tables) and cache only hot directories.
// - Distributed systems: distributed filesystems (HDFS, S3) split metadata (namespace tree, owned by a NameNode/metadata service) from actual block storage spread across many data nodes.
// - Real-world analog: HDFS NameNode directory tree, Unix inode/dentry cache, Express/Router URL path trie matching.

module.exports = FileSystem;
