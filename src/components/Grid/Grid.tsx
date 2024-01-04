import { useContext } from "react";
import { Context, ContextValueType } from "../../context/context";
import GridNode from "../GridItem/GridNode";

const Grid = () => {
  const { animationInfos } = useContext<ContextValueType>(Context);
  const { matrix, rows, cols, nodeSize } = animationInfos;

  const gridStyle = {
    display: "grid",
    gridTemplateRows: `repeat(${rows}, ${nodeSize}px)`,
    gridTemplateColumns: `repeat(${cols}, ${nodeSize}px)`,
  };

  return (
    <div className={`bg-slate-100`} style={gridStyle}>
      {matrix &&
        matrix.map((row, i) =>
          row.map((_, j) => <GridNode key={`${i}-${j}`} />)
        )}
    </div>
  );
};

export default Grid;
