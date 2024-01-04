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
  select_algo,
  select_pointer,
  select_pattern,
}

export type ActionInfosAction =
  | {
      type: ActionInfosActionType.select_algo;
      payload: { selectedAlgo: ItemType };
    }
  | {
      type: ActionInfosActionType.select_pointer;
      payload: { selectedPointer: ItemType };
    }
  | {
      type: ActionInfosActionType.select_pattern;
      payload: { selectedPattern: ItemType };
    };

export interface ActionInfos {
  selectedAlgo: ItemType;
  selectedPointer: ItemType;
  selectedPattern: ItemType;
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
    case ActionInfosActionType.select_algo:
      return { ...actionInfos, selectedAlgo: action.payload.selectedAlgo };
    case ActionInfosActionType.select_pointer:
      return {
        ...actionInfos,
        selectedPointer: action.payload.selectedPointer,
      };
    case ActionInfosActionType.select_pattern:
      return {
        ...actionInfos,
        selectedPattern: action.payload.selectedPattern,
      };
    default:
      return actionInfos;
  }
};
