/**
 * Problem: Encode and Decode Strings
 * Difficulty: Medium
 * Pattern: Length-prefixed serialization
 * Time Complexity: O(total characters) for encode and decode
 * Space Complexity: O(total characters)
 * Backend Relevance: Length-prefixing is exactly how binary wire protocols
 *   (protobuf length-delimited fields, HTTP/2 frames, Redis RESP bulk strings)
 *   safely serialize variable-length data without ambiguous delimiters.
 */

function encode(strs) {
  return strs.map((s) => `${s.length}#${s}`).join('');
}

function decode(str) {
  const result = [];
  let i = 0;

  while (i < str.length) {
    let j = i;
    while (str[j] !== '#') j++;
    const len = parseInt(str.slice(i, j), 10);
    const start = j + 1;
    result.push(str.slice(start, start + len));
    i = start + len;
  }

  return result;
}

// ---- Tests ----
const sample1 = ['lint', 'code', 'love', 'you'];
console.log(JSON.stringify(decode(encode(sample1))), '// expected: ["lint","code","love","you"]');

const sample2 = ['we', 'say', ':', 'yes'];
console.log(JSON.stringify(decode(encode(sample2))), '// expected: ["we","say",":","yes"]');

const sample3 = ['', 'a', ''];
console.log(JSON.stringify(decode(encode(sample3))), '// expected: ["","a",""]');

// SENIOR NOTES:
// - At 1B+ elements: string concatenation via array.join is fine, but for huge
//   payloads you'd stream-write to a Buffer/socket instead of building one giant
//   string in memory.
// - Distributed systems: this is the exact pattern behind length-delimited framing
//   in gRPC/protobuf and TCP message framing, letting receivers split a byte stream
//   into discrete messages without relying on a delimiter that could appear in data.
// - Real-world analog: Redis RESP protocol, HTTP/2 frame length headers, protobuf
//   varint-length-prefixed fields.

module.exports = { encode, decode };
