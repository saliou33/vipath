import {
  AnimationMatrix,
  ArrayCoord,
  Coord,
  GridMatrix,
  IGridNode,
} from "../utils/interface";

export class Matrix {
  rows: number;
  cols: number;
  gridMatrix: GridMatrix;
  animationMatrix: AnimationMatrix;

  constructor(
    gridMatrix: GridMatrix,
    animationMatrix: AnimationMatrix,
    rows: number,
    cols: number
  ) {
    this.rows = rows;
    this.cols = cols;
    this.gridMatrix = gridMatrix;
    this.animationMatrix = animationMatrix;
  }

  setCell(row: number, col: number, value: IGridNode) {
    this.gridMatrix[row][col] = value;
  }

  getCell(row: number, col: number): IGridNode {
    return this.gridMatrix[row][col];
  }

  getWeight(row: number, col: number): number {
    return this.getCell(row, col).weight;
  }

  getNeighbors(row: number, col: number): ArrayCoord {
    const neighbors = [];

    if (row > 0 && this.getWeight(row - 1, col) === 0) {
      neighbors.push({ row: row - 1, col });
    }

    if (row < this.rows - 1 && this.getWeight(row + 1, col) === 0) {
      neighbors.push({ row: row + 1, col });
    }

    if (col > 0 && this.getWeight(row, col - 1) === 0) {
      neighbors.push({ row, col: col - 1 });
    }

    if (col < this.cols - 1 && this.getWeight(row, col + 1) === 0) {
      neighbors.push({ row, col: col + 1 });
    }

    return neighbors;
  }

  reconstructPath(start: Coord, end: Coord): ArrayCoord {
    const path: ArrayCoord = [];
    let current = end;

    while (current.row !== start.row || current.col !== start.col) {
      path.unshift(current);
      current = this.getCell(current.row, current.col).parent as Coord;
    }

    path.unshift(start);
    return path;
  }

  animation(start: Coord, end: Coord, maxStep: number) {
    const shortesPath = this.reconstructPath(start, end);

    let j = 0;
    for (const coord of shortesPath) {
      this.animationMatrix[coord.row][coord.col] = {
        ...this.animationMatrix[coord.row][coord.col],
        inPath: true,
        pathStep: maxStep + j++,
      };
    }

    return this.animationMatrix;
  }
}
