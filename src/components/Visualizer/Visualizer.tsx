import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Context, ContextValueType } from "../../context/context";
import { AnimationInfosActionType } from "../../context/reducers/AnimationInfos";
import Grid from "../Grid/Grid";
import PointerIndicator from "../PointerIndicator/PointerIndicator";
import { AlgoType, AnimationActionType } from "../../utils/contant";
import { ActionInfosActionType } from "../../context/reducers/ActionInfos";
import { bfs, dfs } from "../../algorithms";
import { ArrayGridNode, GridMatrix } from "../../utils/interface";

const Visualizer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<number>(0);

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

  const playAnimation = (animations: Array<ArrayGridNode>) => {
    dispatchAnimationInfos({
      type: AnimationInfosActionType.play,
      payload: animations,
    });
  };

  const clearAnimation = () => {
    dispatchAnimationInfos({
      type: AnimationInfosActionType.clear,
    });
  };

  const cleanAction = () => {
    dispatchActionInfos({
      type: ActionInfosActionType.set_action,
      payload: { animationAction: null },
    });
  };

  const pauseAnimation = () => {
    dispatchAnimationInfos({
      type: AnimationInfosActionType.pause,
    });
  };

  const runAnimation = () => {
    dispatchAnimationInfos({
      type: AnimationInfosActionType.run,
    });
  };

  // initializer
  useLayoutEffect(() => {
    resetMatrix();
  }, []);

  // effect for handling nav action
  useEffect(() => {
    const { animationAction, selectedAlgo } = actionInfos;
    const { matrix, animations, startCoord, endCoord, rows, cols } =
      animationInfos;

    if (animationAction) {
      switch (animationAction.key) {
        case AnimationActionType.play:
          if (animations && animations?.length > 0) {
            runAnimation();
            return;
          }

          switch (selectedAlgo.key) {
            case AlgoType.bfs:
              playAnimation(
                bfs(matrix as GridMatrix, startCoord, endCoord, rows, cols)
              );
              break;

            case AlgoType.dfs:
              playAnimation(
                dfs(matrix as GridMatrix, startCoord, endCoord, rows, cols)
              );
              break;
          }
          break;
        case AnimationActionType.pause:
          pauseAnimation();
          break;

        case AnimationActionType.clear:
          clearAnimation();
          break;

        case AnimationActionType.reset:
          resetMatrix();
          break;
      }
      cleanAction();
    }
  }, [actionInfos.animationAction]);

  // effects for running animation | loop
  useEffect(() => {
    const { cursor, speed, animations, isRunning } = animationInfos;

    if (isRunning && animations && cursor < animations.length) {
      dispatchAnimationInfos({
        type: AnimationInfosActionType.animate,
        payload: {
          nodes: animations[cursor],
          cursor: cursor + 1,
        },
      });

      // animation loop
      if (speed > 5) {
        setTimeout(() => setStep(cursor + 1), speed);
      } else {
        setStep(cursor + 1);
      }
    }
  }, [animationInfos.isRunning, step]);

  return (
    <div className="flex justify-center items-center h-full w-full" ref={ref}>
      <PointerIndicator parentRef={ref} />
      <Grid />
    </div>
  );
};

export default Visualizer;
