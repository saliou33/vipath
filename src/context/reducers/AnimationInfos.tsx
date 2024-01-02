export interface AnimationInfos {
  speed?: number;
}

export type AnimationInfosAction =
  | {
      type: "speed";
      payload: { speed: number };
    }
  | {
      type: "random";
    };

export const initialAnimationsInfos: AnimationInfos = {
  speed: 100,
};

export const animationInfosReducer = (
  animationInfos: AnimationInfos,
  action: AnimationInfosActionType
): AnimationInfos => {
  return animationInfos;
};
