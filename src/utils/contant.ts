import { ReactNode } from "react";
import { IconType } from "react-icons";
import {
  HiMiniPlay,
  HiMiniPause,
  HiMiniNoSymbol,
  HiMiniArrowPath,
  HiMiniRectangleStack,
  HiMiniLockClosed,
  HiMiniCurrencyDollar,
  HiMiniFaceSmile,
  HiMiniBuildingOffice,
} from "react-icons/hi2";
import { Coord, GridMatrix, GridNodeType } from "./interface";

export enum PointerType {
  wall = "wall",
  bridge = "bridge",
  weight = "weight",
  blank = "blank",
}

export enum AlgoType {
  djikstra,
  greedy,
  swarm,
  convergent_swarm,
  bidirectional_swarm,
  bfs,
  dfs,
}

export enum PatternType {
  maze,
  blank,
}

export enum AnimationActionType {
  play = "play",
  pause = "pause",
  clear = "clear",
  reset = "reset",
}

export type ItemListKeyType =
  | PointerType
  | AlgoType
  | PatternType
  | AnimationActionType;

export type ItemFnArgType = Array<string | number | GridMatrix | Coord>;

export type ItemType = {
  key: ItemListKeyType;
  name: string;
  icon?: IconType;
  class?: string;
};

export class ItemList extends Map<ItemListKeyType, ItemType> {
  map(fn: (value: ItemType, key: ItemListKeyType) => ReactNode): ReactNode {
    const results: ReactNode[] = [];
    super.forEach((item, key) => {
      results.push(fn(item, key));
    });

    return results;
  }
}

export const algorithms: ItemList = new ItemList([
  [AlgoType.djikstra, { key: AlgoType.djikstra, name: "Djikstra's Algorithm" }],
  [AlgoType.greedy, { key: AlgoType.greedy, name: "Greedy Algorithm" }],
  [AlgoType.swarm, { key: AlgoType.swarm, name: "Swarm" }],
  [AlgoType.bfs, { key: AlgoType.bfs, name: "Breadth-first Search" }],
  [AlgoType.dfs, { key: AlgoType.dfs, name: "Depth-first Search" }],
  [
    AlgoType.convergent_swarm,
    { key: AlgoType.convergent_swarm, name: "Convergent Swarm Algorithm" },
  ],
  [
    AlgoType.bidirectional_swarm,
    {
      key: AlgoType.bidirectional_swarm,
      name: "Bidirectional Swarm Algorithm",
    },
  ],
]);

export const actions: ItemList = new ItemList([
  [
    AnimationActionType.play,
    {
      key: AnimationActionType.play,
      name: "play",
      icon: HiMiniPlay,
      class: AnimationActionType.play,
    },
  ],
  [
    AnimationActionType.pause,
    {
      key: AnimationActionType.pause,
      name: "pause",
      icon: HiMiniPause,
      class: AnimationActionType.pause,
    },
  ],
  [
    AnimationActionType.clear,
    {
      key: AnimationActionType.clear,
      name: "clear",
      icon: HiMiniNoSymbol,
      class: AnimationActionType.clear,
    },
  ],
  [
    AnimationActionType.reset,
    {
      key: AnimationActionType.reset,
      name: "reset",
      icon: HiMiniArrowPath,
      class: AnimationActionType.reset,
    },
  ],
]);

export const NodeIconMap = {
  [GridNodeType.start]: HiMiniFaceSmile,
  [GridNodeType.end]: HiMiniBuildingOffice,
  [GridNodeType.weight]: HiMiniLockClosed,
  [GridNodeType.bridge]: HiMiniCurrencyDollar,
  [GridNodeType.wall]: null,
  [GridNodeType.blank]: null,
};

export const pointers: ItemList = new ItemList([
  [
    PointerType.wall,
    { key: PointerType.wall, name: "wall", icon: HiMiniRectangleStack },
  ],
  [
    PointerType.bridge,
    { key: PointerType.bridge, name: "bridge", icon: HiMiniCurrencyDollar },
  ],
  [
    PointerType.weight,
    { key: PointerType.weight, name: "weight", icon: HiMiniLockClosed },
  ],
  [PointerType.blank, { key: PointerType.blank, name: "" }],
]);

export const patterns: ItemList = new ItemList([
  [PatternType.blank, { key: PatternType.blank, name: "" }],
]);
