/**
 * Singly linked list node + conversion helpers, shared across problems
 * that operate on linked lists (LRU cache internals, merge-k-lists, etc.).
 */

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Build a linked list from an array, return the head (or null for empty array)
function arrayToList(arr) {
  const dummy = new ListNode(0);
  let curr = dummy;
  for (const val of arr) {
    curr.next = new ListNode(val);
    curr = curr.next;
  }
  return dummy.next;
}

// Flatten a linked list back into a plain array (for assertions/printing)
function listToArray(head) {
  const result = [];
  let curr = head;
  while (curr) {
    result.push(curr.val);
    curr = curr.next;
  }
  return result;
}

module.exports = { ListNode, arrayToList, listToArray };
