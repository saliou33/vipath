import { useContext, useState } from "react";
import { Context, ContextValueType } from "../../context/context";
import GridNode from "../GridNode/GridNode";
import { AnimationState } from "../../utils/interface";

const Grid = () => {
  const { animationInfos, actionInfos, dispatchAnimationInfos } =
    useContext<ContextValueType>(Context);

  const { matrix, state, rows, cols, nodeSize, animations, speed } =
    animationInfos;

  const [isDrawing, setIsDrawing] = useState(false);

  const [pausedStep, setPausedStep] = useState(0);

  if (state == AnimationState.none && pausedStep > 0) {
    setPausedStep(0);
  }

  const gridStyle = {
    display: "grid",
    gridTemplateRows: `repeat(${rows}, ${nodeSize - 1}px)`,
    gridTemplateColumns: `repeat(${cols}, ${nodeSize - 1}px)`,
    gap: "1px",
  };

  return (
    <div style={gridStyle}>
      {matrix &&
        matrix.map((row, i) =>
          row.map((node, j) => (
            <GridNode
              key={`${i}-${j}`}
              node={node}
              state={state}
              speed={speed}
              animation={animations[i][j]}
              pointer={actionInfos.selectedPointer}
              pausedStep={pausedStep}
              setPausedStep={setPausedStep}
              isDrawing={isDrawing}
              setIsDrawing={setIsDrawing}
              dispatch={dispatchAnimationInfos}
            />
          ))
        )}
    </div>
  );
};

export default Grid;
