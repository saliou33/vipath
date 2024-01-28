import {
  AnimationMatrix,
  ArrayGridNode,
  Coord,
  GridMatrix,
  GridNodeType,
  ViewDetails,
} from "../../utils/interface";

// action
export enum AnimationInfosActionType {
  play,
  run,
  pause,
  view,
  random,
  reset,
  clear,
  update,
  speed,
  nodeSize,
  animate,
}
export type AnimationInfosAction =
  | {
      type: AnimationInfosActionType.play;
      payload: AnimationMatrix;
    }
  | {
      type:
        | AnimationInfosActionType.pause
        | AnimationInfosActionType.run
        | AnimationInfosActionType.clear;
    }
  | {
      type: AnimationInfosActionType.reset;
      payload: AnimationInfos;
    }
  | {
      type: AnimationInfosActionType.update;
      payload: ArrayGridNode;
    }
  | {
      type: AnimationInfosActionType.animate;
      payload: { nodes: ArrayGridNode; cursor: number };
    }
  | { type: AnimationInfosActionType.nodeSize; payload: { nodeSize: number } }
  | { type: AnimationInfosActionType.view; payload: ViewDetails }
  | { type: AnimationInfosActionType.speed; payload: { speed: number } };

// state
export interface AnimationInfos {
  cols: number;
  rows: number;
  startCoord: Coord;
  endCoord: Coord;
  matrix: GridMatrix | null;
  view: ViewDetails;
  nodeSize: number;
  animations: AnimationMatrix;
  cursor: number;
  isRunning: boolean;
  speed: number;
}
export const initialAnimationsInfos: AnimationInfos = {
  cols: Infinity,
  rows: Infinity,
  startCoord: { row: 0, col: 0 },
  endCoord: { row: 0, col: 0 },
  matrix: [],
  nodeSize: 30,
  view: { height: 0, width: 0 },
  speed: 10,
  animations: [],
  isRunning: false,
  cursor: 0,
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

    case AnimationInfosActionType.animate:
      return {
        ...update(animationInfos, action.payload.nodes),
        cursor: action.payload.cursor,
      };

    case AnimationInfosActionType.speed:
      return { ...animationInfos };

    case AnimationInfosActionType.view:
      return { ...animationInfos };

    case AnimationInfosActionType.play:
      return {
        ...animationInfos,
        animations: action.payload,
        isRunning: true,
      };

    case AnimationInfosActionType.pause:
      return {
        ...animationInfos,
        isRunning: false,
      };

    case AnimationInfosActionType.run:
      return {
        ...animationInfos,
        isRunning: true,
      };

    case AnimationInfosActionType.clear:
      return clear(animationInfos);
  }

  return animationInfos;
};

const update = (animationInfos: AnimationInfos, nodes: ArrayGridNode) => {
  const { matrix } = animationInfos;

  if (matrix) {
    nodes.forEach((node) => {
      matrix[node.coord.row][node.coord.col] = { ...node };
    });
  }

  return { ...animationInfos, matrix };
};

const clear = (animationInfos: AnimationInfos) => {
  return {
    ...animationInfos,
    cursor: 0,
    isRunning: false,
  };
};

const reset = (animationInfos: AnimationInfos) => {
  const { cols, rows, nodeSize, view } = animationInfos;

  // fn to create matrix
  const createMatrix = (
    cols: number,
    rows: number
  ): [GridMatrix, AnimationMatrix] => {
    const matrix: GridMatrix = [...Array.from({ length: rows }, () => [])];
    const animations: AnimationMatrix = [
      ...Array.from({ length: rows }, () => []),
    ];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        matrix[i].push({
          type: GridNodeType.blank,
          coord: { row: i, col: j },
          weight: 0,
          distance: Infinity,
          isVisited: false,
          parent: null, // coordinates of the parent array used to generate path
        });

        animations[i].push({
          step: 0,
          coord: { row: i, col: j },
        });
      }
    }

    return [matrix, animations];
  };

  // create the blank matrix
  const newCols = cols == Infinity ? Math.floor(view?.width / nodeSize) : cols;
  const newRows = rows == Infinity ? Math.floor(view?.height / nodeSize) : rows;
  const [matrix, animations] = createMatrix(newCols, newRows);

  // TODO: handle pattern type

  // add start node and end node
  const [colStart, colGoal] = [
    Math.floor(newCols / 6),
    Math.floor(newCols - newCols / 6),
  ];

  const [rowStart, rowGoal] = [
    Math.floor(newRows / 2),
    Math.floor(newRows / 2),
  ];

  matrix[rowStart][colStart] = {
    ...matrix[rowStart][colStart],
    type: GridNodeType.start,
    distance: 0,
  };

  matrix[rowGoal][colGoal] = {
    ...matrix[rowGoal][colGoal],
    type: GridNodeType.end,
  };

  return {
    ...animationInfos,
    matrix,
    animations,
    shortestPath: [],
    isRunning: false,
    cols: newCols,
    rows: newRows,
    startCoord: { row: rowStart, col: colStart },
    endCoord: { row: rowGoal, col: colGoal },
  };
};