import { AnimationMatrix, GridMatrix, IGridNode } from "../utils/interface";
import { Matrix } from "./Matrix";

export const a_star = (
  grid: GridMatrix,
  animations: AnimationMatrix,
  start: IGridNode,
  end: IGridNode,
  rows: number,
  cols: number
) => {
  const matrix = new Matrix(grid, animations, rows, cols);
  let nodes: Array<IGridNode> = [];
  nodes.push(start);

  while (nodes.length > 0) {
    const current = nodes.reduce((minNode, node) =>
      node.f < minNode.f ? node : minNode
    );
    nodes = nodes.filter((node) => node !== current);
    current.visited = true;

    if (matrix.eq(current, end)) {
      return matrix.animate(start, end);
    }

    const neighbors = matrix.getNeighbors(current);

    for (const neighbor of neighbors) {
      if (neighbor.visited) {
        continue;
      }

      const g = current.distance + neighbor.weight;
      const included = nodes.some((node) => matrix.eq(current, node));

      if (!included || g < neighbor.distance) {
        neighbor.parent = current;
        neighbor.distance = g;
        neighbor.f = g + matrix.h(neighbor, end);
        matrix.animateStep(neighbor);
        matrix.increment();
      }

      if (!included) nodes.push(neighbor);
    }
  }

  return matrix.animations;
};
