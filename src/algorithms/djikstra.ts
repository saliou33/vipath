import { AnimationMatrix, GridMatrix, IGridNode } from "../utils/interface";
import { Matrix } from "./Matrix.ts";
import { PriorityQueue } from "./PriorityQueue.ts";

export const djikstra = (
  grid: GridMatrix,
  animations: AnimationMatrix,
  start: IGridNode,
  end: IGridNode,
  rows: number,
  cols: number
) => {
  const matrix = new Matrix(grid, animations, rows, cols);
  const queue = new PriorityQueue();
  queue.enqueue(start);

  while (queue.length() > 0) {
    const current = queue.dequeue() as IGridNode;
    current.visited = true;

    if (matrix.eq(current, end)) {
      return matrix.animate(start, end);
    }

    const neighbors = matrix.getNeighbors(current);

    for (const neighbor of neighbors) {
      if (!neighbor.visited) {
        const distance = current.distance + neighbor.weight;
        if (distance < neighbor.distance) {
          neighbor.parent = current;
          neighbor.distance = distance;
          queue.enqueue(neighbor);
          matrix.animateStep(neighbor);
        }
      }
    }
    matrix.increment();
  }

  return [];
};
