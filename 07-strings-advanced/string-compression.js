/**
 * Problem: String Compression (in-place)
 * Difficulty: Medium
 * Pattern: Two pointers (read/write)
 * Time Complexity: O(n)
 * Space Complexity: O(1) extra (in-place on the array)
 * Backend Relevance: In-place run-length encoding is the basis of simple compression
 *   used in bitmap indexes, sparse column stores, and lightweight log compaction
 *   before writing to disk.
 */

function compress(chars) {
  let write = 0;
  let read = 0;

  while (read < chars.length) {
    const char = chars[read];
    let count = 0;

    while (read < chars.length && chars[read] === char) {
      read++;
      count++;
    }

    chars[write++] = char;
    if (count > 1) {
      for (const digit of String(count)) {
        chars[write++] = digit;
      }
    }
  }

  chars.length = write;
  return write;
}

// ---- Tests ----
const arr1 = ['a', 'a', 'b', 'b', 'c', 'c', 'c'];
const len1 = compress(arr1);
console.log(len1, JSON.stringify(arr1), '// expected: 6 ["a","2","b","2","c","3"]');

const arr2 = ['a'];
const len2 = compress(arr2);
console.log(len2, JSON.stringify(arr2), '// expected: 1 ["a"]');

const arr3 = ['a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'];
const len3 = compress(arr3);
console.log(len3, JSON.stringify(arr3), '// expected: 4 ["a","b","1","2"]');

// SENIOR NOTES:
// - At 1B+ elements: in-place two-pointer compression stays O(1) extra space, which
//   is exactly why it scales to huge in-memory buffers; a naive string-concat
//   approach would allocate O(n) extra and thrash GC at scale.
// - Distributed systems: run-length encoding of shard-local data is a common
//   pre-shuffle compression step to cut network bytes moved between nodes.
// - Real-world analog: RLE compression in columnar databases (Parquet/ORC dictionary
//   + RLE encoding) and bitmap index compression (Roaring Bitmaps).

module.exports = compress;
