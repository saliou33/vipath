import { AnimationMatrix, GridMatrix, IGridNode } from "../utils/interface";
import { Matrix } from "./Matrix";

export const bfs = (
  grid: GridMatrix,
  animations: AnimationMatrix,
  start: IGridNode,
  end: IGridNode,
  rows: number,
  cols: number
) => {
  const matrix = new Matrix(grid, animations, rows, cols);
  const queue: Array<IGridNode> = [start];

  while (queue.length > 0) {
    const current = queue.shift() as IGridNode;

    if (matrix.eq(current, end)) {
      return matrix.animate(start, end);
    }

    const neighbors = matrix.getNeighbors(current);

    for (const neighbor of neighbors) {
      if (!neighbor.visited) {
        neighbor.parent = current;
        neighbor.visited = true;
        queue.push(neighbor);
        matrix.animateStep(neighbor);
      }
    }
    matrix.increment();
  }

  return matrix.animations;
};
