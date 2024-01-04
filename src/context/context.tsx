import { Dispatch, createContext } from "react";
import {
  AnimationInfos,
  AnimationInfosAction,
  initialAnimationsInfos,
} from "./reducers/AnimationInfos";
import {
  ActionInfos,
  ActionInfosAction,
  initialActionInfos,
} from "./reducers/ActionInfos";

export type ContextValueType = {
  animationInfos: AnimationInfos;
  dispatchAnimationInfos: Dispatch<AnimationInfosAction>;
  actionInfos: ActionInfos;
  dispatchActionInfos: Dispatch<ActionInfosAction>;
};

export const Context = createContext<ContextValueType>({
  animationInfos: initialAnimationsInfos,
  dispatchAnimationInfos: () =>
    console.log("fn{dispatchAnimationInfos} not set"),
  actionInfos: initialActionInfos,
  dispatchActionInfos: () => console.log("fn{dispatchActionInfos} not set"),
});
