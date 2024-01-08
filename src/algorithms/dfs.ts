import {
  ArrayCoord,
  ArrayGridNode,
  Coord,
  GridMatrix,
  GridNodeType,
} from "../utils/interface";
import { Matrix } from "./matrix";

export const dfs = (
  gridMatrix: GridMatrix,
  start: Coord,
  end: Coord,
  rows: number,
  cols: number
) => {
  const matrix = new Matrix(gridMatrix, rows, cols);
  const stack: ArrayCoord = [start];
  const animationArray = [];

  while (stack.length > 0) {
    const { row, col } = stack.pop() as Coord;

    if (row === end.row && col === end.col) {
      return [...animationArray, ...matrix.path(start, end)];
    }

    // animate unvisited neighbors
    const unvisitedNeighbors: ArrayGridNode = [];

    const neighbors = matrix.getNeighbors(row, col);
    for (const neighbor of neighbors) {
      const node = matrix.getCell(neighbor.row, neighbor.col);

      if (!node.isVisited && node.type != GridNodeType.wall) {
        node.isVisited = true;
        node.parent = { row, col };
        node.distance = node.distance + 1;
        stack.push(neighbor);

        unvisitedNeighbors.push({
          ...node,
          class: "play node",
        });
      }
    }

    if (unvisitedNeighbors.length > 0) {
      animationArray.push(unvisitedNeighbors);
    }
  }

  return [];
};
