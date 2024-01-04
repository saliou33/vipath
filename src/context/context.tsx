import { Dispatch, createContext } from "react";
import {
  AnimationInfos,
  AnimationInfosAction,
  initialAnimationsInfos,
} from "./reducers/AnimationInfos";

export type ContextValueType = {
  animationInfos: AnimationInfos;
  dispatchAnimationInfos: Dispatch<AnimationInfosAction>;
};

export const Context = createContext<ContextValueType>({
  animationInfos: initialAnimationsInfos,
  dispatchAnimationInfos: () =>
    console.log("fn{dispatchAnimationInfos} not set"),
});
