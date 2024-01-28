import {
  AnimationMatrix,
  ArrayCoord,
  Coord,
  GridMatrix,
  GridNodeType,
} from "../utils/interface";
import { Matrix } from "./matrix";

export const bfs = (
  gridMatrix: GridMatrix,
  animationMatrix: AnimationMatrix,
  start: Coord,
  end: Coord,
  rows: number,
  cols: number
) => {
  const matrix = new Matrix(gridMatrix, animationMatrix, rows, cols);
  const queue: ArrayCoord = [start];
  let step = 1;

  while (queue.length > 0) {
    const { row, col } = queue.shift() as Coord;

    if (row === end.row && col === end.col) {
      return matrix.animation(start, end, step);
    }

    const neighbors = matrix.getNeighbors(row, col);
    for (const neighbor of neighbors) {
      const node = matrix.getCell(neighbor.row, neighbor.col);

      if (!node.isVisited && node.type != GridNodeType.wall) {
        node.isVisited = true;
        node.parent = { row, col };
        node.distance = node.distance + 1;
        queue.push(neighbor);

        if (node.type != GridNodeType.start && node.type != GridNodeType.end) {
          matrix.animationMatrix[node.coord.row][node.coord.col] = {
            coord: node.coord,
            step: step,
          };
        }
      }
    }
    step++;
  }

  return [];
};
