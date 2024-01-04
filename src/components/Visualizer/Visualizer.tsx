import { useContext, useLayoutEffect, useRef } from "react";
import Grid from "../Grid/Grid";
import { Context, ContextValueType } from "../../context/context";
import { AnimationInfosActionType } from "../../context/reducers/AnimationInfos";

const Visualizer = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { animationInfos, dispatchAnimationInfos } =
    useContext<ContextValueType>(Context);

  useLayoutEffect(() => {
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
  }, []);

  return (
    <div className="flex justify-center items-center h-full w-full" ref={ref}>
      <Grid />
    </div>
  );
};

export default Visualizer;
