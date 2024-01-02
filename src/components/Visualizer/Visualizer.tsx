import Grid from "../Grid/Grid";

const Visualizer = () => {
  const matrix = Array.from({ length: 50 }, () =>
    Array.from({ length: 100 }, () => 0)
  );

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Grid matrix={matrix} />
    </div>
  );
};

export default Visualizer;
