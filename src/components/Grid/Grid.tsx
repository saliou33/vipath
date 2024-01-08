import { useContext, useState } from "react";
import { Context, ContextValueType } from "../../context/context";
import GridNode from "../GridNode/GridNode";

const Grid = () => {
  const { animationInfos, actionInfos, dispatchAnimationInfos } =
    useContext<ContextValueType>(Context);
  const { matrix, rows, cols, nodeSize } = animationInfos;
  const [isDrawing, setIsDrawing] = useState(false);

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
              pointer={actionInfos.selectedPointer}
              node={node}
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
