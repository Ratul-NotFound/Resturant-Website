interface HeapNode<T> {
  priority: number;
  data: T;
}

/**
 * Binary Min-Heap Priority Queue for time slot scheduling and table allocations.
 * Ensures O(log N) push and pop operations with deterministic priority ordering.
 */
export class MinHeap<T> {
  private heap: HeapNode<T>[] = [];

  get size(): number {
    return this.heap.length;
  }

  get isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * Pushes a new item with priority into the MinHeap.
   */
  push(priority: number, data: T): void {
    this.heap.push({ priority, data });
    this.bubbleUp(this.heap.length - 1);
  }

  /**
   * Pops the item with the smallest priority value.
   */
  pop(): T | undefined {
    if (this.isEmpty) return undefined;
    if (this.size === 1) return this.heap.pop()!.data;

    const min = this.heap[0].data;
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown(0);
    return min;
  }

  /**
   * Peeks at the minimum element without removing it.
   */
  peek(): T | undefined {
    if (this.isEmpty) return undefined;
    return this.heap[0].data;
  }

  /**
   * Converts heap to a sorted array in O(N log N) time.
   */
  toArraySorted(): T[] {
    const copy = [...this.heap];
    const result: T[] = [];
    while (this.heap.length > 0) {
      result.push(this.pop()!);
    }
    this.heap = copy;
    return result;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].priority >= this.heap[parentIndex].priority) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (leftChild < length && this.heap[leftChild].priority < this.heap[smallest].priority) {
        smallest = leftChild;
      }
      if (rightChild < length && this.heap[rightChild].priority < this.heap[smallest].priority) {
        smallest = rightChild;
      }

      if (smallest === index) break;
      this.swap(index, smallest);
      index = smallest;
    }
  }

  private swap(i: number, j: number): void {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}
