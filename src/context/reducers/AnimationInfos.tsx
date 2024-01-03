import {
  AnimationArrayType,
  AnimationType,
  ArrayCoordType,
  GridMatrixType,
  GridNodeType,
  ViewType,
} from "../../utils/interface";

// action
export enum AnimationInfosActionType {
  run,
  view,
  random,
  reset,
  speed,
  animate,
}
export type AnimationInfosAction =
  | {
      type: AnimationInfosActionType.run;
    }
  | {
      type: AnimationInfosActionType.reset;
      payload?: { cols?: number; rows?: number; pattern?: string };
    }
  | { type: AnimationInfosActionType.view; payload: ViewType }
  | { type: AnimationInfosActionType.speed; payload: { speed: number } }
  | { type: AnimationInfosActionType.animate; payload: AnimationType };

// state
export interface AnimationInfos {
  cols: number;
  rows: number;
  matrix: GridMatrixType | null;
  animations: AnimationArrayType | null;
  shortestPath: ArrayCoordType | null;
  view: ViewType | null;
  isRunning: boolean;
  speed: number;
}
export const initialAnimationsInfos: AnimationInfos = {
  cols: Infinity,
  rows: Infinity,
  matrix: [],
  animations: [],
  shortestPath: [],
  view: null,
  isRunning: false,
  speed: 100,
};

export const animationInfosReducer = (
  animationInfos: AnimationInfos,
  action: AnimationInfosAction
): AnimationInfos => {
  switch (action.type) {
    case AnimationInfosActionType.reset:
      return { ...animationInfos };
    case AnimationInfosActionType.speed:
      return { ...animationInfos };
    case AnimationInfosActionType.view:
      return { ...animationInfos };
    case AnimationInfosActionType.run:
      return { ...animationInfos };
    case AnimationInfosActionType.animate:
      return { ...animationInfos };
  }

  return animationInfos;
};

const resetMatrix = (
  cols?: number,
  rows?: number,
  view?: ViewType,
  pattern?: string
): GridMatrixType => {
  const generateMatrix = (cols, rows, pattern): GridMatrixType =>
    //   Array.from({ length: rows }, () =>
    //   Array.from({ length: cols }, () => {
    //     type: GridNodeType.blank,
    //     weight: 0,
    //     distance: Infinity,
    //     isVisited: false,
    //     parent: null, // coordinates of the parent array used to generate path
    //     class: '',
    //   }))
    // )

    [];

  if (!cols || !rows) {
  }

  return [];
};
