/**
 * Problem: Design Underground System
 * Difficulty: Medium
 * Pattern: Design / Hashing (running aggregates keyed by route)
 * Time Complexity: O(1) checkIn/checkOut/getAverageTime
 * Space Complexity: O(active riders + distinct routes)
 * Backend Relevance: Same shape as computing rolling averages for API latency per route/endpoint pair.
 */

class UndergroundSystem {
  constructor() {
    this.checkIns = new Map(); // id -> { stationName, t }
    this.stats = new Map(); // "start->end" -> { totalTime, count }
  }

  checkIn(id, stationName, t) {
    this.checkIns.set(id, { stationName, t });
  }

  checkOut(id, stationName, t) {
    const { stationName: startStation, t: startTime } = this.checkIns.get(id);
    this.checkIns.delete(id);

    const key = `${startStation}->${stationName}`;
    if (!this.stats.has(key)) this.stats.set(key, { totalTime: 0, count: 0 });
    const stat = this.stats.get(key);
    stat.totalTime += t - startTime;
    stat.count += 1;
  }

  getAverageTime(startStation, endStation) {
    const stat = this.stats.get(`${startStation}->${endStation}`);
    return stat.totalTime / stat.count;
  }
}

// ---- Tests ----
const us = new UndergroundSystem();
us.checkIn(45, 'Leyton', 3);
us.checkOut(45, 'Paradise', 8);
console.log(us.getAverageTime('Leyton', 'Paradise'), '// expected:', 5);

us.checkIn(32, 'Paradise', 10);
us.checkOut(32, 'Cambridge', 18);
console.log(us.getAverageTime('Paradise', 'Cambridge'), '// expected:', 8);

us.checkIn(27, 'Leyton', 20);
us.checkOut(27, 'Paradise', 30);
console.log(us.getAverageTime('Leyton', 'Paradise'), '// expected:', 7.5); // trips: (8-3)=5, (30-20)=10 -> avg 7.5

// SENIOR NOTES:
// - At 1B+ elements: storing every historical trip individually would blow up memory; keeping only running (totalTime, count) per route (as done here) is the scalable pattern.
// - Distributed systems: route stats would be partitioned by route key across nodes and merged with CRDTs or periodic aggregation jobs rather than one shared map.
// - Real-world analog: APM systems computing p50/avg latency per (service, endpoint) pair, ride-share ETA aggregation per route.

module.exports = UndergroundSystem;
