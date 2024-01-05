export type CoordType = [number, number];
export type GridMatrixType = Array<Array<IGridNode>>;
export type AnimationArrayType = Array<IAnimation>;
export type ArrayCoordType = Array<CoordType>;
export type ViewType = IView;
export type AnimationType = IAnimation;
export type GridNodeIndexedArrayType = Array<{
  index: CoordType;
  node: IGridNode;
}>;

export enum GridNodeType {
  goal = "goal",
  start = "start",
  weight = "weight",
  bridge = "bridge",
  wall = "wall",
  blank = "blank",
}

export interface IGridNode {
  type: GridNodeType;
  weight: number;
  distance: number;
  isVisited: boolean;
  parent: CoordType | null; // coordinates of the parent array used to generate path
  class: string;
}

export interface IAnimation {
  class: string;
  position: ArrayCoordType;
}

export interface IView {
  height: number;
  width: number;
}
