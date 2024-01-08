export type Coord = { row: number; col: number };
export type GridMatrix = Array<Array<IGridNode>>;
export type ArrayCoord = Array<Coord>;
export type ArrayGridNode = Array<IGridNode>;
export type ViewDetails = IView;

export enum GridNodeType {
  end = "end",
  start = "start",
  weight = "weight",
  bridge = "bridge",
  wall = "wall",
  blank = "blank",
}

export interface IGridNode {
  type: GridNodeType;
  coord: Coord;
  weight: number;
  distance: number;
  isVisited: boolean;
  parent: Coord | null; // coordinates of the parent array used to generate path
  class: string;
}

export interface IView {
  height: number;
  width: number;
}
