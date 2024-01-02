import GridItem from "../GridItem/GridItem";

type PropsType = {
  matrix: number[][];
};

const Grid = ({ matrix }: PropsType) => {
  const gridStyle = {
    display: "grid",
    gridTemplateRows: `repeat(${matrix.length}, 1fr)`,
    gridTemplateColumns: `repeat(${
      matrix.length > 0 ? matrix[0].length : 0
    }, 1fr)`,
  };

  return (
    <div className={` bg-slate-300`} style={gridStyle}>
      {matrix.map((row, i) =>
        row.map((v, j) => <GridItem key={`${i}-${j}`} />)
      )}
    </div>
  );
};

export default Grid;
