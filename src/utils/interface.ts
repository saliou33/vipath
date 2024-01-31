export type Coord = { row: number; col: number };
export type GridMatrix = Array<Array<IGridNode>>;
export type AnimationMatrix = Array<Array<IAnimationNode>>;
export type ViewDetails = IView;

export enum GridNodeType {
  end = "end",
  start = "start",
  weight = "weight",
  bridge = "bridge",
  wall = "wall",
  blank = "blank",
}

export enum AnimationState {
  none = "none",
  played = "played",
  paused = "paused",
}

export interface IGridNode {
  type: GridNodeType;
  coord: Coord;
  weight: number;
  distance: number;
  visited: boolean;
  parent: IGridNode | null;
  f: number;
}

export interface IView {
  height: number;
  width: number;
}

export interface IAnimationNode {
  coord: Coord;
  step: number;
  inPath?: boolean;
  pathStep?: number;
}
