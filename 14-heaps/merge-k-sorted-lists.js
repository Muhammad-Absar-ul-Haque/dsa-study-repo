/**
 * Problem: Merge k Sorted Lists
 * Difficulty: Hard
 * Pattern: Heap / Priority Queue (k-way merge)
 * Time Complexity: O(n log k), n = total nodes across all lists, k = number of lists
 * Space Complexity: O(k) for the heap
 * Backend Relevance: The textbook k-way merge — same technique used to merge
 *   sorted SSTables in an LSM-tree compaction or to merge sorted shard results
 *   in a distributed query engine.
 */

const { ListNode, arrayToList, listToArray } = require('../_helpers/linked-list');
const { MinHeap } = require('../_helpers/heap');

function mergeKLists(lists) {
  const heap = new MinHeap((a, b) => a.val - b.val);

  for (const head of lists) {
    if (head) heap.push(head);
  }

  const dummy = new ListNode(0);
  let curr = dummy;

  while (!heap.isEmpty()) {
    const node = heap.pop();
    curr.next = node;
    curr = curr.next;
    if (node.next) heap.push(node.next);
  }

  return dummy.next;
}

// ---- Tests ----
console.log(
  listToArray(mergeKLists([arrayToList([1, 4, 5]), arrayToList([1, 3, 4]), arrayToList([2, 6])])),
  '// expected: [1,1,2,3,4,4,5,6]'
);
console.log(listToArray(mergeKLists([])), '// expected: []');
console.log(listToArray(mergeKLists([arrayToList([])])), '// expected: []');

// SENIOR NOTES:
// - At 1B+ elements: don't materialize full lists; stream nodes/records from
//   disk or network, keeping only k "current heads" in memory at once — the
//   heap already caps memory at O(k), which is what makes this scale.
// - Distributed systems: this is exactly how a distributed query engine merges
//   pre-sorted partitions from different shards into one globally sorted output
//   (sort-merge exchange operator).
// - Real-world analog: LSM-tree compaction merging sorted SSTable segments, or
//   merging sorted paginated results from multiple database replicas.

module.exports = mergeKLists;
