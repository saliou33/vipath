import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { Context, ContextValueType } from "../../context/context";
import { AnimationInfosActionType } from "../../context/reducers/AnimationInfos";
import { AlgoType, AnimationActionType } from "../../utils/contant";
import { ActionInfosActionType } from "../../context/reducers/ActionInfos";
import { a_star, bfs, bi_bfs, dfs, djikstra } from "../../algorithms";
import { AnimationMatrix } from "../../utils/interface";
import PointerIndicator from "../PointerIndicator/PointerIndicator";
import Grid from "../Grid/Grid";

const Visualizer = () => {
  const ref = useRef<HTMLDivElement>(null);

  const {
    animationInfos,
    actionInfos,
    dispatchAnimationInfos,
    dispatchActionInfos,
  } = useContext<ContextValueType>(Context);

  const { matrix, animations, start, end, rows, cols } = animationInfos;

  const { animationAction, selectedAlgo } = actionInfos;

  const play = (animations: AnimationMatrix) => {
    dispatchAnimationInfos({
      type: AnimationInfosActionType.play,
      payload: animations,
    });
  };

  const clear = () => {
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

  const pause = () => {
    dispatchAnimationInfos({
      type: AnimationInfosActionType.pause,
    });
  };

  const run = () => {
    switch (selectedAlgo.key) {
      case AlgoType.bfs:
        play(bfs(matrix, animations, start, end, rows, cols));
        break;
      case AlgoType.dfs:
        play(dfs(matrix, animations, start, end, rows, cols));
        break;
      case AlgoType.djikstra:
        play(djikstra(matrix, animations, start, end, rows, cols));
        break;
      case AlgoType.a_star:
        play(a_star(matrix, animations, start, end, rows, cols));
        break;
      case AlgoType.bi_bfs:
        play(bi_bfs(matrix, animations, start, end, rows, cols));
        break;
    }
  };

  const reset = () => {
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

  // initializer
  useLayoutEffect(() => {
    reset();
  }, []);

  // effect for handling nav action
  useEffect(() => {
    if (animationAction) {
      switch (animationAction.key) {
        case AnimationActionType.play:
          run();
          break;
        case AnimationActionType.pause:
          pause();
          break;
        case AnimationActionType.clear:
          clear();
          break;
        case AnimationActionType.reset:
          reset();
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
