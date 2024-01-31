import {
  AnimationMatrix,
  GridMatrix,
  GridNodeType,
  IGridNode,
} from "../utils/interface";

export class Matrix {
  rows: number;
  cols: number;
  grid: GridMatrix;
  animations: AnimationMatrix;
  step: number;

  constructor(
    grid: GridMatrix,
    animations: AnimationMatrix,
    rows: number,
    cols: number
  ) {
    this.rows = rows;
    this.cols = cols;
    this.grid = structuredClone(grid);
    this.animations = animations;
    this.step = 1;
  }

  setCell(row: number, col: number, value: IGridNode) {
    this.grid[row][col] = value;
  }

  getCell(row: number, col: number): IGridNode {
    return this.grid[row][col];
  }

  getWeight(row: number, col: number): number {
    return this.getCell(row, col).weight;
  }

  getNeighbors(node: IGridNode): Array<IGridNode> {
    const { row, col } = node.coord;
    const neighbors: Array<IGridNode> = [];

    if (row > 0 && this.getCell(row - 1, col).type != GridNodeType.wall) {
      neighbors.push(this.getCell(row - 1, col));
    }

    if (
      row < this.rows - 1 &&
      this.getCell(row + 1, col).type != GridNodeType.wall
    ) {
      neighbors.push(this.getCell(row + 1, col));
    }

    if (col > 0 && this.getCell(row, col - 1).type != GridNodeType.wall) {
      neighbors.push(this.getCell(row, col - 1));
    }

    if (
      col < this.cols - 1 &&
      this.getCell(row, col + 1).type != GridNodeType.wall
    ) {
      neighbors.push(this.getCell(row, col + 1));
    }

    return neighbors;
  }

  reconstructPath(start: IGridNode, end: IGridNode): Array<IGridNode> {
    const path: Array<IGridNode> = [];
    const startNode = this.getCell(start.coord.row, start.coord.col);
    const endNode = this.getCell(end.coord.row, end.coord.col);
    let current = endNode;

    while (current && !this.eq(current, startNode)) {
      path.unshift(current);
      current = current.parent as IGridNode;
    }

    path.unshift(startNode);

    return path;
  }

  eq(node1: IGridNode, node2: IGridNode): boolean {
    return (
      node1.coord.row === node2.coord.row && node1.coord.col === node2.coord.col
    );
  }

  h(node: IGridNode, end: IGridNode): number {
    return (
      Math.abs(node.coord.row - end.coord.row) +
      Math.abs(node.coord.col - end.coord.col)
    );
  }

  increment() {
    this.step++;
  }

  animateStep(node: IGridNode) {
    if (node.type != GridNodeType.start && node.type != GridNodeType.end) {
      this.animations[node.coord.row][node.coord.col] = {
        coord: node.coord,
        step: this.step,
      };
    }
  }

  animate(start: IGridNode, end: IGridNode) {
    const path = this.reconstructPath(start, end);
    let foot = 0;

    path.forEach(({ coord }) => {
      this.animations[coord.row][coord.col] = {
        ...this.animations[coord.row][coord.col],
        inPath: true,
        pathStep: this.step + foot++,
      };
    });

    return this.animations;
  }
}
