/**
 * Problem: Logger Rate Limiter
 * Difficulty: Easy
 * Pattern: Design / Hashing (per-key cooldown window)
 * Time Complexity: O(1) shouldPrintMessage
 * Space Complexity: O(distinct messages)
 * Backend Relevance: This IS a rate limiter middleware — one cooldown window per key (message, IP, user, etc.).
 */

class Logger {
  constructor() {
    this.lastPrinted = new Map(); // message -> last timestamp it was allowed
  }

  shouldPrintMessage(timestamp, message) {
    const last = this.lastPrinted.get(message);
    if (last === undefined || timestamp - last >= 10) {
      this.lastPrinted.set(message, timestamp);
      return true;
    }
    return false;
  }
}

// ---- Tests ----
const logger = new Logger();
console.log(logger.shouldPrintMessage(1, 'foo'), '// expected:', true);
console.log(logger.shouldPrintMessage(2, 'bar'), '// expected:', true);
console.log(logger.shouldPrintMessage(3, 'foo'), '// expected:', false);
console.log(logger.shouldPrintMessage(8, 'bar'), '// expected:', false);
console.log(logger.shouldPrintMessage(10, 'foo'), '// expected:', false); // 10-1=9 < 10
console.log(logger.shouldPrintMessage(11, 'foo'), '// expected:', true); // 11-1=10 >= 10

// SENIOR NOTES:
// - At 1B+ elements: an unbounded Map of every message ever seen leaks memory; needs TTL-based eviction (expire entries older than the window) or an LRU cap.
// - Distributed systems: a per-message cooldown shared across many app servers needs a centralized store like Redis with SET key val NX EX 10, since local in-memory state diverges per instance.
// - Real-world analog: log deduplication in observability pipelines, per-user API rate limiting (fixed window counter variant).

module.exports = Logger;
