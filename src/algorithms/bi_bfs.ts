import { AnimationMatrix, GridMatrix, IGridNode } from "../utils/interface";
import { Matrix } from "./Matrix";

export const bi_bfs = (
  grid: GridMatrix,
  animations: AnimationMatrix,
  start: IGridNode,
  end: IGridNode,
  rows: number,
  cols: number
) => {
  const matrix = new Matrix(grid, animations, rows, cols);
  const vmatrix = new Matrix(grid, animations, rows, cols);

  const qX: Array<IGridNode> = [start];
  const qY: Array<IGridNode> = [vmatrix.getNode(end)];

  while (qX.length > 0 && qY.length > 0) {
    const x = qX.shift() as IGridNode;
    const y = qY.shift() as IGridNode;

    if (
      (x.visited && vmatrix.getNode(x).visited) ||
      (y.visited && matrix.getNode(y).visited)
    ) {
      if (x.visited && vmatrix.getNode(x).visited) {
        return matrix.animate(start, end, x, vmatrix);
      }
      return matrix.animate(start, end, y, vmatrix);
    }

    const neighborsX = matrix.getNeighbors(x);
    const neighborsY = vmatrix.getNeighbors(y);

    for (const neighborX of neighborsX) {
      if (!neighborX.visited) {
        neighborX.parent = x;
        neighborX.visited = true;
        qX.push(neighborX);
        matrix.animateStep(neighborX);
      }
    }

    for (const neighborY of neighborsY) {
      if (!neighborY.visited) {
        neighborY.parent = y;
        neighborY.visited = true;
        qY.push(neighborY);
        matrix.animateStep(neighborY);
      }
    }

    matrix.increment();
  }

  return matrix.animations;
};
