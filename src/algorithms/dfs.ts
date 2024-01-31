import { AnimationMatrix, GridMatrix, IGridNode } from "../utils/interface";
import { Matrix } from "./Matrix";

export const dfs = (
  grid: GridMatrix,
  animations: AnimationMatrix,
  start: IGridNode,
  end: IGridNode,
  rows: number,
  cols: number
) => {
  const matrix = new Matrix(grid, animations, rows, cols);
  const stack: Array<IGridNode> = [start];

  while (stack.length > 0) {
    const current = stack.pop() as IGridNode;

    if (matrix.eq(current, end)) {
      return matrix.animate(start, end);
    }

    const neighbors = matrix.getNeighbors(current);

    for (const neighbor of neighbors) {
      if (!neighbor.visited) {
        neighbor.visited = true;
        neighbor.parent = current;
        stack.push(neighbor);
        matrix.animateStep(neighbor);
      }
    }

    matrix.increment();
  }

  return [];
};
