import {
  AnimationArrayType,
  AnimationType,
  ArrayCoordType,
  GridMatrixType,
  GridNodeIndexedArrayType,
  GridNodeType,
  ViewType,
} from "../../utils/interface";

// action
export enum AnimationInfosActionType {
  run,
  view,
  random,
  reset,
  update,
  speed,
  nodeSize,
  animate,
}
export type AnimationInfosAction =
  | {
      type: AnimationInfosActionType.run;
    }
  | {
      type: AnimationInfosActionType.reset;
      payload: AnimationInfos;
    }
  | {
      type: AnimationInfosActionType.update;
      payload: GridNodeIndexedArrayType;
    }
  | { type: AnimationInfosActionType.nodeSize; payload: { nodeSize: number } }
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
  view: ViewType;
  nodeSize: number;
  isRunning: boolean;
  speed: number;
}
export const initialAnimationsInfos: AnimationInfos = {
  cols: Infinity,
  rows: Infinity,
  matrix: [],
  animations: [],
  shortestPath: [],
  nodeSize: 30,
  view: { height: 0, width: 0 },
  isRunning: false,
  speed: 100,
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
    case AnimationInfosActionType.run:
      return { ...animationInfos };
    case AnimationInfosActionType.animate:
      return { ...animationInfos };
  }

  return animationInfos;
};

const update = (
  animationInfos: AnimationInfos,
  nodes: GridNodeIndexedArrayType
) => {
  const { matrix } = animationInfos;

  if (matrix) {
    nodes.forEach(({ index, node }) => {
      matrix[index[0]][index[1]] = node;
    });
  }

  return { ...animationInfos, matrix };
};

const reset = (animationInfos: AnimationInfos) => {
  const { cols, rows, nodeSize, view } = animationInfos;

  // fn to create matrix
  const createMatrix = (cols: number, rows: number): GridMatrixType => {
    const matrix: GridMatrixType = [...Array.from({ length: rows }, () => [])];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        matrix[i].push({
          type: GridNodeType.blank,
          weight: 1,
          distance: Infinity,
          isVisited: false,
          parent: null, // coordinates of the parent array used to generate path
          class: "",
        });
      }
    }

    return matrix;
  };

  // create the blank matrix
  const newCols = cols == Infinity ? Math.floor(view?.width / nodeSize) : cols;
  const newRows = rows == Infinity ? Math.floor(view?.height / nodeSize) : rows;
  const matrix = createMatrix(newCols, newRows);

  // TODO: handle pattern type

  // add start node and goal node
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
    type: GridNodeType.goal,
  };

  return {
    ...animationInfos,
    matrix,
    shortestPath: [],
    isRunning: false,
    cols: newCols,
    rows: newRows,
  };
};
