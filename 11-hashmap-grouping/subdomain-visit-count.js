/**
 * Problem: Subdomain Visit Count
 * Difficulty: Medium
 * Pattern: Hashmap Aggregation over Hierarchical Keys
 * Time Complexity: O(n * d) where d is average domain depth
 * Space Complexity: O(n * d)
 * Backend Relevance: Directly mirrors rolling up DNS/CDN traffic logs into per-domain and
 *   per-parent-domain visit totals for analytics dashboards.
 */

function subdomainVisits(cpdomains) {
  const counts = new Map();

  for (const entry of cpdomains) {
    const [countStr, domain] = entry.split(' ');
    const count = Number(countStr);
    const parts = domain.split('.');

    for (let i = 0; i < parts.length; i++) {
      const sub = parts.slice(i).join('.');
      counts.set(sub, (counts.get(sub) || 0) + count);
    }
  }

  return [...counts.entries()].map(([domain, count]) => `${count} ${domain}`);
}

// ---- Tests ----
console.log(
  subdomainVisits(['9001 discuss.leetcode.com']),
  '// expected:',
  ['9001 discuss.leetcode.com', '9001 leetcode.com', '9001 com']
);
console.log(
  subdomainVisits(['900 google.mail.com', '50 yahoo.com', '1 intel.mail.com', '5 wiki.org']),
  '// expected:',
  [
    '900 google.mail.com',
    '901 mail.com',
    '951 com',
    '50 yahoo.com',
    '1 intel.mail.com',
    '5 wiki.org',
    '5 org',
  ]
);
console.log(subdomainVisits(['1 a.b.c.d']), '// expected:', ['1 a.b.c.d', '1 b.c.d', '1 c.d', '1 d']);

// SENIOR NOTES:
// - At 1B+ elements: a single in-memory Map of every subdomain across a billion log lines
//   won't fit; aggregate in a streaming/columnar store (e.g. a time-series DB rollup) instead.
// - Distributed systems: this is a textbook MapReduce job — mappers emit (subdomain, count)
//   for every suffix, reducers sum per key, exactly like real DNS analytics pipelines.
// - Real-world analog: CDN/DNS provider dashboards showing traffic rolled up from
//   subdomain -> domain -> TLD.

module.exports = subdomainVisits;
