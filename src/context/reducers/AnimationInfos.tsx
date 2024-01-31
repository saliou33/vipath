import {
  AnimationMatrix,
  AnimationState,
  GridMatrix,
  GridNodeType,
  IGridNode,
  ViewDetails,
} from "../../utils/interface";

// action
export enum AnimationInfosActionType {
  play,
  pause,
  view,
  random,
  reset,
  clear,
  update,
  speed,
  nodeSize,
}
export type AnimationInfosAction =
  | {
      type: AnimationInfosActionType.play;
      payload: AnimationMatrix;
    }
  | {
      type: AnimationInfosActionType.pause | AnimationInfosActionType.clear;
    }
  | {
      type: AnimationInfosActionType.reset;
      payload: AnimationInfos;
    }
  | {
      type: AnimationInfosActionType.update;
      payload: Array<IGridNode>;
    }
  | { type: AnimationInfosActionType.nodeSize; payload: { nodeSize: number } }
  | { type: AnimationInfosActionType.view; payload: ViewDetails }
  | { type: AnimationInfosActionType.speed; payload: { speed: number } };

// state
export interface AnimationInfos {
  cols: number;
  rows: number;
  nodeSize: number;
  speed: number;
  start: IGridNode;
  end: IGridNode;
  matrix: GridMatrix;
  view: ViewDetails;
  animations: AnimationMatrix;
  state: AnimationState;
}

const initialNode = {
  type: GridNodeType.blank,
  coord: { row: 0, col: 0 },
  weight: 0,
  distance: Infinity,
  visited: false,
  parent: null, // coordinates of the parent array used to generate path
  f: 0,
};

export const initialAnimationsInfos: AnimationInfos = {
  cols: Infinity,
  rows: Infinity,
  start: { ...initialNode, type: GridNodeType.start },
  end: { ...initialNode, type: GridNodeType.end },
  matrix: [],
  nodeSize: 30,
  view: { height: 0, width: 0 },
  speed: 1,
  animations: [],
  state: AnimationState.none,
};

export const animationInfosReducer = (
  animationInfos: AnimationInfos,
  action: AnimationInfosAction
): AnimationInfos => {
  switch (action.type) {
    case AnimationInfosActionType.reset:
      return reset(action.payload);

    case AnimationInfosActionType.update:
      return update(animationInfos, action.payload);

    case AnimationInfosActionType.speed:
      return { ...animationInfos };

    case AnimationInfosActionType.view:
      return { ...animationInfos };

    case AnimationInfosActionType.play:
      return {
        ...animationInfos,
        animations: action.payload,
        state: AnimationState.played,
      };

    case AnimationInfosActionType.pause:
      return {
        ...animationInfos,
        state: AnimationState.paused,
      };

    case AnimationInfosActionType.clear:
      return clear(animationInfos);
  }

  return animationInfos;
};

const update = (animationInfos: AnimationInfos, nodes: Array<IGridNode>) => {
  const { matrix } = animationInfos;

  if (matrix) {
    nodes.forEach((node) => {
      matrix[node.coord.row][node.coord.col] = { ...node };
    });
  }

  return { ...animationInfos, matrix };
};

const createMatrix = (
  rows: number,
  cols: number
): [GridMatrix, AnimationMatrix] => {
  const matrix: GridMatrix = [...Array.from({ length: rows }, () => [])];
  const animations: AnimationMatrix = [
    ...Array.from({ length: rows }, () => []),
  ];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      matrix[i].push({
        ...initialNode,
        coord: { row: i, col: j },
      });

      animations[i].push({
        step: 0,
        coord: { row: i, col: j },
      });
    }
  }

  return [matrix, animations];
};

const reset = (animationInfos: AnimationInfos) => {
  const { cols, rows, nodeSize, view } = animationInfos;

  // create the blank matrix
  const newCols = cols == Infinity ? Math.floor(view?.width / nodeSize) : cols;
  const newRows = rows == Infinity ? Math.floor(view?.height / nodeSize) : rows;
  const [matrix, animations] = createMatrix(newRows, newCols);

  // TODO: handle pattern type

  // add start node and end node
  const [colStart, colEnd] = [
    Math.floor(newCols / 6),
    Math.floor(newCols - newCols / 6),
  ];

  const [rowStart, rowEnd] = [Math.floor(newRows / 2), Math.floor(newRows / 2)];

  matrix[rowStart][colStart] = {
    ...matrix[rowStart][colStart],
    type: GridNodeType.start,
    distance: 0,
  };

  matrix[rowEnd][colEnd] = {
    ...matrix[rowEnd][colEnd],
    type: GridNodeType.end,
  };

  return {
    ...animationInfos,
    matrix,
    animations,
    state: AnimationState.none,
    cols: newCols,
    rows: newRows,
    start: matrix[rowStart][colStart],
    end: matrix[rowEnd][colEnd],
  };
};

const clear = (animationInfos: AnimationInfos) => {
  const { rows, cols } = animationInfos;

  const animations: AnimationMatrix = [
    ...Array.from({ length: rows }, () => []),
  ];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      animations[i].push({
        step: 0,
        coord: { row: i, col: j },
      });
    }
  }

  return {
    ...animationInfos,
    animations,
    state: AnimationState.none,
  };
};
