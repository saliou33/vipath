import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { Context, ContextValueType } from "../../context/context";
import { AnimationInfosActionType } from "../../context/reducers/AnimationInfos";
import Grid from "../Grid/Grid";
import PointerIndicator from "../Pointer/PointerIndicator";
import { AnimationActionType } from "../../utils/contant";
import { ActionInfosActionType } from "../../context/reducers/ActionInfos";

const Visualizer = () => {
  const ref = useRef<HTMLDivElement>(null);

  const {
    animationInfos,
    actionInfos,
    dispatchAnimationInfos,
    dispatchActionInfos,
  } = useContext<ContextValueType>(Context);

  const resetMatrix = () => {
    dispatchAnimationInfos({
      type: AnimationInfosActionType.reset,
      payload: {
        ...animationInfos,
        view: !ref.current
          ? animationInfos.view
          : {
              width: ref.current.offsetWidth,
              height: ref.current.offsetHeight,
            },
      },
    });
  };

  const cleanAnimationAction = () => {
    dispatchActionInfos({
      type: ActionInfosActionType.set_action,
      payload: { animationAction: null },
    });
  };

  useLayoutEffect(() => {
    resetMatrix();
  }, []);

  useEffect(() => {
    const { animationAction } = actionInfos;

    if (animationAction) {
      switch (animationAction.key) {
        case AnimationActionType.play:
          break;
        case AnimationActionType.pause:
          break;
        case AnimationActionType.reset:
          resetMatrix();
          break;
      }
      cleanAnimationAction();
    }
  }, [actionInfos.animationAction]);

  return (
    <div className="flex justify-center items-center h-full w-full" ref={ref}>
      <PointerIndicator parentRef={ref} />
      <Grid />
    </div>
  );
};

export default Visualizer;
