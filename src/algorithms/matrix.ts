import {
  ArrayCoord,
  ArrayGridNode,
  Coord,
  GridMatrix,
  IGridNode,
} from "../utils/interface";

export class Matrix {
  rows: number;
  cols: number;
  gridMatrix: GridMatrix;

  constructor(gridMatrix: GridMatrix, rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.gridMatrix = gridMatrix;
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

  path(start: Coord, end: Coord): Array<ArrayGridNode> {
    const nodes = [];
    const shortesPath = this.reconstructPath(start, end);

    for (const coord of shortesPath) {
      const node = this.getCell(coord.row, coord.col);
      nodes.push([{ ...node, class: "play path" }]);
    }

    return nodes;
  }
}
