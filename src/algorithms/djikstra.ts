import {
  ArrayGridNode,
  Coord,
  GridMatrix,
  GridNodeType,
  IGridNode,
} from "../utils/interface";
import { Matrix } from "./matrix";
import { PriorityQueue } from "./priorityQueue";

export const djikstra = (
  gridMatrix: GridMatrix,
  start: Coord,
  end: Coord,
  rows: number,
  cols: number
) => {
  const matrix = new Matrix(gridMatrix, rows, cols);
  const queue = new PriorityQueue();
  queue.enqueue(matrix.getCell(start.row, start.col));

  const animationArray = [];

  while (queue.length() > 0) {
    const currentNode = queue.dequeue() as IGridNode;
    const {
      coord: { row, col },
    } = currentNode;

    if (row === end.row && col === end.col) {
      return [...animationArray, ...matrix.path(start, end)];
    }

    // animate unvisited neighbors
    const unvisitedNeighbors: ArrayGridNode = [];
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
          unvisitedNeighbors.push({
            ...node,
            class: "play node",
          });
        }
      }
    }

    if (unvisitedNeighbors.length > 0) {
      animationArray.push(unvisitedNeighbors);
    }
  }

  return [];
};
