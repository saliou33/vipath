import {
  AnimationMatrix,
  Coord,
  GridMatrix,
  GridNodeType,
  IGridNode,
} from "../utils/interface";
import { Matrix } from "./matrix";
import { PriorityQueue } from "./priorityQueue";

export const djikstra = (
  gridMatrix: GridMatrix,
  animationMatrix: AnimationMatrix,
  start: Coord,
  end: Coord,
  rows: number,
  cols: number
) => {
  const matrix = new Matrix(gridMatrix, animationMatrix, rows, cols);
  const queue = new PriorityQueue();
  queue.enqueue(matrix.getCell(start.row, start.col));
  let step = 1;

  while (queue.length() > 0) {
    const currentNode = queue.dequeue() as IGridNode;
    const {
      coord: { row, col },
    } = currentNode;

    if (row === end.row && col === end.col) {
      return matrix.animation(start, end, step);
    }

    const neighbors = matrix.getNeighbors(row, col);

    for (const neighbor of neighbors) {
      const node = matrix.getCell(neighbor.row, neighbor.col);

      if (!node.isVisited && node.type != GridNodeType.wall) {
        const newDistance = currentNode.distance + node.weight;
        if (newDistance < node.distance) {
          node.isVisited = true;
          node.parent = { row, col };
          node.distance = newDistance;
          queue.enqueue(node);
          if (
            node.type != GridNodeType.start &&
            node.type != GridNodeType.end
          ) {
            matrix.animationMatrix[node.coord.row][node.coord.col] = {
              coord: node.coord,
              step: step,
            };
          }
        }
      }
    }
    step++;
  }

  return [];
};
