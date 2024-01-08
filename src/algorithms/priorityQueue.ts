import { IGridNode } from "../utils/interface";

export class PriorityQueue {
  queue: IGridNode[];

  constructor() {
    this.queue = [];
  }

  enqueue(node: IGridNode) {
    this.queue.push(node);
    this.sort();
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  length() {
    return this.queue.length;
  }

  sort() {
    this.queue.sort((a: IGridNode, b: IGridNode) => a.distance - b.distance);
  }
}
