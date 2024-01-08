import { ReactNode } from "react";
import { IconType } from "react-icons";
import {
  BiCircle,
  BiDumbbell,
  BiPause,
  BiPlay,
  BiReset,
  BiSolidRectangle,
} from "react-icons/bi";
import { Coord, GridMatrix } from "./interface";

export enum PointerType {
  wall = "wall",
  bridge = "bridge",
  weight = "weight",
  blank = "blank",
}

export enum AlgoType {
  djikstras,
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
  resume = "resume",
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
  [
    AlgoType.djikstras,
    { key: AlgoType.djikstras, name: "Djikstra's Algorithm" },
  ],
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
      icon: BiPlay,
      class: AnimationActionType.play,
    },
  ],
  [
    AnimationActionType.pause,
    {
      key: AnimationActionType.pause,
      name: "pause",
      icon: BiPause,
      class: AnimationActionType.pause,
    },
  ],
  [
    AnimationActionType.reset,
    {
      key: AnimationActionType.reset,
      name: "reset",
      icon: BiReset,
      class: AnimationActionType.reset,
    },
  ],
]);

export const pointers: ItemList = new ItemList([
  [
    PointerType.wall,
    { key: PointerType.wall, name: "wall", icon: BiSolidRectangle },
  ],
  [
    PointerType.bridge,
    { key: PointerType.bridge, name: "bridge", icon: BiCircle },
  ],
  [
    PointerType.weight,
    { key: PointerType.weight, name: "weight", icon: BiDumbbell },
  ],
  [PointerType.blank, { key: PointerType.blank, name: "" }],
]);

export const patterns: ItemList = new ItemList([
  [PatternType.blank, { key: PatternType.blank, name: "" }],
]);
