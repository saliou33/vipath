export type CoordType = Array<2>;
export type GridMatrixType = Array<Array<IGridNode>>;
export type AnimationArrayType = Array<IAnimation>;
export type ArrayCoordType = Array<CoordType>;
export type ViewType = IView;
export type AnimationType = IAnimation;

export enum GridNodeType {
  goal,
  root,
  weighted,
  bridge,
  wall,
  blank,
}

export interface IGridNode {
  type: GridNodeType;
  weight: number;
  distance: number;
  isVisited: number;
  parent: CoordType; // coordinates of the parent array used to generate path
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
