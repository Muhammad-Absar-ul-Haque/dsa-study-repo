/**
 * Reusable Binary Heap implementations (JavaScript has no built-in heap/priority queue).
 * Backed by an array; supports a custom comparator for MinHeap/MaxHeap-of-anything.
 *
 * MinHeap: parent <= children (smallest at top)
 * MaxHeap: parent >= children (largest at top)
 */

class Heap {
  // comparator(a, b) < 0 means a has higher priority than b (comes out first)
  constructor(comparator) {
    this.data = [];
    this.comparator = comparator;
  }

  size() {
    return this.data.length;
  }

  isEmpty() {
    return this.data.length === 0;
  }

  peek() {
    return this.data[0];
  }

  push(value) {
    this.data.push(value);
    this._bubbleUp(this.data.length - 1);
    return this;
  }

  pop() {
    if (this.isEmpty()) return undefined;
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._bubbleDown(0);
    }
    return top;
  }

  toArray() {
    return [...this.data];
  }

  _bubbleUp(index) {
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      if (this.comparator(this.data[index], this.data[parentIndex]) < 0) {
        this._swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  _bubbleDown(index) {
    const n = this.data.length;
    while (true) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      let best = index;

      if (left < n && this.comparator(this.data[left], this.data[best]) < 0) {
        best = left;
      }
      if (right < n && this.comparator(this.data[right], this.data[best]) < 0) {
        best = right;
      }
      if (best === index) break;

      this._swap(index, best);
      index = best;
    }
  }

  _swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }
}

class MinHeap extends Heap {
  constructor(comparator = (a, b) => a - b) {
    super(comparator);
  }
}

class MaxHeap extends Heap {
  constructor(comparator = (a, b) => a - b) {
    super((a, b) => -comparator(a, b));
  }
}

module.exports = { Heap, MinHeap, MaxHeap };
