import {
  AlgoType,
  ItemType,
  PatternType,
  PointerType,
  algorithms,
  patterns,
  pointers,
} from "../../utils/contant";

export enum ActionInfosActionType {
  set_algo,
  set_pointer,
  set_pattern,
  set_action,
}

export type ActionInfosAction =
  | {
      type: ActionInfosActionType.set_action;
      payload: { animationAction: ItemType };
    }
  | {
      type: ActionInfosActionType.set_algo;
      payload: { selectedAlgo: ItemType };
    }
  | {
      type: ActionInfosActionType.set_pointer;
      payload: { selectedPointer: ItemType };
    }
  | {
      type: ActionInfosActionType.set_pattern;
      payload: { selectedPattern: ItemType };
    };

export interface ActionInfos {
  selectedAlgo: ItemType;
  selectedPointer: ItemType;
  selectedPattern: ItemType;
  animationAction?: ItemType;
}

export const initialActionInfos: ActionInfos = {
  selectedAlgo: algorithms.get(AlgoType.djikstras) as ItemType,
  selectedPointer: pointers.get(PointerType.blank) as ItemType,
  selectedPattern: patterns.get(PatternType.blank) as ItemType,
};

export const actionInfosReducer = (
  actionInfos: ActionInfos,
  action: ActionInfosAction
): ActionInfos => {
  switch (action.type) {
    case ActionInfosActionType.set_action:
      return {
        ...actionInfos,
        animationAction: action.payload.animationAction,
      };
    case ActionInfosActionType.set_algo:
      return { ...actionInfos, selectedAlgo: action.payload.selectedAlgo };
    case ActionInfosActionType.set_pointer:
      return {
        ...actionInfos,
        selectedPointer: action.payload.selectedPointer,
      };
    case ActionInfosActionType.set_pattern:
      return {
        ...actionInfos,
        selectedPattern: action.payload.selectedPattern,
      };
    default:
      return actionInfos;
  }
};
