import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { Context, ContextValueType } from "../../context/context";
import { AnimationInfosActionType } from "../../context/reducers/AnimationInfos";
import Grid from "../Grid/Grid";
import PointerIndicator from "../PointerIndicator/PointerIndicator";
import { AlgoType, AnimationActionType } from "../../utils/contant";
import { ActionInfosActionType } from "../../context/reducers/ActionInfos";
import { bfs, dfs, djikstra } from "../../algorithms";
import { AnimationMatrix, GridMatrix } from "../../utils/interface";

const Visualizer = () => {
  const ref = useRef<HTMLDivElement>(null);

  const {
    animationInfos,
    actionInfos,
    dispatchAnimationInfos,
    dispatchActionInfos,
  } = useContext<ContextValueType>(Context);

  const { matrix, animations, startCoord, endCoord, rows, cols } =
    animationInfos;
  const { animationAction, selectedAlgo } = actionInfos;

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

  const playAnimation = (animations: AnimationMatrix) => {
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

  // const runAnimation = () => {
  //   dispatchAnimationInfos({
  //     type: AnimationInfosActionType.run,
  //   });
  // };

  // initializer
  useLayoutEffect(() => {
    resetMatrix();
  }, []);

  // effect for handling nav action
  useEffect(() => {
    if (animationAction) {
      switch (animationAction.key) {
        case AnimationActionType.play:
          switch (selectedAlgo.key) {
            case AlgoType.bfs:
              playAnimation(
                bfs(
                  matrix as GridMatrix,
                  animations as AnimationMatrix,
                  startCoord,
                  endCoord,
                  rows,
                  cols
                )
              );
              break;

            case AlgoType.dfs:
              playAnimation(
                dfs(
                  matrix as GridMatrix,
                  animations as AnimationMatrix,
                  startCoord,
                  endCoord,
                  rows,
                  cols
                )
              );
              break;

            case AlgoType.djikstra:
              playAnimation(
                djikstra(
                  matrix as GridMatrix,
                  animations as AnimationMatrix,
                  startCoord,
                  endCoord,
                  rows,
                  cols
                )
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
  }, [animationAction]);

  return (
    <div className="flex justify-center items-center h-full w-full" ref={ref}>
      <PointerIndicator parentRef={ref} />
      <Grid />
    </div>
  );
};

export default Visualizer;
