import { useContext, useState } from "react";
import { Context, ContextValueType } from "../../context/context";
import GridNode from "../GridItem/GridNode";

const Grid = () => {
  const { animationInfos } = useContext<ContextValueType>(Context);
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
              node={node}
              isDrawing={isDrawing}
              setIsDrawing={setIsDrawing}
            />
          ))
        )}
    </div>
  );
};

export default Grid;
